import supertest from 'supertest'
import { randomUUID } from 'crypto'
import mongo from '../utils/mongo'
import app from '../app'
import User, { IUserSchema } from '../models/user'
import { initialUsers, initialUsersForAuthentication, newActualUser, newGuestUser } from './testData/initial.users'
import Session from '../models/session'

const usersGetEndpoint = '/api/v1.0/users'
const usersPostEndpoint = '/api/v1.0/users'
const usersRegisterEndpoint = usersPostEndpoint + '/register'
const usersAuthenticateEndpoint = usersPostEndpoint + '/authenticate'
const usersSessionEndpoint = usersPostEndpoint + '/session'

const getHashedSecret = (inputPassword: string): string => {
    switch (inputPassword) {
    case 'password':
        return '$argon2id$v=19$m=4096,t=3,p=1$+WEtYQRcN9cWU3ASX65FPA$N2lxRSkie3+oU68BnwcR1VRfz15k2URL45RU1SpHCYw'
    case 'drowssap':
        return '$argon2id$v=19$m=4096,t=3,p=1$NQ68CTgNKSnwniUtY5rhVg$aC+gL5GTA6vkPnaP4Om9xatTujxOwaT0SOubJRmBwWE'
    default:
        return ''
    }
}

const resetInitialUsers = async () => {
    await User.deleteMany()
    initialUsers.map(async (initialUser) => {
        const newUser = new User({
            ...initialUser,
            secret: getHashedSecret(initialUser.secret),
        })
        await newUser.save()
    })
}

const resetInitialAuthUsers = async () => {
    await User.deleteMany()
    initialUsersForAuthentication.map(async (initialUser) => {
        const newUser = new User({
            ...initialUser,
            secret: getHashedSecret(initialUser.secret),
        })
        await newUser.save()
    })
}

const resetActiveSessions = async () => {
    await Session.deleteMany()
}

describe('GET /users', () => {
    beforeEach(async () => {
        await resetInitialUsers()
    }, 100000)

    it('Retrieves a JSON List of Users', async () => {
        await supertest(app)
            .get(usersGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Users contains the list of initial Users', async () => {
        const response = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response.body).toHaveLength(activeInitialUsers.length)
    }, 100000)

    it('The List of Users does not contain a Guest User with an E-Mail', async () => {
        const response = await supertest(app).get(usersGetEndpoint)
        const responseUsers = response.body as Array<IUserSchema>
        const guestUsersWithEmail = responseUsers.filter((user: IUserSchema) => (user.email !== '') && (user.guest))
        expect(guestUsersWithEmail).toHaveLength(0)
    }, 100000)

    it('The List of Users does not contain the same Username twice', async () => {
        const response = await supertest(app).get(usersGetEndpoint)
        const responseUsers = response.body as Array<IUserSchema>
        const usersCount = responseUsers.map((user: IUserSchema) => {
            const usersCopy = response.body as Array<IUserSchema>
            const usersWithSameUsername = usersCopy.filter((userCopy) => userCopy.name === user.name)
            return usersWithSameUsername.length
        })
        usersCount.forEach((userCounter: number) => {
            expect(userCounter).toBe(1)
        })
    }, 100000)

    it('No User secret is passed on to the API', async () => {
        const response = await supertest(app).get(usersGetEndpoint)
        const responseUsers = response.body as Array<IUserSchema>
        const usersWithSecret = responseUsers.filter((user: IUserSchema) => (user.secret !== ''))
        expect(usersWithSecret).toHaveLength(0)
    }, 100000)
})

describe('POST /users - Register', () => {
    beforeEach(async () => {
        await resetInitialUsers()
    }, 100000)

    it('Register a new Actual User', async () => {
        const params = {
            newUser: newActualUser,
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        expect(response.body.error).toBeUndefined()
        expect(response.body.guid).not.toBe('')

        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length + 1)
    }, 100000)

    it('Do not register a new Actual User with an existing Email', async () => {
        const existingUserEmails = initialUsers.filter((existingUser) => (existingUser.email !== '') && (existingUser.active))
        const params = {
            newUser: {
                ...newActualUser,
                email: existingUserEmails[0].email,
            },
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()

        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length)
    }, 100000)

    it('Do not register a new Actual User without secret or email', async () => {
        const params = {
            newUser: {
                ...newActualUser,
                email: '',
            },
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()

        const params2 = {
            newUser: {
                ...newActualUser,
                secret: '',
            },
        }
        const response2 = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params2)
        expect(response2.body.error).not.toBeUndefined()
        expect(response2.body.guid).toBeUndefined()

        const response3 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response3.body).toHaveLength(activeInitialUsers.length)
    }, 100000)

    it('Register a new Guest User', async () => {
        const params = {
            newUser: newGuestUser,
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        expect(response.body.error).toBeUndefined()
        expect(response.body.guid).not.toBe('')

        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length + 1)
    }, 100000)

    it('Do not register a new Guest User with the same UserName as another User', async () => {
        const params = {
            newUser: {
                ...newGuestUser,
                userName: initialUsers[0].name,
            },
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()

        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length)
    }, 100000)
})

describe('POST /users - Authenticate', () => {
    beforeEach(async () => {
        await resetInitialAuthUsers()
    }, 100000)

    it('Authenticate the third Actual User', async () => {
        // First we authenticate providing all possible parameters
        const params = {
            isGuest: initialUsersForAuthentication[2].guest,
            userGuid: initialUsersForAuthentication[2].guid,
            userName: initialUsersForAuthentication[2].name,
            email: initialUsersForAuthentication[2].email,
            secret: initialUsersForAuthentication[2].secret,
        }
        const response = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params)
        expect(response.body.error).toBeUndefined()
        expect(response.body.guid).not.toBe('')
        expect(response.body.name).toBe(initialUsersForAuthentication[2].name)
        expect(response.body.email).toBe(initialUsersForAuthentication[2].email)
        expect(response.body.guest).toBe(initialUsersForAuthentication[2].guest)
        expect(response.body.secret).toBe('')

        // Then we authenticate by just providing guest, name and secret
        const params2 = {
            isGuest: initialUsersForAuthentication[2].guest,
            userGuid: '',
            userName: initialUsersForAuthentication[2].name,
            email: '',
            secret: initialUsersForAuthentication[2].secret,
        }
        const response2 = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params2)
        expect(response2.body.error).toBeUndefined()
        expect(response2.body.guid).not.toBe('')
        expect(response2.body.name).toBe(initialUsersForAuthentication[2].name)
        expect(response2.body.email).not.toBe('')
        expect(response2.body.guest).toBe(initialUsersForAuthentication[2].guest)
        expect(response2.body.secret).toBe('')

        // Then we authenticate by just providing guest, mail and secret
        const params3 = {
            isGuest: initialUsersForAuthentication[2].guest,
            userGuid: '',
            userName: '',
            email: initialUsersForAuthentication[2].email,
            secret: initialUsersForAuthentication[2].secret,
        }
        const response3 = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params3)
        expect(response3.body.error).toBeUndefined()
        expect(response3.body.guid).not.toBe('')
        expect(response3.body.name).not.toBe('')
        expect(response3.body.email).toBe(initialUsersForAuthentication[2].email)
        expect(response3.body.guest).toBe(initialUsersForAuthentication[2].guest)
        expect(response3.body.secret).toBe('')
    }, 100000)

    it('Do not allow authentication for the new Actual User with the wrong secret', async () => {
        // First we just provide no secret.
        const params = {
            isGuest: initialUsersForAuthentication[2].guest,
            userGuid: initialUsersForAuthentication[2].guid,
            userName: initialUsersForAuthentication[2].name,
            email: initialUsersForAuthentication[2].email,
            secret: '',
        }
        const response = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()
        expect(response.body.name).toBeUndefined()
        expect(response.body.email).toBeUndefined()
        expect(response.body.guest).toBeUndefined()
        expect(response.body.secret).toBeUndefined()

        // Then we provide just a username and nothing else
        const params2 = {
            isGuest: false,
            userGuid: '',
            userName: initialUsersForAuthentication[2].name,
            email: '',
            secret: '',
        }
        const response2 = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params2)
        expect(response2.body.error).not.toBeUndefined()
        expect(response2.body.guid).toBeUndefined()
        expect(response2.body.name).toBeUndefined()
        expect(response2.body.email).toBeUndefined()
        expect(response2.body.guest).toBeUndefined()
        expect(response2.body.secret).toBeUndefined()

        // Then we provide just a username and the already hashed secret
        const params3 = {
            isGuest: false,
            userGuid: '',
            userName: initialUsersForAuthentication[2].name,
            email: '',
            secret: getHashedSecret(initialUsersForAuthentication[2].secret),
        }
        const response3 = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params3)
        expect(response3.body.error).not.toBeUndefined()
        expect(response3.body.guid).toBeUndefined()
        expect(response3.body.name).toBeUndefined()
        expect(response3.body.email).toBeUndefined()
        expect(response3.body.guest).toBeUndefined()
        expect(response3.body.secret).toBeUndefined()
    }, 100000)

})

describe('POST /users - Sessions', () => {
    beforeEach(async () => {
        await resetInitialAuthUsers()
        await resetActiveSessions()
    }, 100000)

    const startSession = async (isGuest: boolean, userGuid: string, secret: string, sessionToken: string): Promise<supertest.Test> => {
        const params = {
            isGuest: isGuest,
            userGuid: userGuid,
            secret: secret,
            sessionToken: sessionToken,
        }
        const response = await supertest(app)
            .post(usersSessionEndpoint)
            .send(params)
        return response
    }

    const checkStartSessionSuccessful = async (isGuest: boolean, userGuid: string, secret: string, sessionToken: string): Promise<string> => {
        const response = await startSession(isGuest, userGuid, secret, sessionToken)
        expect(response.body.error).toBeUndefined()
        expect(response.body).toHaveLength(1)
        expect(response.body).not.toBeUndefined()
        return response.body[0] as string
    }

    const checkStartSessionUnsuccessful = async (isGuest: boolean, userGuid: string, secret: string, sessionToken: string): Promise<string> => {
        const response = await startSession(isGuest, userGuid, secret, sessionToken)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body[0]).toBeUndefined()
        return ''
    }

    it('Start a Session for an Actual User', async () => {
        await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, '')
    }, 100000)

    it('Get the Active Session for an Actual User', async () => {
        const activeSessionId = await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, '')
        const newSessionId = await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, activeSessionId)
        expect(activeSessionId).toBe(newSessionId)
    }, 100000)

    it('Start a Session for a Guest User', async () => {
        await checkStartSessionSuccessful(initialUsersForAuthentication[4].guest, initialUsersForAuthentication[4].guid, initialUsersForAuthentication[4].secret, '')
    }, 100000)

    it('Do not start a Session for a nonexisting User', async () => {
        await checkStartSessionUnsuccessful(false, '', '', '')
        await checkStartSessionUnsuccessful(false, randomUUID(), randomUUID(), '')
        await checkStartSessionUnsuccessful(true, '', '', '')
        await checkStartSessionUnsuccessful(true, randomUUID(), '', '')
    }, 100000)

    /*
    it('Update the Online Status of the Users', async () => {

    }, 100000)

    it('Overwrite all Users with the Inital Users', async () => {

    }, 100000)

    it('Overwrite a nonexisting User', async () => {

    }, 100000)
    */
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
