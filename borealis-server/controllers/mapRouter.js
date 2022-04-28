import { Router } from 'express'
import Map from '../models/map.js'
import { saveUpdateRoomMap } from '../utils/mapHandler.js'

const mapRouter = new Router()

mapRouter.get('/:roomId?:mapId?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const mapId = request.params.mapId ? request.params.mapId : request.query.mapId

    if (roomId !== undefined && roomId !== '') {
        const queryParameters = mapId ? { 'roomId': roomId, 'id': mapId, } : { 'roomId': roomId, }
        Map.find(queryParameters)
            .then((maps) => {
                result.json(maps)
            })
    } else {
        result.json([])
    }
})

mapRouter.post('/', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.roomId === undefined || body.roomId === '')
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomMap(body.roomId, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default mapRouter
