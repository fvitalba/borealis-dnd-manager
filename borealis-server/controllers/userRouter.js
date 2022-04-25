import { Router } from 'express'
import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'
import Session from '../models/session.js'
import { randomUUID } from 'crypto'
import { registerUser, saveUpdateRoomUsers, cleanUserBeforeSending } from '../utils/userHandler.js'

const userRouter = new Router()

userRouter.get('/:userGuid?:roomId?', (request, result) => {
    const userGuid = request.params.userGuid ? request.params.userGuid : request.query.userGuid
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId

    if (userGuid !== undefined && userGuid !== '') {
        User.find({ 'guid': userGuid, 'active': true, })
            .then((users) => {
                result.json(users)
            })
    } else if ((roomId !== undefined) && (roomId !== '')) {
        const queryParameters = { 'roomId': roomId, 'active': true, }
        if (userGuid !== undefined && userGuid !== '')
            queryParameters['guid'] = userGuid
        RoomUser.find(queryParameters)
            .then((roomUsers) => {
                result.json(roomUsers)
            })
    } else {
        result.json([])
    }
})

userRouter.post('/', (request, response) => {
    const body = request.body
    if (!body.payload)
        return response.status(400).json({ error: 'Request is badly specified. Please provide users to save.' })
    
    saveUpdateRoomUsers(JSON.parse(body.payload))
        .then((result) => response.json(result))
})

userRouter.post('/authenticate/', (request, response) => {
    const body = request.body
    if (!body.userGuid && !body.userName && !body.email)
        return response.status(400).json({ error: 'Request is badly specified. Please provide either a userGuid, userName or email.' })
    if (!body.secret && !body.isGuest)
        return response.status(400).json({ error: 'Users must specify their secret to authenticate.' })
    if (!body.userName && body.isGuest)
        return response.status(400).json({ error: 'Guests must specify a username.' })
    
    switch(true) {
    case (body.userGuid !== undefined) && (body.userGuid !== ''):
        User.find({ 'guid': body.userGuid, 'secret': body.secret, 'guest': false, })
            .then((users) => {
                response.json(users.map((user) => cleanUserBeforeSending(user)))
            })
        break
    case (body.userName !== undefined) && (body.userName !== ''):
        if (body.isGuest) {
            User.find({ 'name': body.userName, 'guest': true, })
                .then((users) => {
                    response.json(users.map((user) => cleanUserBeforeSending(user)))
                })
        } else {
            User.find({ 'name': body.userName, 'secret': body.secret, 'guest': false, })
                .then((users) => {
                    response.json(users.map((user) => cleanUserBeforeSending(user)))
                })
        }
        break
    case (body.email !== undefined) && (body.email !== ''):
        User.find({ 'email': body.email, 'secret': body.secret, 'guest': false, })
            .then((users) => {
                response.json(users.map((user) => cleanUserBeforeSending(user)))
            })
        break
    default:
        return response.status(400).json({ error: 'All provided parameters were empty. Please rephrase the request.' })
    }
})

userRouter.post('/register/', (request, response) => {
    const body = request.body
    if (!body.user)
        return response.status(400).json({ error: 'Request is badly specified. Please provide an user for registration.' })
    
    registerUser(JSON.parse(body.user))
        .then((result) => response.json(result))
})

userRouter.post('/session/', (request, response) => {
    const body = request.body
    console.log('body',body)
    if (!body.userGuid && !body.sessionToken) {
        if (!body.userGuid && !user.secret && !user.isGuest)
            return response.status(400).json({ error: 'Request is badly specified. Please provide either authentication or an existing session token.' })
    }
    
    //TODO: check for session validity
    switch(true) {
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.sessionToken !== '' && body.sessionToken !== undefined)):
        Session.find({ 'userGuid': body.userGuid, 'guid': body.sessionToken, 'active': true, })
            .then((sessions) => {
                if (sessions.length > 0)
                    response.json(sessions.map((session) => session.guid))
                else {
                    if (body.secret) {
                        User.find({ 'guid': body.userGuid, 'secret': body.secret, 'guest': false, })
                            .then((users) => {
                                if (users.length > 0) {
                                    const newSession = new Session({
                                        guid: randomUUID(),
                                        userGuid: users[0].guid,
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
                                            return response.status(500).json({ error: 'Session could not be opened.' })
                                        }
                                    })
                                } else
                                    return response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
                            })
                    } else
                        return response.status(410).json({ error: 'No active session with provided token found. Please reauthenticate.' })
                }
            })
        break
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.secret !== '' && body.secret !== undefined)):
        User.find({ 'guid': body.userGuid, 'secret': body.secret, 'guest': false, })
            .then((users) => {
                if (users.length > 0) {
                    const newSession = new Session({
                        guid: randomUUID(),
                        userGuid: users[0].guid,
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
                            return response.status(500).json({ error: 'Session could not be opened.' })
                        }
                    })
                } else
                    return response.status(403).json({ error: 'The provided credentials are not allowed to authenticate.' })
            })
        break
    case ((body.userGuid !== '' && body.userGuid !== undefined) && (body.isGuest !== '' && body.isGuest !== undefined)):
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
            if (!error) {
                response.json([document.guid])
            } else {
                return response.status(500).json({ error: 'Session could not be opened.' })
            }
        })
    default:
        return response.status(400).json({ error: 'All provided parameters were empty. Please rephrase the request.' })
    }
})

export default userRouter
