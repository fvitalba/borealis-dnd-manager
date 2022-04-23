import { Router } from 'express'
import Map from '../models/map.js'
import { saveUpdateRoomMap } from '../utils/mapHandler.js'

const mapRouter = new Router()

mapRouter.get('/:roomName?:mapId?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName
    const mapId = request.params.mapId ? request.params.mapId : request.query.mapId

    if (roomName) {
        const queryParameters = mapId ? { 'roomName': roomName, 'id': mapId, } : { 'roomName': roomName, }
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
    if (body.room === undefined)
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomMap(body.room, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default mapRouter
