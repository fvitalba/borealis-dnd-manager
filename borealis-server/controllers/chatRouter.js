import { Router } from 'express'
import Chat from '../models/chat.js'
import { saveUpdateRoomChat } from '../utils/chatHandler.js'

const chatRouter = new Router()

chatRouter.get('/:roomName?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName

    if (roomName) {
        Chat.find({ 'roomName': roomName, })
            .then((chat) => {
                result.json(chat)
            })
    } else {
        result.json([])
    }
})

chatRouter.post('/', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.room === undefined)
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomChat(body.room, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default chatRouter
