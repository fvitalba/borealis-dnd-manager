import { Router } from 'express'
import Room from '../models/room.js'
import { saveUpdateRoom } from '../utils/roomHandler.js'

const roomRouter = new Router()

roomRouter.get('/:roomId?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    let currentRoom = undefined
    if (roomId !== undefined && roomId !== '') {
        Room.find({ 'roomId': roomId })
            .then((rooms) => {
                rooms.forEach((room) => {
                    if ((!currentRoom) || (currentRoom.version < room.version)) {
                        currentRoom = room
                    }
                })
                result.json(currentRoom)
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

    saveUpdateRoom(body.roomId, JSON.parse(body.payload))
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
