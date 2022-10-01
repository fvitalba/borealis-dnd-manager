import supertest from 'supertest'
import app from '../app.js'
import mongo from '../src/utils/mongo.js'
import Room from '../src/models/room.js'
import Character from '../src/models/character.js'
import { initialRooms } from './testData/initial.rooms.js'
import { initialCharacters, newCharacter } from './testData/initial.characters.js'

const charactersGetEndpoint = '/api/v1.0/characters'
const charactersPostEndpoint = '/api/v1.0/characters'

const resetInitialCharacters = async () => {
    await Character.deleteMany()
    for (const initialCharacter of initialCharacters) {
        const newCharacter = new Character({
            ...initialCharacter,
        })
        await newCharacter.save()
    }
}

const resetInitialRooms = async () => {
    await Room.deleteMany()
    for (const initialRoom of initialRooms) {
        const newRoom = new Room({
            ...initialRoom,
        })
        await newRoom.save()
    }
}

describe('GET /characters', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialCharacters()
    }, 100000)

    it('Retrieves a JSON List of Characters', async () => {
        await supertest(app)
            .get(charactersGetEndpoint)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    it('The List of Characters contains the initial list of Characters', async () => {
        for (const initialCharacter of initialCharacters) {
            const response = await supertest(app).get(charactersGetEndpoint).query({
                roomId: initialCharacter.roomId,
                characterGuid: initialCharacter.guid,
            })
            expect(response.body).not.toBeUndefined()
            expect(response.body.error).toBeUndefined()
            expect(response.body.length).toBe(1)
            expect(response.body[0].roomId).toBe(initialCharacter.roomId)
            expect(response.body[0].guid).toBe(initialCharacter.guid)
            expect(response.body[0].name).toBe(initialCharacter.name)
            expect(response.body[0].username).toBe(initialCharacter.username)
            expect(response.body[0].class.length).toBe(initialCharacter.class.length)
            expect(response.body[0].hitDice.length).toBe(initialCharacter.hitDice.length)
        }
    })
})

describe('POST /characters', () => {
    beforeEach(async () => {
        await resetInitialRooms()
        await resetInitialCharacters()
    }, 100000)

    it('Overwrite Characters', async () => {
        const params = {
            payload: JSON.stringify([newCharacter]),
            roomId: initialCharacters[2].roomId,
        }
        const response = await supertest(app)
            .post(charactersPostEndpoint)
            .send(params)
        expect(response.body).not.toBeUndefined()
        expect(response.body.error).toBeUndefined()

        const response2 = await supertest(app).get(charactersGetEndpoint).query({
            roomId: initialCharacters[2].roomId,
        })
        expect(response2.body).not.toBeUndefined()
        expect(response2.body.error).toBeUndefined()
        expect(response2.body.length).toBe(1)
        expect(response2.body[0].roomId).toBe(initialCharacters[2].roomId)
        expect(response2.body[0].guid).toBe(newCharacter.guid)
        expect(response2.body[0].name).toBe(newCharacter.name)
        expect(response2.body[0].username).toBe(newCharacter.username)
        expect(response2.body[0].class.length).toBe(newCharacter.class.length)
        expect(response2.body[0].hitDice.length).toBe(newCharacter.hitDice.length)
    })
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
