import { Request, Response, Router } from 'express'
import { overwriteRoomUsers, setRoomUsersInactiveAfterTimeout, getAllRoomActiveUsers, parseIncRoomUserToRoomUserSchema, overwriteSingleRoomUser, overwriteAllRoomUsersStatus } from '../utils/userHandler.js'
import IIncRoomUser from '../incomingInterfaces/incRoomUser.js'

interface IUsersRouterRequestQuery {
    userGuid?: string,
    roomId?: string,
}

interface IUsersRouterRequestBody {
    payload?: string,
    newRoomUser?: string,
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
            getAllRoomActiveUsers(roomId, userGuid)
                .then((roomUsers) => response.json(roomUsers))
                .catch(() => response.json([]))
        })
        .catch(() => response.json([]))
})

roomUserRouter.post('/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    //TODO: Verify that these typings are correct. Apparently newUser and payload were different User-Classes
    const body = request.body
    if (!body.newRoomUser && !body.payload) {
        response.status(400).json({ error: 'Request is badly specified. Please provide users to save.' })
        return
    }

    if (body.newRoomUser !== undefined) {
        const incRoomUser = JSON.parse(body.newRoomUser) as IIncRoomUser
        const newRoomUser = parseIncRoomUserToRoomUserSchema(incRoomUser)
        const updatedUsers = overwriteSingleRoomUser(body.roomId, newRoomUser)
            .then((result) => [result])
            .catch(() => [])
        response.json(updatedUsers)
        return
    }
    if (body.payload !== undefined) {
        const incUsers = JSON.parse(body.payload) as Array<IIncRoomUser>
        const newUsers = incUsers.map((incUser) => parseIncRoomUserToRoomUserSchema(incUser))
        const updatedUsers = overwriteRoomUsers(body.roomId, newUsers)
            .then((result) => result)
            .catch(() => [])
        response.json(updatedUsers)
        return
    }
    response.status(400).json({ error: 'Request is badly specified. Either newRoomUser or payload was missing.' })
})

roomUserRouter.post('/status/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.active === undefined) {
        response.status(400).json({ error: 'Request is badly specified. Either RoomID or new Status was missing.' })
        return
    }

    const newUserActive = body.active ? body.active : false
    const updatedUsers = overwriteAllRoomUsersStatus(body.roomId, newUserActive)
        .then((result) => result)
        .catch(() => [])
    response.json(updatedUsers)
})

export default roomUserRouter
