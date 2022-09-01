import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'

const tokensGetEndpoint = '/api/v1.0/tokens'

const resetInitialTokens = async () => {
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

describe('GET /tokens', () => {
    beforeEach(async () => {
        await resetInitialTokens()
    }, 100000)

    it('Retrieves a JSON List of Tokens', async () => {
        await supertest(app)
            .get(tokensGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
