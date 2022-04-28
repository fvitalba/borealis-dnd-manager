import { Router } from 'express'
import Character from '../models/character.js'
import { saveUpdateRoomCharacters } from '../utils/characterHandler.js'

const characterRouter = new Router()

characterRouter.get('/:roomId?:characterGuid?', (request, result) => {
    const roomId = request.params.roomId ? request.params.roomId : request.query.roomId
    const characterGuid = request.params.characterGuid ? request.params.characterGuid : request.query.characterGuid

    if (roomId !== undefined && roomId !== '') {
        const queryParameters = characterGuid ? { 'roomId': roomId, 'guid': characterGuid, } : { 'roomId': roomId, }
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
    if (body.roomId === undefined || body.roomId === '')
        return response.status(400).json({ error: 'Room was not specified.' })

    saveUpdateRoomCharacters(body.roomId, JSON.parse(body.payload))
        .then((result) => response.json(result))
})

export default characterRouter
