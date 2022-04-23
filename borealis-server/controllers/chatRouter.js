import { Router } from 'express'
import Chat from '../models/chat.js'
import { saveUpdateRoomChat } from '../utils/chatHandler.js'

const chatRouter = new Router()

chatRouter.get('/:roomId?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId

    if (roomId !== undefined && roomId !== '') {
        Chat.find({ 'roomId': roomId, })
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
    if (body.roomId === undefined || body.roomId === '')
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomChat(body.roomId, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default chatRouter
