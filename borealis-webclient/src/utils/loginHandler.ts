import { IWsSettings } from '../contexts/WebSocketProvider'
import { RegisterParameters, getUserDetailsFromDatabase, registerUserToDatabase, checkOrStartSession } from './apiHandler'
import { UserSchema } from './mongoDbSchemas'

interface AuthenticationParameters {
    userGuid?: string,
    userName?: string,
    secret?: string,
    email?: string,
    isGuest?: boolean,
    sessionToken?: string,
}

interface SessionParameters {
    userGuid: string,
    currentSessionId?: string,
    secret?: string,
    isGuest?: boolean,
}

export const authenticateUser = async (wsSettings: IWsSettings, params: AuthenticationParameters): Promise<UserSchema | null> => {
    if (!params.userGuid && !params.userName)
        throw new Error('In order to authenticate, please provide either userGuid or userName.')

    return getUserDetailsFromDatabase(wsSettings, params.userGuid, params.userName, params.email, params.secret, params.isGuest, params.sessionToken)
        .then((dbUser) => {
            if (dbUser)
                return dbUser
            else
                return null
        })
        .catch(() => null)
}

export const registerUser = async (wsSettings: IWsSettings, params: RegisterParameters): Promise<UserSchema | null> => {
    if (!params.userName || (!params.secret && !params.isGuest))
        throw new Error('In order to register, you need to provide at least a username and if you\'re not registering a guest user, you need to provide a password as well.')

    return registerUserToDatabase(wsSettings, params)
        .then((dbUser) => {
            return dbUser
        })
        .catch(() => null)
}

export const startSession = async (wsSettings: IWsSettings, params: SessionParameters): Promise<string | null> => {
    if (!params.currentSessionId && (!params.secret && !params.isGuest))
        throw new Error('In order to start a session, you need to provide an existing session token or your user credentials.')

    return checkOrStartSession(wsSettings, params.userGuid, params.currentSessionId, params.secret, params.isGuest)
        .then((sessionTokens) => {
            if (sessionTokens.length > 0)
                return sessionTokens[0]
            else
                return null
        })
        .catch(() => null)
}

export const saveLoginToLocalStorage = (userGuid: string, sessionToken: string) => {
    localStorage.setItem('borealis-dnd:userGuid',userGuid)
    localStorage.setItem('borealis-dnd:sessionToken',sessionToken)
}

export const getloginFromLocalStorage = (): [string, string] => {
    const localStorageUserGuid = localStorage.getItem('borealis-dnd:userGuid')
    const localStorageSessionToken = localStorage.getItem('borealis-dnd:sessionToken')
    const userGuid = localStorageUserGuid ? localStorageUserGuid : ''
    const sessionToken = localStorageSessionToken ? localStorageSessionToken : ''
    return [userGuid, sessionToken]
}

export const deleteLoginFromLocalStorage = () => {
    localStorage.removeItem('borealis-dnd:userGuid')
    localStorage.removeItem('borealis-dnd:sessionToken')
}
