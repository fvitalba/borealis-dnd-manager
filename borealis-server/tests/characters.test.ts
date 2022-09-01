import supertest from 'supertest'
import app from '../app'
import mongo from '../utils/mongo'

const charactersGetEndpoint = '/api/v1.0/characters'

const resetInitialCharacters = async () => {
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

describe('GET /characters', () => {
    beforeEach(async () => {
        await resetInitialCharacters()
    }, 100000)

    it('Retrieves a JSON List of Characters', async () => {
        await supertest(app)
            .get(charactersGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
