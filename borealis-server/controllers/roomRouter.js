import { Router } from 'express'
import Room from '../models/room.js'
import { saveUpdateRoom } from '../utils/roomHandler.js'

const roomRouter = new Router()

roomRouter.get('/:roomName?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName
    let currentRoom = undefined
    if (roomName) {
        Room.find({ 'roomName': roomName })
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
    if (body.room === undefined)
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoom(body.room, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

roomRouter.delete('/:roomName?', (request, result) => {
    /*
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
    */
})

export default roomRouter
