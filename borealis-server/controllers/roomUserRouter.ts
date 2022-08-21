import { Request, Response, Router } from 'express'
import { overwriteRoomUsers, setRoomUsersInactiveAfterTimeout, getAllRoomActiveUsers, parseIncRoomUserToRoomUserSchema, overwriteSingleRoomUser, overwriteAllRoomUsersStatus } from '../utils/userHandler'
import IIncRoomUser from '../incomingInterfaces/incRoomUser'
import IIncUser from '../incomingInterfaces/incUser'

interface IUsersRouterRequestQuery {
    userGuid?: string,
    roomId?: string,
}

interface IUsersRouterRequestBody {
    payload?: string,
    newRoomUser?: IIncRoomUser,
    newUser?: IIncUser,
    roomId: string,
    active?: boolean,
    userGuid?: string,
    userName?: string,
    secret?: string,
    isGuest?: boolean,
    email?: string,
    sessionToken?: string,
}

const roomUserRouter = Router()

roomUserRouter.get('/:userGuid?:roomId?', (request: Request<unknown, unknown, unknown, IUsersRouterRequestQuery>, response: Response) => {
    const userGuid = request.query.userGuid ? request.query.userGuid : ''
    const roomId = request.query.roomId ? request.query.roomId : ''

    // First we updated all the Users Activity
    setRoomUsersInactiveAfterTimeout()
        .then(() => {
            // Then we retrieve the users from the DB and return them
            response.json(getAllRoomActiveUsers(roomId, userGuid))
        })
        .catch(() => response.json([]))
})

roomUserRouter.post('/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    //TODO: Verify that these typings are correct. Apparently newUser and payload were different User-Classes
    const body = request.body
    if (!body.newUser && !body.payload)
        response.status(400).json({ error: 'Request is badly specified. Please provide users to save.' })

    if (body.newRoomUser !== undefined) {
        const incRoomUser = body.newRoomUser
        const newRoomUser = parseIncRoomUserToRoomUserSchema(incRoomUser)
        const updatedUsers = overwriteSingleRoomUser(body.roomId, newRoomUser)
            .then((result) => [result])
            .catch(() => [])
        response.json(updatedUsers)
    }
    if (body.payload !== undefined) {
        const incUsers = JSON.parse(body.payload) as Array<IIncRoomUser>
        const newUsers = incUsers.map((incUser) => parseIncRoomUserToRoomUserSchema(incUser))
        const updatedUsers = overwriteRoomUsers(body.roomId, newUsers)
            .then((result) => result)
            .catch(() => [])
        response.json(updatedUsers)
    }
    response.status(400).json({ error: 'Request is badly specified. Either newRoomUser or payload was missing.' })
})

roomUserRouter.post('/status/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.active === undefined)
        response.status(400).json({ error: 'Request is badly specified. Either RoomID or new Status was missing.' })

    const newUserActive = body.active ? body.active : false
    const updatedUsers = overwriteAllRoomUsersStatus(body.roomId, newUserActive)
        .then((result) => result)
        .catch(() => [])
    response.json(updatedUsers)
})

export default roomUserRouter
