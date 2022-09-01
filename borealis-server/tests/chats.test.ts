import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'

const chatsGetEndpoint = '/api/v1.0/chats'

const resetInitialChats = async () => {
    /*
    await RoomUser.deleteMany()
    for (const initialRoomUser of initialRoomUsers) {
        const newRoomUser = new RoomUser({
            ...initialRoomUser,
        })
        await newRoomUser.save()
    }
    */
}

describe('GET /chats', () => {
    beforeEach(async () => {
        await resetInitialChats()
    }, 100000)

    it('Retrieves a JSON List of Chats', async () => {
        await supertest(app)
            .get(chatsGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
