import { Request, Response, Router } from 'express'
import IIncMap from '../incomingInterfaces/incMap.js'
import { getRoomMaps, overwriteRoomMaps, parseIncMapToMapSchema } from '../utils/mapHandler.js'

interface IMapsRouterRequestQuery {
    roomId?: string,
    mapId?: number,
}

interface IMapsRouterRequestBody {
    payload: string,
    roomId: string,
}

const mapRouter = Router()

mapRouter.get('/:roomId?:mapId?', (request: Request<unknown, unknown, unknown, IMapsRouterRequestQuery>, response: Response) => {
    const roomId = request.query.roomId ? request.query.roomId : ''
    const mapId = (request.query.mapId !== undefined) ? request.query.mapId : -1

    if (roomId !== '') {
        response.json(getRoomMaps(roomId, mapId))
    } else {
        response.json([])
    }
})

mapRouter.post('/', (request: Request<unknown, unknown, IMapsRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.payload === undefined)
        response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.roomId === undefined || body.roomId === '')
        response.status(400).json({ error: 'Room was not specified.' })

    const incMaps = JSON.parse(body.payload) as Array<IIncMap>
    const newMaps = incMaps.map((incMap) => parseIncMapToMapSchema(incMap, body.roomId, new Date()))

    const updatedMaps = overwriteRoomMaps(body.roomId, newMaps)
        .then((result) => result)
    response.json(updatedMaps)
})

export default mapRouter
