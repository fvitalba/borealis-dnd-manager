import { Router } from 'express'
import Room from '../models/room.js'
import { saveUpdateRoom } from '../utils/roomHandler.js'

const roomRouter = new Router()

roomRouter.get('/:roomId?:hostUserGuid?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const hostUserGuid = request.params.hostUserGuid ? request.params.hostUserGuid : request.query.hostUserGuid

    const queryParameters = {}
    if (roomId !== undefined && roomId !== '')
        queryParameters['roomId'] = roomId
    if ((hostUserGuid !== undefined) && (hostUserGuid !== ''))
        queryParameters['hostUserGuid'] = hostUserGuid

    if (queryParameters.roomId || queryParameters.hostUserGuid) {
        Room.find(queryParameters)
            .then((rooms) => {
                result.json(rooms)
            })
    } else {
        result.json([])
    }
})

roomRouter.post('/', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.roomId === undefined || body.roomId === '')
        return response.status(400).json({ error: 'Room was not specified.' })
    if ((body.hostUserGuid === undefined) || (body.hostUserGuid === ''))
        return response.status(400).json({ error: 'Host was not specified.' })

    saveUpdateRoom(body.roomId, body.hostUserGuid, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

roomRouter.delete('/:roomId?', (request, result) => {
    /*
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
    */
})

export default roomRouter
