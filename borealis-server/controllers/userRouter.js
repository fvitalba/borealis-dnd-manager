import { Router } from 'express'
import User from '../models/user.js'
import { saveUpdateRoomUser } from '../utils/userHandler.js'

const userRouter = new Router()

userRouter.get('/:userGuid?', (request, result) => {
    const userGuid = request.params.userGuid ? request.params.userGuid : request.query.userGuid

    if (userGuid !== undefined && userGuid !== '') {
        User.find({ 'guid': userGuid, 'active': true, })
            .then((users) => {
                result.json(users)
            })
    } else {
        result.json([])
    }
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
    
    saveUpdateRoomUser(JSON.parse(body.user))
        .then((result) => response.json(result))
})

export default userRouter
