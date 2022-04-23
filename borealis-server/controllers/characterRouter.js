import { Router } from 'express'
import Character from '../models/character.js'
import { saveUpdateRoomCharacter } from '../utils/characterHandler.js'

const characterRouter = new Router()

characterRouter.get('/:roomName?:characterGuid?', (request, result) => {
    const roomName = request.params.roomName ? request.params.roomName : request.query.roomName
    const characterGuid = request.params.characterGuid ? request.params.characterGuid : request.query.characterGuid

    if (roomName) {
        const queryParameters = characterGuid ? { 'roomName': roomName, 'guid': characterGuid, } : { 'roomName': roomName, }
        Character.find(queryParameters)
            .then((characters) => {
                result.json(characters)
            })
    } else {
        result.json([])
    }
})

characterRouter.post('/', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'Request Payload is missing.' })
    if (body.room === undefined)
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomCharacter(body.room, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default characterRouter
