import { Request, Response, Router } from 'express'
import IIncToken from '../incomingInterfaces/incToken.js'
import { getRoomTokens, overwriteRoomTokens, parseIncTokenToTokenSchema } from '../utils/tokenHandler.js'

interface ITokensRouterRequestQuery {
    roomId?: string,
    tokenGuid?: string,
}

interface ITokensRouterRequestBody {
    payload: string,
    roomId: string,
}

const tokenRouter = Router()

tokenRouter.get('/:roomId?:tokenGuid?', (request: Request<unknown, unknown, unknown, ITokensRouterRequestQuery>, response: Response) => {
    const roomId = request.query.roomId ? request.query.roomId : ''
    const tokenGuid = (request.query.tokenGuid !== undefined) ? request.query.tokenGuid : ''

    if (roomId !== '') {
        getRoomTokens(roomId,tokenGuid)
            .then((tokens) => response.json(tokens))
            .catch(() => response.json([]))
    } else {
        response.json([])
    }
})

tokenRouter.post('/', (request: Request<unknown, unknown, ITokensRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.payload === undefined) {
        response.status(400).json({ error: 'Request Payload is missing.' })
        return
    }
    if (body.roomId === undefined || body.roomId === '') {
        response.status(400).json({ error: 'Room was not specified.' })
        return
    }

    const incTokens = JSON.parse(body.payload) as Array<IIncToken>
    const newTokens = incTokens.map((incToken) => parseIncTokenToTokenSchema(incToken, body.roomId, new Date()))

    overwriteRoomTokens(body.roomId, newTokens)
        .then((result) => response.json(result))
        .catch(() => response.json([]))
})

export default tokenRouter
