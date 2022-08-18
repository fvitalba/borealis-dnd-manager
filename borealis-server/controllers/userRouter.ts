import { Request, Response, Router } from 'express'
import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'
import Session from '../models/session.js'
import { registerUser, saveUpdateRoomUser, cleanUserBeforeSending, setAllRoomUserStatus, saveUpdateRoomUsers, setRoomUsersInactiveAfterTimeout, getAllRoomActiveUsers } from '../utils/userHandler.js'
import IIncRoomUser from '../incomingInterfaces/incRoomUser.js'
import IIncUser from '../incomingInterfaces/incUser.js'

interface IUsersRouterRequestQuery {
    userGuid?: string,
    roomId?: string,
}

interface IUsersRouterRequestBody {
    payload?: string,
    newUser?: IIncRoomUser,
    roomId: string,
}

const userRouter = Router()

userRouter.get('/:userGuid?:roomId?', (request: Request<unknown, unknown, unknown, IUsersRouterRequestQuery>, response: Response) => {
    const userGuid = request.query.userGuid ? request.query.userGuid : ''
    const roomId = request.query.roomId ? request.query.roomId : ''

    // First we updated all the Users Activity
    setRoomUsersInactiveAfterTimeout()
        .then(() => {
            // Then we retrieve the users from the DB and return them
            response.json(getAllRoomActiveUsers(roomId, userGuid))
        })
        .catch(() => response.json([]))
})

userRouter.post('/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.newUser && !body.payload)
        response.status(400).json({ error: 'Request is badly specified. Please provide users to save.' })

    // check user activity
    RoomUser.updateMany({ lastOnline: { $lt: (new Date() - 30000) } }, { active: false })
        .then(() => {
            if (body.newUser !== undefined) {
                saveUpdateRoomUser(body.roomId, JSON.parse(body.newUser))
                    .then((result) => response.json(result))
            }
            if (body.payload !== undefined) {
                const incUsers = JSON.parse(body.payload) as Array<IIncUser>
                saveUpdateRoomUsers(body.roomId, JSON.parse(body.payload))
                    .then((result) => response.json(result))
            }
        })
})

userRouter.post('/status/', (request, response) => {
    const body = request.body
    if (body.active === undefined)
        return response.status(400).json({ error: 'Request is badly specified. Either RoomID or new Status was missing.' })

    setAllRoomUserStatus(body.roomId, body.active)
        .then((result) => response.json(result))
})

userRouter.post('/authenticate/', async (request, response) => {
    const body = request.body
    if (!body.userGuid && !body.userName && !body.email)
        return response.status(400).json({ error: 'Request is badly specified. Please provide either a userGuid, userName or email.' })
    if (!body.secret && !body.isGuest)
        return response.status(400).json({ error: 'Users must specify their secret to authenticate.' })
    if (!body.userName && body.isGuest)
        return response.status(400).json({ error: 'Guests must specify a username.' })

    //TODO: Error on existing Username as guest/non-guest
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
})

userRouter.post('/register/', (request, response) => {
    const body = request.body
    if (!body.user)
        return response.status(400).json({ error: 'Request is badly specified. Please provide an user for registration.' })

    registerUser(JSON.parse(body.user))
        .then((result) => {
            response.json(result)
        })
})

userRouter.post('/session/', (request, response) => {
    const body = request.body
    console.log('POST user/session, body:', body)
    if (!body.userGuid && !body.sessionToken) {
        if (!body.userGuid && !body.secret && !body.isGuest)
            return response.status(400).json({ error: 'Request is badly specified. Please provide either authentication or an existing session token.' })
    }

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
})

export default userRouter
