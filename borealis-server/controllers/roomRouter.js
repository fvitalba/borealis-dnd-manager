import { Router } from 'express'
import Room from '../models/room.js'
import { exportRoomWithRole, saveUpdateRoom } from '../utils/roomHandler.js'

const roomRouter = new Router()

roomRouter.get('/:roomId?:hostUserGuid?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const hostUserGuid = request.params.hostUserGuid ? request.params.hostUserGuid : request.query.hostUserGuid

    const queryParameters = {}
    if (roomId !== undefined && roomId !== '')
        queryParameters['roomId'] = roomId
    if ((hostUserGuid !== undefined) && (hostUserGuid !== ''))
        queryParameters['hostUserGuid'] = hostUserGuid

    console.log('parameters',queryParameters)
    if (queryParameters.roomId || queryParameters.hostUserGuid) {
        // TOOD: include rooms where the provided ID is just participant
        Room.find(queryParameters)
            .then((rooms) => {
                if ((hostUserGuid !== undefined) && (hostUserGuid !== ''))
                    result.json(rooms.map((room) => exportRoomWithRole(room, 0  /* Host */)))
                else
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
    if ((body.roomId === undefined || body.roomId === '') || ((body.roomName === undefined) || (body.roomName === '')))
        return response.status(400).json({ error: 'Room was not specified.' })
    if ((body.hostUserGuid === undefined) || (body.hostUserGuid === ''))
        return response.status(400).json({ error: 'Host was not specified.' })

    saveUpdateRoom(body.roomId, body.roomName, body.hostUserGuid, JSON.parse(body.payload))
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
