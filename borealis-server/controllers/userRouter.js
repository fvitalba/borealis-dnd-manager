import { Router } from 'express'
import User from '../models/user.js'

const userRouter = new Router()

userRouter.get('/:roomName?:userGuid?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName
    const userGuid = request.params.userGuid ? request.params.userGuid : request.query.userGuid


    if (roomName) {
        const queryParameters = userGuid ? { 'roomName': roomName, 'guid': userGuid, } : { 'roomName': roomName, }
        User.find({ ...queryParameters, 'active': true, })
            .then((users) => {
                result.json(users)
            })
    } else {
        result.json([])
    }
})

export default userRouter
