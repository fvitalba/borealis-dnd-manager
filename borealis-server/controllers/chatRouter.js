import { Router } from 'express'

const chatRouter = new Router()

chatRouter.get('/:roomName?', (request, result) => {
    /*
    const roomName = request.params.roomName
    if (roomName) {
        User.find({ 'roomName': roomName }).then((users) => {
            result.json(users)
        })
    } else {
        result.json([])
    }
    */
})

export default chatRouter
