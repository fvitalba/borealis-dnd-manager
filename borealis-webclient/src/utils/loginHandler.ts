import User from '../classes/User'
import { IWsSettings } from '../contexts/WebSocketProvider'
import { getUserDetailsFromDatabase, registerUserToDatabase } from './apiHandler'

export const authenticateUser = async (wsSettings: IWsSettings, userGuid?: string, userName?: string): Promise<User | null> => {
    if (!userGuid && !userName)
        throw new Error('In order to authenticate, please provide either userGuid or userName.')

    return getUserDetailsFromDatabase(wsSettings, userGuid, userName)
        .then((result) => {
            return User.fromDbSchema(result[0])
        })
        .catch(() => null)
}

export const registerUser = async (wsSettings: IWsSettings, user?: User): Promise<User | null> => {
    if (!user || user.isEmpty())
        throw new Error('In order to register, you need to provide an user.')

    return registerUserToDatabase(wsSettings, user)
        .then((result) => {
            return User.fromDbSchema(result)
        })
        .catch(() => null)
}

export const authenticateOrRegisterUser = async (wsSettings: IWsSettings, user?: User): Promise<User | null> => {
    if (!user || user.isEmpty())
        throw new Error('In order to authenticate or register, you need to provide an user.')

    return authenticateUser(wsSettings, user.guid, user.name)
        .then((result) => {
            if (!result || result.isEmpty()) {
                return registerUser(wsSettings, user)
                    .then((result) => result)
                    .catch(() => null)
            } else
                return result
        })
        .catch(() => null)
}