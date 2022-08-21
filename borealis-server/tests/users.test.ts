import supertest from 'supertest'
import mongo from '../utils/mongo'
import app from '../app'
import User from '../models/user'
import { initialUsers } from './testData/initial.users'

describe('GET /users', () => {
    it('retrieves a JSON List of Users', async () => {
        await supertest(app)
            .get('/api/v1.0/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Users contains the list of initial Users', async () => {
        const response = await supertest(app).get('/api/v1.0/users')
        const activeInitialUsers = initialUsers.filter((initialUser) => initialUser.active)
        expect(response.body).toHaveLength(activeInitialUsers.length)
    }, 100000)
})

beforeAll(async () => {
    await User.deleteMany()
    initialUsers.map(async (initialUser) => {
        const newUser = new User(initialUser)
        await newUser.save()
    })
})

afterAll(async () => {
    await mongo.connection.close()
})
