import supertest from 'supertest'
import { randomUUID } from 'crypto'
import mongo from '../src/utils/mongo.js'
import app from '../app.js'
import User, { IUserSchema } from '../src/models/user.js'
import { initialUsers, initialUsersForAuthentication, newActualUser, newGuestUser } from './testData/initial.users.js'
import Session from '../src/models/session.js'
import IIncUser from '../src/incomingInterfaces/incUser.js'

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
    for (const initialUser of initialUsers) {
        const newUser = new User({
            ...initialUser,
            secret: getHashedSecret(initialUser.secret),
        })
        await newUser.save()
    }
}

const resetInitialAuthUsers = async () => {
    await User.deleteMany()
    for (const initialUser of initialUsersForAuthentication) {
        const newUser = new User({
            ...initialUser,
            secret: getHashedSecret(initialUser.secret),
        })
        await newUser.save()
    }
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

    const registerUser = async (newUser: IIncUser): Promise<supertest.Test> => {
        const params = {
            newUser: JSON.stringify(newUser),
        }
        const response = await supertest(app)
            .post(usersRegisterEndpoint)
            .send(params)
        return response
    }

    const checkRegisterUserSuccessful = async (newUser: IIncUser) => {
        const response = await registerUser(newUser)
        expect(response.body.error).toBeUndefined()
        expect(response.body.guid).not.toBe('')
    }

    const checkRegisterUserUnsuccessful = async (newUser: IIncUser) => {
        const response = await registerUser(newUser)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()
    }

    it('Register a new Actual User', async () => {
        // Take the newActualUser example to create a new User
        await checkRegisterUserSuccessful(newActualUser)

        // Check if the number of users now is incremented by 1
        const response = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response.body).toHaveLength(activeInitialUsers.length + 1)
    }, 100000)

    it('Do not register a new Actual User with an existing Email or Username', async () => {
        // Get a list of users with emails that are already present
        // Then take that Email and overwrite the newActualUser mail
        // Then try to create a new User using the existing mail
        const existingUserEmails = initialUsers.filter((existingUser) => (existingUser.email !== '') && (existingUser.active))
        const newUserWithExistingEmail = {
            ...newActualUser,
            email: existingUserEmails[0].email,
        }
        await checkRegisterUserUnsuccessful(newUserWithExistingEmail)

        // Check that we cannot create a new User with a different Email, but the same Username as someone else
        const newUserWithExistingName = {
            ...newActualUser,
            userName: existingUserEmails[0].name,
        }
        await checkRegisterUserUnsuccessful(newUserWithExistingName)

        // Check if the number of users now is still the same
        const response = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response.body).toHaveLength(activeInitialUsers.length)
    }, 100000)

    it('Do not register a new Actual User without secret or email', async () => {
        // Try registering without Email
        const newUserNoEmail = {
            ...newActualUser,
            email: '',
        }
        await checkRegisterUserUnsuccessful(newUserNoEmail)

        // Try registering without secret
        const newUserNoSecret = {
            ...newActualUser,
            secret: '',
        }
        await checkRegisterUserUnsuccessful(newUserNoSecret)

        // Verify that the list of users is still the same length
        const response = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response.body).toHaveLength(activeInitialUsers.length)
    }, 100000)

    it('Register a new Guest User', async () => {
        // Register a Guest user using the newGuestUser template
        await checkRegisterUserSuccessful(newGuestUser)

        // Check if the count of users in the DB has correctly increased by 1
        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length + 1)
    }, 100000)

    it('Do not register a new Guest User with the same UserName as another User', async () => {
        // Try registering a Guest User, using an already existing UserName
        const newUser = {
            ...newGuestUser,
            userName: initialUsers[0].name,
        }
        await checkRegisterUserUnsuccessful(newUser)

        // Check if the User List is still the same length as before
        const response2 = await supertest(app).get(usersGetEndpoint)
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response2.body).toHaveLength(activeInitialUsers.length)
    }, 100000)
})

describe('POST /users - Authenticate', () => {
    beforeEach(async () => {
        await resetInitialAuthUsers()
    }, 100000)

    const authenticateUser = async (isGuest: boolean, userGuid: string, userName: string, email: string, secret: string): Promise<supertest.Test> => {
        const params = {
            isGuest: isGuest,
            userGuid: userGuid,
            userName: userName,
            email: email,
            secret: secret,
        }
        const response = await supertest(app)
            .post(usersAuthenticateEndpoint)
            .send(params)
        return response
    }

    const checkAuthenticateUserSuccessful = async (isGuest: boolean, userGuid: string, userName: string, email: string, secret: string) => {
        const response = await authenticateUser(isGuest, userGuid, userName, email, secret)
        expect(response.body.error).toBeUndefined()
        if (userGuid !== '')
            expect(response.body.guid).toBe(userGuid)
        else
            expect(response.body.guid).not.toBe('')
        if (userName !== '')
            expect(response.body.name).toBe(userName)
        else
            expect(response.body.name).not.toBe('')
        if (email !== '')
            expect(response.body.email).toBe(email)
        else
            expect(response.body.email).not.toBe('')
        expect(response.body.guest).toBe(isGuest)
        expect(response.body.secret).toBe('')
    }

    const checkAuthenticateUserUnsuccessful = async (isGuest: boolean, userGuid: string, userName: string, email: string, secret: string) => {
        const response = await authenticateUser(isGuest, userGuid, userName, email, secret)
        expect(response.body.error).not.toBeUndefined()
        expect(response.body.guid).toBeUndefined()
        expect(response.body.name).toBeUndefined()
        expect(response.body.email).toBeUndefined()
        expect(response.body.guest).toBeUndefined()
        expect(response.body.secret).toBeUndefined()
    }

    it('Authenticate the third Actual User', async () => {
        // First we authenticate providing all possible parameters
        await checkAuthenticateUserSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].name, initialUsersForAuthentication[2].email, initialUsersForAuthentication[2].secret)

        // Then we authenticate by just providing guest, name and secret
        await checkAuthenticateUserSuccessful(initialUsersForAuthentication[2].guest, '', initialUsersForAuthentication[2].name, '', initialUsersForAuthentication[2].secret)

        // Then we authenticate by just providing guest, mail and secret
        await checkAuthenticateUserSuccessful(initialUsersForAuthentication[2].guest, '', '', initialUsersForAuthentication[2].email, initialUsersForAuthentication[2].secret)
    }, 100000)

    it('Do not allow authentication for the new Actual User with the wrong secret', async () => {
        // First we just provide no secret.
        await checkAuthenticateUserUnsuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].name, initialUsersForAuthentication[2].email, '')

        // Then we provide just a username and nothing else
        await checkAuthenticateUserUnsuccessful(false, '', initialUsersForAuthentication[2].name, '', '')

        // Then we provide just a username and the already hashed secret
        await checkAuthenticateUserUnsuccessful(false, '', initialUsersForAuthentication[2].name, '', getHashedSecret(initialUsersForAuthentication[2].secret))
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
        // Provide a normal actual user and authenticate for a brand new Session
        await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, '')
    }, 100000)

    it('Get the Active Session for an Actual User', async () => {
        // Create a new Session
        const activeSessionId = await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, '')
        // Take the earlier created session and check if you get the same session or a new one
        const newSessionId = await checkStartSessionSuccessful(initialUsersForAuthentication[2].guest, initialUsersForAuthentication[2].guid, initialUsersForAuthentication[2].secret, activeSessionId)
        expect(activeSessionId).toBe(newSessionId)
    }, 100000)

    it('Start a Session for a Guest User', async () => {
        // Start a session for a guest user
        await checkStartSessionSuccessful(initialUsersForAuthentication[4].guest, initialUsersForAuthentication[4].guid, initialUsersForAuthentication[4].secret, '')
    }, 100000)

    it('Do not start a Session for a nonexisting User', async () => {
        // Try starting a session without any information
        await checkStartSessionUnsuccessful(false, '', '', '')
        // Try starting a session with a random username and secret
        await checkStartSessionUnsuccessful(false, randomUUID(), randomUUID(), '')
        // Try starting a session for a guest user, but without providing a name or existing token
        await checkStartSessionUnsuccessful(true, '', '', '')
        // Try starting a session for a guest user, that does not exist (random name).
        await checkStartSessionUnsuccessful(true, randomUUID(), '', '')
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
