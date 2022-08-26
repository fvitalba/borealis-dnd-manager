import { Request, Response, Router } from 'express'
import IIncCharacter from '../incomingInterfaces/incCharacter'
import { overwriteRoomCharacters, getRoomCharacters, parseIncCharacterToCharacterSchema } from '../utils/characterHandler'

interface ICharacterRouterRequestQuery {
    roomId?: string,
    characterGuid?: string,
}

interface ICharacterRouterRequestBody {
    payload: string,
    roomId: string,
}

const characterRouter = Router()

characterRouter.get('/:roomId?:characterGuid?', (request: Request<unknown, unknown, unknown, ICharacterRouterRequestQuery>, response: Response) => {
    const roomId = request.query.roomId ? request.query.roomId : ''
    const characterGuid = request.query.characterGuid ? request.query.characterGuid : ''

    if (roomId !== '') {
        response.json(getRoomCharacters(roomId, characterGuid))
    } else {
        response.json([])
    }
})

characterRouter.post('/', (request: Request<unknown, unknown, ICharacterRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.payload === undefined) {
        response.status(400).json({ error: 'Request Payload is missing.' })
        return
    }
    if (body.roomId === undefined || body.roomId === '') {
        response.status(400).json({ error: 'Room was not specified.' })
        return
    }

    const incCharacters = JSON.parse(body.payload) as Array<IIncCharacter>
    const newCharacters = incCharacters.map((incCharacter) => parseIncCharacterToCharacterSchema(incCharacter, body.roomId, new Date()))

    const updatedCharacters = overwriteRoomCharacters(body.roomId, newCharacters)
        .then((result) => result)
    response.json(updatedCharacters)
})

export default characterRouter
