import { Router } from 'express'
import Room from '../models/room.js'

const roomRouter = new Router()

roomRouter.get('/:roomName?', (request, result) => {
    const roomName = request.params.roomName
    let currentRoom = undefined
    if (roomName) {
        Room.find({ 'metadata.room': roomName })
            .then((rooms) => {
                rooms.forEach((room) => {
                    if ((!currentRoom) || (currentRoom.game.gen < room.game.gen)) {
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

    const room = new Room({
        ...body.payload,
        timestamp: new Date(),
    })
    room.save()
        .then((result) => {
            response.json(result)
        })
})

roomRouter.delete('/:roomName?', (request, result) => {
    /*
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
    */
})

export default roomRouter
