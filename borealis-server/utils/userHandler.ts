import { UpdateQuery } from 'mongoose'
import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User, { IUserSchema } from '../models/user.js'
import RoomUser, { IRoomUserSchema } from '../models/roomUser.js'

// ######################
// #region Actual Users #
// ######################
const hashUserSecret = async (inputSecret: string): Promise<string> => {
    //TODO: implement salting
    const outputSecret = await argon2.hash(inputSecret)
    return outputSecret
}

const checkSecretsMatch = async (secret1: string, secret2: string): Promise<boolean> => {
    return argon2.verify(secret1, secret2)
        .then((passwordsMatch) => {
            if (passwordsMatch) {
                return true
            } else {
                return false
            }
        })
}

const findUser = async (userGuid?:string, userName?:string, userEmail?:string): Promise<IUserSchema> => {
    const user = await User.findOne({ $or: [{ 'guid': userGuid, }, { 'name': userName }, { 'email': userEmail, 'guest': false, }] })
        .then((foundUser) => foundUser)
        .catch(() => undefined)
    if ((user !== null) && (user !== undefined))
        return user
    else
        return emptyUser()
}

const createNewUser = async (newName: string, newSecret: string, newEmail: string, newGuest: boolean, newGuid?: string): Promise<IUserSchema> => {
    const newUser = new User({
        guid: ((newGuid !== undefined) && (newGuid !== '')) ? newGuid : randomUUID(),
        name: newName,
        secret: newSecret,
        email: newEmail,
        guest: newGuest,
        lastOnline: new Date(),
        active: true,
    })
    return await newUser.save()
        .then((document) => cleanUserBeforeSending(document))
        .catch(() => emptyUser())
}

const updateExistingUserActivity = (existingUser: IUserSchema, isActive: boolean): IUserSchema => {
    const updatedUser = new User({
        guid: existingUser.guid,
        name: existingUser.name,
        secret: existingUser.secret,
        email: existingUser.email,
        guest: existingUser.guest,
        lastOnline: new Date(),
        active: isActive,
    })
    updatedUser.save((error, newUser) => {
        if (!error)
            // Saving of User update successful, so we return the updated user
            return cleanUserBeforeSending(newUser)
        else
            // Saving of User update failed
            return emptyUser()
    })
    return cleanUserBeforeSending(updatedUser)
}

export const registerUser = async (user: IUserSchema): Promise<IUserSchema> => {
    if (!user)
        return emptyUser()

    const userSecret = await hashUserSecret(user.secret)

    const existingUser = await findUser(user.guid, user.name, user.email)
    if (existingUser.guid !== '') {
        // User already exists
        const hashesMatch = await checkSecretsMatch(existingUser.secret, userSecret)
        if (hashesMatch) {
            const updatedUser = updateExistingUserActivity(existingUser, true)
            return updatedUser
        } else
            return emptyUser()
    } else {
        // New User
        const newUser = await createNewUser(user.name, userSecret, user.email, user.guest, user.guid)
        return newUser
    }
}
// #endregion Actual Users


// ######################
// #region Room Users   #
// ######################
export const deleteAllRoomUsers = async (roomId: string) : Promise<number> => {
    return RoomUser.deleteMany({ roomId: roomId, })
        .then((result) => result.deletedCount)
        .catch(() => 0)
}

export const upsertSingleRoomUser = async (roomId: string, userGuid: string, updQuery: UpdateQuery<IRoomUserSchema>): Promise<IRoomUserSchema | undefined> => {
    return RoomUser.findOneAndUpdate(
        { roomId: roomId, guid: userGuid },
        updQuery,
        { new: true, upsert: true, })
        .then((updatedRoomUser) => updatedRoomUser)
        .catch(() => undefined)
}

export const upsertRoomUsers = async (roomId: string, updQuery: UpdateQuery<IRoomUserSchema>): Promise<number> => {
    return RoomUser.updateMany({ roomId: roomId, }, updQuery)
        .then((updateResult) => {
            return updateResult.upsertedCount
        })
        .catch(() => 0)
}

export const markAllRoomUsersAsInactive = async (roomId: string) => {
    await RoomUser.updateMany({ roomId: roomId, }, { active: false, })
}

export const overwriteRoomUsers = async (roomId: string, newRoomUsers: Array<IRoomUserSchema>): Promise<Array<IRoomUserSchema | undefined>> => {
    if ((roomId !== '') || !newRoomUsers)
        return []

    // Set all users to inactive, then reactivate only the received users
    await markAllRoomUsersAsInactive(roomId)
    return Promise.all(
        newRoomUsers.map(async (newRoomUser) => {
            return await upsertSingleRoomUser(roomId, newRoomUser.guid, { ...newRoomUser, roomId: roomId, timestamp: new Date(), active: true,  })
        })
    )
}

export const overwriteSingleRoomUser = async (roomId: string, newRoomUser: IRoomUserSchema): Promise<IRoomUserSchema | undefined> => {
    if ((roomId !== '') || !newRoomUser)
        return undefined

    return await upsertSingleRoomUser(roomId, newRoomUser.guid, { ...newRoomUser, roomId: roomId, timestamp: new Date(), active: true,  })
}

export const overwriteAllRoomUsersStatus = async (roomId: string, newStatus: boolean): Promise<number> => {
    if (roomId !== '')
        return 0

    return await upsertRoomUsers(roomId, { active: newStatus, })
}

export const setRoomUsersInactiveAfterTimeout = async (): Promise<number> => {
    const lastOnlineThreshold = new Date()
    return await RoomUser.updateMany({ lastOnline: { $lt: (lastOnlineThreshold.getMilliseconds() - 30000) } }, { active: false })
        .then((res) => res.upsertedCount)
        .catch(() => 0)
}

export const getAllRoomActiveUsers = async (roomId: string, userGuid?: string): Promise<Array<IRoomUserSchema>> => {
    const queryParameters = userGuid ? { 'roomId': roomId, 'guid': userGuid, 'active': true, } : { 'roomId': roomId, 'active': true, }
    return RoomUser.find(queryParameters)
        .then((roomUsers) => roomUsers))
        .catch(() => [])
}
// #endregion Room Users

export const emptyUser = (): IUserSchema => {
    return {
        guid: '',
        secret: '',
        active: false,
        email: '',
        guest: true,
        lastOnline: 0,
        name: '',
    }
}
