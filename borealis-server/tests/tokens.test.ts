import supertest from 'supertest'
import app from '../app.js'
import mongo from '../utils/mongo.js'
import Map from '../models/map.js'
import Room from '../models/room.js'
import Token from '../models/token.js'
import { initialRooms } from './testData/initial.rooms.js'
import { initialMaps } from './testData/initial.maps.js'
import { initialTokens, newToken } from './testData/initial.tokens.js'

const tokensGetEndpoint = '/api/v1.0/tokens'
const tokensPostEndpoint = '/api/v1.0/tokens'

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

const resetInitialTokens = async () => {
    await Token.deleteMany()
    for (const initialToken of initialTokens) {
        const newToken = new Token({
            ...initialToken,
        })
        await newToken.save()
    }
}

describe('GET /tokens', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialMaps()
        await resetInitialTokens()
    }, 100000)

    it('Retrieves a JSON List of Tokens', async () => {
        await supertest(app)
            .get(tokensGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Tokens contains the initial list of Tokens', async () => {
        for (const initialToken of initialTokens) {
            const response = await supertest(app).get(tokensGetEndpoint).query({
                roomId: initialToken.roomId,
                tokenGuid: initialToken.guid,
            })
            expect(response.body).not.toBeUndefined()
            expect(response.body.error).toBeUndefined()
            expect(response.body.length).toBe(1)
            expect(response.body[0].roomId).toBe(initialToken.roomId)
            expect(response.body[0].guid).toBe(initialToken.guid)
            expect(response.body[0].name).toBe(initialToken.name)
            expect(response.body[0].imageUrl).toBe(initialToken.imageUrl)
        }
    })
})

describe('POST /tokens', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialMaps()
        await resetInitialTokens()
    }, 100000)

    it('Overwrite Tokens', async () => {
        const params = {
            payload: JSON.stringify([newToken]),
            roomId: initialTokens[2].roomId,
        }
        const response = await supertest(app)
            .post(tokensPostEndpoint)
            .send(params)
        expect(response.body).not.toBeUndefined()
        expect(response.body.error).toBeUndefined()

        const response2 = await supertest(app).get(tokensGetEndpoint).query({
            roomId: initialTokens[2].roomId,
        })
        expect(response2.body).not.toBeUndefined()
        expect(response2.body.error).toBeUndefined()
        expect(response2.body.length).toBe(1)
        expect(response2.body[0].roomId).toBe(initialTokens[2].roomId)
        expect(response2.body[0].guid).toBe(newToken.guid)
        expect(response2.body[0].name).toBe(newToken.name)
        expect(response2.body[0].imageUrl).toBe(newToken.imageUrl)
    })
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
