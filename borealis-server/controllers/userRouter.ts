import { Request, Response, Router } from 'express'
import { registerUser, overwriteRoomUsers, setRoomUsersInactiveAfterTimeout, getAllRoomActiveUsers, parseIncRoomUserToRoomUserSchema, overwriteSingleRoomUser, overwriteAllRoomUsersStatus, authenticateUser, emptyUser, startUserSession } from '../utils/userHandler.js'
import IIncRoomUser from '../incomingInterfaces/incRoomUser.js'
import IIncUser from '../incomingInterfaces/incUser.js'

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

const userRouter = Router()

userRouter.get('/:userGuid?:roomId?', (request: Request<unknown, unknown, unknown, IUsersRouterRequestQuery>, response: Response) => {
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

userRouter.post('/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    //TODO: Verify that these typings are correct. Apparently newUser and payload were different User-Classes
    const body = request.body
    if (!body.newUser && !body.payload)
        response.status(400).json({ error: 'Request is badly specified. Please provide users to save.' })

    if (body.newRoomUser !== undefined) {
        const incRoomUser = body.newRoomUser
        const newRoomUser = parseIncRoomUserToRoomUserSchema(incRoomUser)
        overwriteSingleRoomUser(body.roomId, newRoomUser)
            .then((result) => response.json(result))
    }
    if (body.payload !== undefined) {
        const incUsers = JSON.parse(body.payload) as Array<IIncRoomUser>
        const newUsers = incUsers.map((incUser) => parseIncRoomUserToRoomUserSchema(incUser))
        overwriteRoomUsers(body.roomId, newUsers)
            .then((result) => response.json(result))
    }
    response.status(400).json({ error: 'Request is badly specified. Either newRoomUser or payload was missing.' })
})

userRouter.post('/status/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (body.active === undefined)
        response.status(400).json({ error: 'Request is badly specified. Either RoomID or new Status was missing.' })

    const newUserActive = body.active ? body.active : false
    overwriteAllRoomUsersStatus(body.roomId, newUserActive)
        .then((result) => response.json(result))
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
    const authenticatedUser = authenticateUser(isGuest, body.userGuid, body.userName, body.email, body.secret)
        .then((result) => result)
        .catch(() => emptyUser())
    if (authenticatedUser.guid === '')
        response.status(401).json({ error: 'The provided credentials are incorrect.' })
    response.json(authenticatedUser)
})

userRouter.post('/register/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.newRoomUser)
        response.status(400).json({ error: 'Request is badly specified. Please provide an user for registration.' })

    const incUser = body.newUser
    const newUser = parseIncRoomUserToRoomUserSchema(incUser)
    const registeredUser = registerUser(newUser)
        .then((result) => result)
        .catch(() => emptyUser())
    if (registeredUser.guid === '')
        response.status(500).json({ error: 'User could not be registered.' })
    response.json(registeredUser)
})

userRouter.post('/session/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    console.log('POST user/session, body:', body)
    if (!body.userGuid && !body.sessionToken) {
        if (!body.userGuid && !body.secret && !body.isGuest)
            response.status(400).json({ error: 'Request is badly specified. Please provide either authentication or an existing session token.' })
    }

    const isGuest = body.isGuest ? body.isGuest : false
    const newSessionToken = startUserSession(isGuest, body.userGuid, body.sessionToken, body.secret)
        .then((result) => result)
        .catch(() => '')
    if (newSessionToken === '')
        response.status(500).json({ error: 'Session could not be opened.' })
    response.json([ newSessionToken ])
})

export default userRouter
