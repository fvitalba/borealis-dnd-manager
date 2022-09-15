import { UpdateQuery } from 'mongoose'
import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User, { IUserSchema } from '../models/user.js'
import RoomUser, { IRoomUserSchema } from '../models/roomUser.js'
import IIncRoomUser from '../incomingInterfaces/incRoomUser.js'
import Session, { ISessionSchema } from '../models/session.js'
import IIncUser from '../incomingInterfaces/incUser.js'

// ######################
// #region Actual Users #
// ######################
export const parseIncUserToUserSchema = (incUser: IIncUser, isActive?: boolean, lastOnline?: number): IUserSchema => {
    return {
        guid: incUser.userGuid,
        active: isActive ? isActive : false,
        email: incUser.email,
        guest: incUser.isGuest,
        lastOnline: lastOnline ? lastOnline : 0,
        name: incUser.userName,
        secret: incUser.secret,
    }
}

export const hashUserSecret = async (inputSecret: string): Promise<string> => {
    //TODO: implement salting
    const outputSecret = await argon2.hash(inputSecret)
    return outputSecret
}

const checkSecretsMatch = async (existingSecret: string, compareSecret: string): Promise<boolean> => {
    if ((existingSecret === '') || (compareSecret === ''))
        return false
    const pwdMatch = await argon2.verify(existingSecret, compareSecret)
        .then((passwordsMatch) => {
            if (passwordsMatch) {
                return true
            } else {
                return false
            }
        })
    return pwdMatch
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

const findLastUserSession = async (user: IUserSchema, sessionToken?: string): Promise<ISessionSchema> => {
    // We search for any fitting sessions, and sort them by the longest Validity first.
    // Only active sessions are regarded.
    // If at least one session is found, the session with the longest validity is returned.
    const userSessions = await Session.find({ $or: [{ 'userGuid': user.guid, }, { 'guid': sessionToken }], 'active': true, })
        .sort({ 'validTo': 'desc', })
        .then((sessions) => sessions)
        .catch(() => [])
    if (userSessions.length > 0) {
        return userSessions[0]
    } else {
        return emptySession()
    }
}

const startNewUserSession = async (user: IUserSchema, userSecret?: string): Promise<ISessionSchema> => {
    const secretsMatch = (userSecret !== undefined) ? await checkSecretsMatch(user.secret, userSecret) : false
    if (secretsMatch || user.guest) {
        const newSession = new Session({
            guid: randomUUID(),
            userGuid: user.guid,
            timestamp: Date.now(),
            createdFrom: '',
            createdFromDevice: '',
            //TODO: Create shorter sessions for guests?
            //validTo: Date.now() + 7200000, // Valid for 2h
            validTo: Date.now() + 86400000, // Valid for 24h
            active: true,
        })
        newSession.save((error, document) => {
            if (!error) {
                return document
            } else {
                return emptySession()
            }
        })
        return newSession
    } else {
        return emptySession()
    }
}

export const registerUser = async (user: IUserSchema): Promise<IUserSchema> => {
    if (!user)
        return emptyUser()
    if (!user.name || ((!user.secret || !user.email) && !user.guest))
        return emptyUser()
    if (((user.secret === '') || (user.email === '')) && (!user.guest))
        return emptyUser()

    const userSecret = !user.guest ? await hashUserSecret(user.secret) : ''

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

export const authenticateUser = async (isGuest: boolean, userGuid?: string, userName?: string, userEmail?: string, userSecret?: string): Promise<IUserSchema> => {
    //TODO: Error on existing Username as guest/non-guest
    if (isGuest && (userEmail !== undefined) && (userEmail !== ''))
        return emptyUser()

    const existingUser = await findUser(userGuid, userName, userEmail)
    if (existingUser.guid === '')
        return emptyUser()
    else {
        if (existingUser.guest === true) {
            const updatedUser = updateExistingUserActivity(existingUser, true)
            return cleanUserBeforeSending(updatedUser)
        } else {
            const hashesMatch = (userSecret !== undefined) ? await checkSecretsMatch(existingUser.secret, userSecret) : false
            if (hashesMatch) {
                const updatedUser = updateExistingUserActivity(existingUser, true)
                return cleanUserBeforeSending(updatedUser)
            } else
                return emptyUser()
        }
    }
}

export const startUserSession = async (userGuid?: string, sessionToken?: string, userSecret?: string): Promise<string> => {
    const existingUser = await findUser(userGuid, '', '')

    if (existingUser.guid === '')
        return ''

    const lastSession = await findLastUserSession(existingUser, sessionToken)
    if (lastSession.active)
        return lastSession.guid

    const newSession = await startNewUserSession(existingUser, userSecret)
    return newSession.guid
}

export const getAllActiveUsers = async (userGuid?: string): Promise<Array<IUserSchema>> => {
    const queryParameters = userGuid ? { 'guid': userGuid, 'active': true, } : { 'active': true, }
    const activeUsers = await User.find(queryParameters)
        .then((users) => users)
        .catch(() => [])

    return activeUsers.map((activeUser) => cleanUserBeforeSending(activeUser))
}
// #endregion Actual Users


// ######################
// #region Room Users   #
// ######################
export const parseIncRoomUserToRoomUserSchema = (incRoomUser: IIncRoomUser): IRoomUserSchema => {
    return {
        ...incRoomUser,
    }
}

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
    if ((roomId === '') || !newRoomUsers)
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
    if ((roomId === '') || !newRoomUser)
        return undefined

    return await upsertSingleRoomUser(roomId, newRoomUser.guid, { ...newRoomUser, roomId: roomId, timestamp: new Date(), active: true,  })
}

export const overwriteAllRoomUsersStatus = async (roomId: string, newStatus: boolean): Promise<number> => {
    if (roomId === '')
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
    return await RoomUser.find(queryParameters)
        .then((roomUsers) => roomUsers)
        .catch(() => [])
}
// #endregion Room Users

export const cleanUserBeforeSending = (user: IUserSchema): IUserSchema => {
    return {
        guid: user.guid,
        name: user.name,
        email: user.guest ? '' : user.email,
        guest: user.guest,
        lastOnline: user.guest ? 0 : user.lastOnline,
        active: user.guest ? true : user.active,
        secret: '',
    }
}

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

export const emptySession = (): ISessionSchema => {
    return {
        active: false,
        createdFrom: '',
        createdFromDevice: '',
        guid: '',
        timestamp: 0,
        userGuid: '',
        validTo: 0,
    }
}
