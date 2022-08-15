import { Request, Response, Router } from 'express'
import IIncChatMessage from '../incomingInterfaces/incChatMessage.js'
import { overwriteRoomChat, getRoomChat, parseIncChatToChatSchema } from '../utils/chatHandler.js'

interface IChatRouterRequestQuery {
    roomId?: string,
}

interface IChatRouterRequestBody {
    payload: string,
    roomId: string,
}

const chatRouter = Router()

chatRouter.get('/:roomId?', (request: Request<unknown, unknown, unknown, IChatRouterRequestQuery>, response: Response) => {
    const roomId = request.query.roomId ? request.query.roomId : ''

    if (roomId !== '') {
        response.json(getRoomChat(roomId))
    } else {
        response.json([])
    }
})

chatRouter.post('/', (request: Request<unknown, unknown, IChatRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.payload === undefined)
        response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.roomId === undefined || body.roomId === '')
        response.status(400).json({ error: 'Room was not specified.' })

    const incChatMessages = JSON.parse(body.payload) as Array<IIncChatMessage>
    const newChat = parseIncChatToChatSchema(incChatMessages, body.roomId, new Date())

    const updatedChat = overwriteRoomChat(body.roomId, newChat.messages)
        .then((result) => result)
    response.json(updatedChat)
})

export default chatRouter
