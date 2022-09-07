import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'
import Room from '../models/room.js'
import RoomUser from '../models/roomUser.js'
import { initialRooms } from './testData/initial.rooms.js'
import { initialRoomUsers } from './testData/initial.roomUsers.js'
import { initialUsersForAuthentication } from './testData/initial.users.js'

const roomsGetEndpoint = '/api/v1.0/rooms'

const resetInitialRooms = async () => {
    await Room.deleteMany()
    for (const initialRoom of initialRooms) {
        const newRoom = new Room({
            ...initialRoom,
        })
        await newRoom.save()
    }
}

const resetInitialRoomUsers = async () => {
    await RoomUser.deleteMany()
    for (const initialRoomUser of initialRoomUsers) {
        const newRoomUser = new RoomUser({
            ...initialRoomUser,
        })
        await newRoomUser.save()
    }
}

describe('GET /rooms', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialRoomUsers()
    }, 100000)

    it('Retrieves a JSON List of Rooms', async () => {
        await supertest(app)
            .get(roomsGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of rooms contains the initial list of Rooms', async () => {
        for (let i = 0; i < initialUsersForAuthentication.length; i++) {
            const response = await supertest(app).get(roomsGetEndpoint).query({
                hostUserGuid: initialUsersForAuthentication[i].guid,
            })
            const userRoomsAsHost = initialRooms.filter((initialRoom) => initialRoom.hostUserGuid === initialUsersForAuthentication[i].guid)
            const userRoomsAsParticipant = initialRoomUsers.filter((initialRoomUser) => (initialRoomUser.guid === initialUsersForAuthentication[i].guid) && (initialRoomUser.type === 1))
            expect(response.body.length).toBe(userRoomsAsHost.length + userRoomsAsParticipant.length)

        }
    })
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
