import { UpdateQuery } from 'mongoose'
import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User, { IUserSchema } from '../models/user.js'
import RoomUser, { IRoomUserSchema } from '../models/roomUser.js'
import IIncRoomUser from '../incomingInterfaces/incRoomUser.js'

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

export const authenticateUser = async (isGuest: boolean, userGuid?: string, userName?: string, userEmail?: string, userSecret?: string): Promise<IUserSchema> => {
    //TODO: Implement authentication
    //TODO: Error on existing Username as guest/non-guest
    /*
    let foundUser = null
    switch(true) {
    case (body.userGuid !== undefined) && (body.userGuid !== ''):
        foundUser = await User.findOne({ 'guid': body.userGuid, 'guest': false, })
            .then((existingUser) => {
                return existingUser
            })
        break
    case (body.userName !== undefined) && (body.userName !== ''):
        if (body.isGuest) {
            const guestUser = {
                userGuid: '',
                userName: body.userName,
                secret: '',
                email: '',
                isGuest: true,
            }
            // Check if the Guest User can be created
            foundUser = await registerUser(guestUser)
                .then(async (result) => {
                    if ((result !== undefined) && (result.guid !== null) && (result.guid !== ''))
                        return await User.findOne({ 'name': body.userName, 'guest': true, })
                            .then((existingUser) => existingUser)
                })
        } else {
            foundUser = await User.findOne({ 'name': body.userName, 'guest': false, })
                .then((existingUser) => existingUser)
        }
        break
    case (body.email !== undefined) && (body.email !== ''):
        foundUser = await User.findOne({ 'email': body.email, 'guest': false, })
            .then((existingUser) =>  existingUser)
        break
    default:
        return response.status(400).json({ error: 'All provided parameters were empty. Please rephrase the request.' })
    }

    // Verify what kind of User we've found
    if ((foundUser !== null) && (foundUser !== undefined)) {
        if ((foundUser.guid !== undefined) && (foundUser.guid !== '')) {
            if (foundUser.guest) {
                response.json(cleanUserBeforeSending(foundUser))
            } else {
                argon2.verify(foundUser.secret, body.secret)
                    .then((passwordsMatch) => {
                        if (passwordsMatch)
                            // Everything matches, authentication successful!
                            response.json(cleanUserBeforeSending(foundUser))
                        else
                            // Password incorrect!
                            response.status(401).json({ error: 'The provided credentials are incorrect.' })
                    })
                    .catch(() => {
                        // Some kind of Error happened during salting
                        response.status(401).json({ error: 'The provided credentials are incorrect.' })
                    })
            }
        } else {
            // User does not exist
            response.status(401).json({ error: 'The provided credentials are incorrect.' })
        }
    } else {
        // User does not exist
        response.status(401).json({ error: 'The provided credentials are incorrect.' })
    }
    */
}

export const startUserSession = async (isGuest: boolean, userGuid?: string, sessionToken?: string, userSecret?: string): Promise<string> => {
    //TODO: Implement start User Session
    /*
    //TODO: check for session validity
    //TODO: Fix guest user session creation
    //TODO: Refactor using seperate functions to clean up code
    switch(true) {
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.sessionToken !== '' && body.sessionToken !== undefined)):
        Session.find({ 'userGuid': body.userGuid, 'guid': body.sessionToken, 'active': true, })
            .then((sessions) => {
                if (sessions.length > 0)
                    response.json(sessions.map((session) => session.guid))
                else {
                    if (body.secret) {
                        User.findOne({ 'guid': body.userGuid, 'guest': false, })
                            .then((existingUser) => {
                                if ((existingUser !== null) && ((existingUser.guid !== undefined) && (existingUser.guid !== ''))) {
                                    argon2.verify(existingUser.secret, body.secret)
                                        .then((passwordsMatch) => {
                                            if (passwordsMatch) {
                                                const newSession = new Session({
                                                    guid: randomUUID(),
                                                    userGuid: existingUser.guid,
                                                    timestamp: Date.now(),
                                                    createdFrom: '',
                                                    createdFromDevice: '',
                                                    validTo: Date.now() + 86400000, // Valid for 24h
                                                    active: true,
                                                })
                                                newSession.save((error, document) => {
                                                    if (!error) {
                                                        response.json([document.guid])
                                                    } else {
                                                        response.status(500).json({ error: 'Session could not be opened.' })
                                                    }
                                                })
                                            } else
                                                response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
                                        })
                                } else
                                    response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
                            })
                    } else
                        response.status(410).json({ error: 'No active session with provided token found. Please reauthenticate.' })
                }
            })
        break
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.secret !== '' && body.secret !== undefined)):
        User.findOne({ 'guid': body.userGuid, 'guest': false, })
            .then((existingUser) => {
                if ((existingUser !== null) && ((existingUser.guid !== undefined) && (existingUser.guid !== ''))) {
                    argon2.verify(existingUser.secret, body.secret)
                        .then((passwordsMatch) => {
                            if (passwordsMatch) {
                                const newSession = new Session({
                                    guid: randomUUID(),
                                    userGuid: existingUser.guid,
                                    timestamp: Date.now(),
                                    createdFrom: '',
                                    createdFromDevice: '',
                                    validTo: Date.now() + 86400000, // Valid for 24h
                                    active: true,
                                })
                                newSession.save((error, document) => {
                                    if (!error) {
                                        response.json([document.guid])
                                    } else {
                                        response.status(500).json({ error: 'Session could not be opened.' })
                                    }
                                })
                            } else
                                response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
                        })
                } else
                    response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
            })
        break
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.isGuest !== '' && body.isGuest !== undefined)):
        console.log('preparing new Session')
        const newSession = new Session({
            guid: randomUUID(),
            userGuid: body.userGuid,
            timestamp: Date.now(),
            createdFrom: '',
            createdFromDevice: '',
            validTo: Date.now() + 7200000, // Valid for 2h
            active: true,
        })
        newSession.save((error, document) => {
            console.log('saved session', error, document)
            if ((error === null) || (error === undefined)) {
                console.log('sending session token', [document.guid])
                response.json([ document.guid ])
            } else {
                response.status(500).json({ error: 'Session could not be opened.' })
            }
        })
        break
    default:
        response.status(400).json({ error: 'All provided parameters were empty. Please rephrase the request.' })
    }
    */
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
