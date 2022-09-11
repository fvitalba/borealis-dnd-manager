import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'
import Map from '../models/map.js'
import Room from '../models/room.js'
import { initialRooms } from './testData/initial.rooms.js'
import { initialMaps, newMap } from './testData/initial.maps.js'

const mapsGetEndpoint = '/api/v1.0/maps'
const mapsPostEndpoint = '/api/v1.0/maps'

const resetInitialRooms = async () => {
    await Room.deleteMany()
    for (const initialRoom of initialRooms) {
        const newRoom = new Room({
            ...initialRoom,
        })
        await newRoom.save()
    }
}

const resetInitialMaps = async () => {
    await Map.deleteMany()
    for (const initialMap of initialMaps) {
        const newMap = new Map({
            ...initialMap,
        })
        await newMap.save()
    }
}

describe('GET /maps', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialMaps()
    }, 100000)

    it('Retrieves a JSON List of Maps', async () => {
        await supertest(app)
            .get(mapsGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Maps contains the initial list of Maps', async () => {
        for (const initialMap of initialMaps) {
            const response = await supertest(app).get(mapsGetEndpoint).query({
                roomId: initialMap.roomId,
                mapId: initialMap.id,
            })
            expect(response.body).not.toBeUndefined()
            expect(response.body.error).toBeUndefined()
            expect(response.body.length).toBe(1)
            expect(response.body[0].roomId).toBe(initialMap.roomId)
            expect(response.body[0].id).toBe(initialMap.id)
            expect(response.body[0].name).toBe(initialMap.name)
            expect(response.body[0].fogPaths.length).toBe(initialMap.fogPaths.length)
            expect(response.body[0].drawPaths.length).toBe(initialMap.drawPaths.length)
            expect(response.body[0].backgroundUrl).toBe(initialMap.backgroundUrl)
        }
    })
})

describe('POST /maps', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialMaps()
    }, 100000)

    it('Overwrite Maps', async () => {
        const params = {
            payload: JSON.stringify([newMap]),
            roomId: initialRooms[2].roomId,
        }
        const response = await supertest(app)
            .post(mapsPostEndpoint)
            .send(params)
        expect(response.body).not.toBeUndefined()
        expect(response.body.error).toBeUndefined()

        const response2 = await supertest(app).get(mapsGetEndpoint).query({
            roomId: initialRooms[2].roomId,
        })
        expect(response2.body).not.toBeUndefined()
        expect(response2.body.error).toBeUndefined()
        expect(response2.body.length).toBe(1)
        expect(response2.body[0].roomId).toBe(initialRooms[2].roomId)
        expect(response2.body[0].id).toBe(newMap.id)
        expect(response2.body[0].name).toBe(newMap.name)
        expect(response2.body[0].fogPaths.length).toBe(newMap.fogPaths.length)
        expect(response2.body[0].drawPaths.length).toBe(newMap.drawPaths.length)
        expect(response2.body[0].backgroundUrl).toBe(newMap.backgroundUrl)
    })
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
