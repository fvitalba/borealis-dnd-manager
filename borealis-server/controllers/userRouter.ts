import { Request, Response, Router } from 'express'
import { registerUser, overwriteRoomUsers, getAllActiveUsers, parseIncRoomUserToRoomUserSchema, overwriteSingleRoomUser, overwriteAllRoomUsersStatus, authenticateUser, startUserSession, parseIncUserToUserSchema } from '../utils/userHandler'
import IIncRoomUser from '../incomingInterfaces/incRoomUser'
import IIncUser from '../incomingInterfaces/incUser'

interface IUsersRouterRequestQuery {
    userGuid?: string,
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

const userRouter = Router()

userRouter.get('/:userGuid?', async (request: Request<unknown, unknown, unknown, IUsersRouterRequestQuery>, response: Response) => {
    const userGuid = request.query.userGuid ? request.query.userGuid : ''

    // First we updated all the Users Activity
    response.json(await getAllActiveUsers(userGuid))
})

userRouter.post('/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
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

userRouter.post('/status/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.active === undefined)
        response.status(400).json({ error: 'Request is badly specified. Either RoomID or new Status was missing.' })

    const newUserActive = body.active ? body.active : false
    const updatedUsers = overwriteAllRoomUsersStatus(body.roomId, newUserActive)
        .then((result) => result)
        .catch(() => [])
    response.json(updatedUsers)
})

userRouter.post('/authenticate/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.userGuid && !body.userName && !body.email)
        response.status(400).json({ error: 'Request is badly specified. Please provide either a userGuid, userName or email.' })
    if (!body.secret && !body.isGuest)
        response.status(400).json({ error: 'Users must specify their secret to authenticate.' })
    if (!body.userName && body.isGuest)
        response.status(400).json({ error: 'Guests must specify a username.' })

    const isGuest = body.isGuest ? body.isGuest : false
    authenticateUser(isGuest, body.userGuid, body.userName, body.email, body.secret)
        .then((result) => {
            if (result.guid === '')
                response.status(401).json({ error: 'The provided credentials are incorrect.' })
            else
                response.json(result)
        })
        .catch(() => response.status(401).json({ error: 'The provided credentials are incorrect.' }))
})

userRouter.post('/register/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.newUser)
        response.status(400).json({ error: 'Request is badly specified. Please provide an user for registration.' })

    const incUser = body.newUser as IIncUser
    const newUser = parseIncUserToUserSchema(incUser, false, (new Date()).getMilliseconds())
    registerUser(newUser)
        .then((result) => {
            if (result.guid === '')
                response.status(500).json({ error: 'User could not be registered.' })
            else
                response.json(result)
        })
        .catch(() => response.status(500).json({ error: 'User could not be registered.' }))
})

userRouter.post('/session/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.userGuid && !body.sessionToken) {
        if (!body.userGuid && !body.secret && !body.isGuest)
            response.status(400).json({ error: 'Request is badly specified. Please provide either authentication or an existing session token.' })
    }

    startUserSession(body.userGuid, body.sessionToken, body.secret)
        .then((result) => {
            if (result === '')
                response.status(500).json({ error: 'Session could not be opened.' })
            else
                response.json([ result ])
        })
        .catch(() => response.status(500).json({ error: 'Session could not be opened.' }))
})

export default userRouter
