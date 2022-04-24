import { query, Router } from 'express'
import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'
import { saveUpdateUser, saveUpdateRoomUsers } from '../utils/userHandler.js'

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
    
    switch(true) {
    case (body.userGuid) && (body.userGuid !== ''):
        User.find({ 'guid': body.userGuid, })
            .then((users) => {
                response.json(users)
            })
        break
    case (body.userName) && (body.userName !== ''):
        User.find({ 'name': body.userName, })
            .then((users) => {
                response.json(users)
            })
        break
    case (body.email) && (body.email !== ''):
        User.find({ 'email': body.email, })
            .then((users) => {
                response.json(users)
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
    
    saveUpdateUser(JSON.parse(body.user))
        .then((result) => response.json(result))
})

export default userRouter
