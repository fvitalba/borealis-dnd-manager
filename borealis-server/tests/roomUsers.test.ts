import supertest from 'supertest'
import app from '../app'
import mongo from '../utils/mongo'
import RoomUser from '../models/roomUser'
import { initialRooms } from './testData/initial.rooms'
import { initialRoomUsers } from './testData/initial.roomUsers'

const roomUsersGetEndpoint = '/api/v1.0/roomUsers'

const resetInitialRoomUsers = async () => {
    await RoomUser.deleteMany()
    initialRoomUsers.map(async (initialRoomUser) => {
        const newRoomUser = new RoomUser({
            ...initialRoomUser,
        })
        await newRoomUser.save()
    })
}

describe('GET /roomUsers', () => {
    beforeEach(async () => {
        await resetInitialRoomUsers()
    }, 100000)

    it('Retrieves a JSON List of Users', async () => {
        await supertest(app)
            .get(roomUsersGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Users contains the list of initial Users per room', async () => {
        const userPerRoomCount = initialRooms.map((initialRoom) => {
            const activeInitialRoomUsers = initialRoomUsers.filter((initialRoomUser) => initialRoomUser.active && (initialRoom.roomId === initialRoomUser.roomId))
            return {
                roomId: initialRoom.roomId,
                activeUserCount: activeInitialRoomUsers.length,
            }
        })
        for (let i = 0; i < userPerRoomCount.length; i++) {
            const response = await supertest(app).get(roomUsersGetEndpoint).query({
                roomId: userPerRoomCount[i].roomId,
            })
            expect(response.body).toHaveLength(userPerRoomCount[i].activeUserCount)
        }
    }, 100000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
