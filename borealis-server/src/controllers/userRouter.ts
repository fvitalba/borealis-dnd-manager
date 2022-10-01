import { Request, Response, Router } from 'express'
import { registerUser, getAllActiveUsers, authenticateUser, startUserSession, parseIncUserToUserSchema } from '../utils/userHandler.js'
import IIncUser from '../incomingInterfaces/incUser.js'

interface IUsersRouterRequestQuery {
    userGuid?: string,
}

interface IUsersRouterRequestBody {
    payload?: string,
    newUser?: string,
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

userRouter.get('/:userGuid?', (request: Request<unknown, unknown, unknown, IUsersRouterRequestQuery>, response: Response) => {
    const userGuid = request.query.userGuid ? request.query.userGuid : ''

    // First we updated all the Users Activity
    getAllActiveUsers(userGuid)
        .then((result) => response.json(result))
        .catch(() => [])
})

userRouter.post('/authenticate/', (request: Request<unknown, unknown, IUsersRouterRequestBody, unknown>, response: Response) => {
    const body = request.body
    if (!body.userGuid && !body.userName && !body.email) {
        response.status(400).json({ error: 'Request is badly specified. Please provide either a userGuid, userName or email.' })
        return
    }
    if (!body.secret && !body.isGuest && !body.sessionToken) {
        response.status(400).json({ error: 'Users must specify their secret to authenticate.' })
        return
    }
    if (!body.userName && body.isGuest) {
        response.status(400).json({ error: 'Guests must specify a username.' })
        return
    }

    const isGuest = body.isGuest ? body.isGuest : false
    authenticateUser(isGuest, body.userGuid, body.userName, body.email, body.secret, body.sessionToken)
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
    if (!body.newUser) {
        response.status(400).json({ error: 'Request is badly specified. Please provide an user for registration.' })
        return
    }

    const incUser = JSON.parse(body.newUser) as IIncUser
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
        if (!body.userGuid && !body.secret && !body.isGuest) {
            response.status(400).json({ error: 'Request is badly specified. Please provide either authentication or an existing session token.' })
            return
        }
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
