import { Request, Response, Router } from 'express'
import IIncRoom from '../incomingInterfaces/incRoom.js'
import { getAllRoomsForUserIdWithRole, getRoomFromId, overwriteRoom, parseIncRoomToRoomSchema } from '../utils/roomHandler.js'

interface IRoomsRouterRequestQuery {
    roomId?: string,
    hostUserGuid?: string,
}

interface IRoomsRouterRequestBody {
    payload: string,
    roomId: string,
    roomName: string,
    hostUserGuid: string,
}

const roomRouter = Router()

roomRouter.get('/:roomId?:hostUserGuid?', (request: Request<unknown, unknown, unknown, IRoomsRouterRequestQuery>, response: Response) => {
    const roomId = request.query.roomId !== undefined ? request.query.roomId : ''
    const hostUserGuid = (request.query.hostUserGuid !== undefined) ? request.query.hostUserGuid : ''

    if (hostUserGuid !== '') {
        getAllRoomsForUserIdWithRole(roomId, hostUserGuid)
            .then((result) => response.json(result))
            .catch(() => response.json([]))
    } else if (roomId !== '') {
        getRoomFromId(roomId)
            .then((result) => response.json([result]))
            .catch(() => response.json([]))
    } else {
        response.json([])
    }
})

roomRouter.post('/', (request: Request<unknown, unknown, IRoomsRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.payload === undefined) {
        response.status(400).json({ error: 'Request Payload is missing.' })
        return
    }
    if ((body.roomId === undefined || body.roomId === '') || ((body.roomName === undefined) || (body.roomName === ''))) {
        response.status(400).json({ error: 'Room was not specified.' })
        return
    }
    if ((body.hostUserGuid === undefined) || (body.hostUserGuid === '')) {
        response.status(400).json({ error: 'Host was not specified.' })
        return
    }

    const incRoom = JSON.parse(body.payload) as IIncRoom
    const newRoom = parseIncRoomToRoomSchema(incRoom, body.hostUserGuid, body.roomId, body.roomName, new Date())

    overwriteRoom(body.roomId, body.roomName, body.hostUserGuid, newRoom)
        .then((result) => response.json(result))
        .catch(() => response.json({}))
})

/*
//TODO: Implement Room Deletion
roomRouter.delete('/:roomId?', (request, result) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
*/

export default roomRouter
