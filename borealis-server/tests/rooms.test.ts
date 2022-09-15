import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'
import Room, { IGameSchema } from '../models/room.js'
import RoomUser from '../models/roomUser.js'
import { initialRooms, newRoomId, newRoomName, newRoomHostUserGuid, newRoom } from './testData/initial.rooms.js'
import { initialRoomUsers } from './testData/initial.roomUsers.js'
import { initialUsersForAuthentication } from './testData/initial.users.js'

const roomsGetEndpoint = '/api/v1.0/rooms'
const roomsPostEndpoint = '/api/v1.0/rooms'

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

    it('The List of Rooms contains the initial list of Rooms', async () => {
        for (const initialUser of initialUsersForAuthentication) {
            const response = await supertest(app).get(roomsGetEndpoint).query({
                hostUserGuid: initialUser.guid,
            })
            const userRoomsAsHost = initialRooms.filter((initialRoom) => initialRoom.hostUserGuid === initialUser.guid)
            const userRoomsAsParticipant = initialRoomUsers.filter((initialRoomUser) => (initialRoomUser.guid === initialUser.guid) && (initialRoomUser.type === 1))
            expect(response.body.length).toBe(userRoomsAsHost.length + userRoomsAsParticipant.length)
        }
    })

    it('A Room can be retrieved by only providing its RoomId', async () => {
        for (const initialRoom of initialRooms) {
            const response = await supertest(app).get(roomsGetEndpoint).query({
                hostUserGuid: '',
                roomId: initialRoom.roomId,
            })
            expect(response.body.length).toBe(1)
            expect(response.body[0].roomId).toBe(initialRoom.roomId)
        }
    })
})

describe('POST /room', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialRoomUsers()
    }, 100000)

    it('Add new Room', async () => {
        const params = {
            payload: JSON.stringify(newRoom),
            roomId: newRoomId,
            roomName: newRoomName,
            hostUserGuid: newRoomHostUserGuid,
        }
        const response = await supertest(app)
            .post(roomsPostEndpoint)
            .send(params)
        expect(response.body).not.toBeUndefined()
        expect(response.body.error).toBeUndefined()

        const response2 = await supertest(app).get(roomsGetEndpoint).query({
            hostUserGuid: newRoomHostUserGuid,
        })
        const responseRooms = response2.body as Array<IGameSchema>
        const userRoomsAsHost = initialRooms.filter((initialRoom) => initialRoom.hostUserGuid === newRoomHostUserGuid)
        const userRoomsAsParticipant = initialRoomUsers.filter((initialRoomUser) => (initialRoomUser.guid === newRoomHostUserGuid) && (initialRoomUser.type === 1))
        expect(responseRooms.length).toBe(userRoomsAsHost.length + userRoomsAsParticipant.length + 1)
        const newRoomInDb = responseRooms.filter((responseRoom) => responseRoom.roomId === newRoomId)
        expect(newRoomInDb.length).toBe(1)
        expect(newRoomInDb[0].roomName).toBe(newRoomName)
        expect(newRoomInDb[0].version).toBe(newRoom.version)
        expect(newRoomInDb[0].currentMapId).toBe(newRoom.currentMapId)
    }, 10000)
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
