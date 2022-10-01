import supertest from 'supertest'
import app from '../app.js'
import mongo from '../src/utils/mongo.js'
import Chat from '../src/models/chat.js'
import { initialChats, newChat } from './testData/initial.chats.js'
import { initialRooms } from './testData/initial.rooms.js'

//TODO: Refactor last Tests and extend testing
//TODO: Fix Mongoose open/dangling connections
const chatsGetEndpoint = '/api/v1.0/chats'
const chatsPostEndpoint = '/api/v1.0/chats'

const resetInitialChats = async () => {
    await Chat.deleteMany()
    for (const initialChat of initialChats) {
        const newChat = new Chat({
            ...initialChat,
        })
        await newChat.save()
    }
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

    it('The List of Chats contains the initial list of Chats', async () => {
        for (const initialChat of initialChats) {
            const response = await supertest(app).get(chatsGetEndpoint).query({
                roomId: initialChat.roomId,
            })
            expect(response.body).not.toBeUndefined()
            expect(response.body.error).toBeUndefined()
            expect(response.body.length).toBe(1)
            expect(response.body[0].roomId).toBe(initialChat.roomId)
            expect(response.body[0].messages.length).toBe(initialChat.messages.length)
            if (initialChat.messages.length > 0) {
                expect(response.body[0].messages[0].type).toBe(initialChat.messages[0].type)
                expect(response.body[0].messages[0].publicMessage).toBe(initialChat.messages[0].publicMessage)
                expect(response.body[0].messages[0].privateMessage).toBe(initialChat.messages[0].privateMessage)
                expect(response.body[0].messages[0].timestamp).toBe(initialChat.messages[0].timestamp)
            }
        }
    })
})

describe('POST /chats', () => {
    beforeEach(async () => {
        await resetInitialChats()
    }, 100000)

    it('Overwrite Chat', async () => {
        const params = {
            payload: JSON.stringify(newChat),
            roomId: initialRooms[1].roomId,
        }
        const response = await supertest(app)
            .post(chatsPostEndpoint)
            .send(params)
        expect(response.body).not.toBeUndefined()
        expect(response.body.error).toBeUndefined()

        const response2 = await supertest(app).get(chatsGetEndpoint).query({
            roomId: initialRooms[1].roomId,
        })
        expect(response2.body).not.toBeUndefined()
        expect(response2.body.error).toBeUndefined()
        expect(response2.body.length).toBe(1)
        expect(response2.body[0].roomId).toBe(initialRooms[1].roomId)
        expect(response2.body[0].messages.length).toBe(newChat.length)
        if (newChat.length > 0) {
            expect(response2.body[0].messages[0].type).toBe(newChat[0].type)
            expect(response2.body[0].messages[0].publicMessage).toBe(newChat[0].publicMessage)
            expect(response2.body[0].messages[0].privateMessage).toBe(newChat[0].privateMessage)
            expect(response2.body[0].messages[0].timestamp).toBe(newChat[0].timestamp)
        }
    })
})

afterAll(async () => {
    if (mongo.connection.readyState in [1, 2])
        await mongo.connection.close()
}, 10000)
