import supertest from 'supertest'
import app from '../app'
import mongo from '../utils/mongo'

const roomsGetEndpoint = '/api/v1.0/rooms'

const resetInitialRooms = async () => {
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

describe('GET /rooms', () => {
    beforeEach(async () => {
        await resetInitialRooms()
    }, 100000)

    it('Retrieves a JSON List of Rooms', async () => {
        await supertest(app)
            .get(roomsGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
