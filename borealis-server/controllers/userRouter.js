import { Router } from 'express'
import User from '../models/user.js'

const userRouter = new Router()

userRouter.get('/:roomId?:userGuid?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const userGuid = request.params.userGuid ? request.params.userGuid : request.query.userGuid

    if (roomId !== undefined && roomId !== '') {
        const queryParameters = userGuid ? { 'roomId': roomId, 'guid': userGuid, } : { 'roomId': roomId, }
        User.find({ ...queryParameters, 'active': true, })
            .then((users) => {
                result.json(users)
            })
    } else {
        result.json([])
    }
})

export default userRouter
