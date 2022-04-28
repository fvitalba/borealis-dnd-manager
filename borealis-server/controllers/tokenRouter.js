import { Router } from 'express'
import Token from '../models/token.js'
import { saveUpdateRoomToken } from '../utils/tokenHandler.js'

const tokenRouter = new Router()

tokenRouter.get('/:roomId?:tokenGuid?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const tokenGuid = request.params.tokenGuid ? request.params.tokenGuid : request.query.tokenGuid

    if (roomId !== undefined && roomId !== '') {
        const queryParameters = tokenGuid ? { 'roomId': roomId, 'guid': tokenGuid, } : { 'roomId': roomId, }
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
    if (body.roomId === undefined || body.roomId === '')
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomToken(body.roomId, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default tokenRouter
