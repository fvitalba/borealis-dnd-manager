import { Router } from 'express'
import Token from '../models/token.js'
import { saveUpdateRoomToken } from '../utils/tokenHandler.js'

const tokenRouter = new Router()

tokenRouter.get('/:roomName?:tokenGuid?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName
    const tokenGuid = request.params.tokenGuid ? request.params.tokenGuid : request.query.tokenGuid

    if (roomName) {
        const queryParameters = tokenGuid ? { 'roomName': roomName, 'guid': tokenGuid, } : { 'roomName': roomName, }
        Token.find(queryParameters)
            .then((tokens) => {
                result.json(tokens)
            })
    } else {
        result.json([])
    }
})

tokenRouter.post('/', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.room === undefined)
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomToken(body.room, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default tokenRouter
