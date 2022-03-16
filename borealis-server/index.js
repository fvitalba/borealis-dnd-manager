import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ws from 'ws'
import cors from 'cors'
import bodyParser from 'body-parser'
import queryString from 'query-string'
import Room from './models/room.js'
import User from './models/user.js'
import Message from './models/chatMessage.js'
import { handleIncomingMessage } from './controllers/messageHandler.js'
import { saveUpdateRoomUser } from './controllers/userHandler.js'
import { deleteOfflineUsers } from './middleware/userMiddleware.js'

const app = express()
const privateKeyFilename = 'privkey.pem'
const SslCertificateFilename = 'fullchain.pem'
const serverPort = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(deleteOfflineUsers)
app.use(express.static('build'))

app.get('/api/rooms/:roomName?', (request, result) => {
    const roomName = request.params.roomName
    let currentRoom = undefined
    if (roomName) {
        Room.find({ 'metadata.room': roomName })
            .then((rooms) => {
                rooms.forEach((room) => {
                    if ((!currentRoom) || (currentRoom.game.gen < room.game.gen)) {
                        currentRoom = room
                    }
                })
                result.json(currentRoom)
            })
    } else {
        result.json([])
    }
})

app.get('/api/room-users/:roomName?', (request, result) => {
    const roomName = request.params.roomName
    if (roomName) {
        User.find({ 'roomName': roomName, 'active': true, })
            .then((users) => {
                result.json(users)
            })
    } else {
        result.json([])
    }
})

app.get('/api/room-chat/:roomName?', (request, result) => {
    /*
    const roomName = request.params.roomName
    if (roomName) {
        User.find({ 'roomName': roomName }).then((users) => {
            result.json(users)
        })
    } else {
        result.json([])
    }
    */
})

app.post('/api/rooms', (request, response) => {
    const body = request.body
    if (body.payload === undefined)
        return response.status(400).json({ error: 'content missing' })

    const room = new Room({
        ...body.payload,
        timestamp: new Date(),
    })
    room.save()
        .then((result) => {
            response.json(result)
        })
})

app.delete('api/rooms/:roomName?', (request, result) => {
    /*
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
    */
})

const createServer = () => {
    // Check SSL files & create HTTPS server
    if (fs.existsSync(privateKeyFilename) && fs.existsSync(SslCertificateFilename)) {
        const privateKey = fs.readFileSync(privateKeyFilename, 'utf-8')
        const certificate = fs.readFileSync(SslCertificateFilename, 'utf-8')
        return https.createServer({ key: privateKey, cert: certificate }, app)
    }
    // Create HTTP server
    else {
        return http.createServer(app)
    }
}
const server = createServer()

// Initialize the WebSocket server instance
const wss = new ws.Server({ server: server, autoAcceptConnections: true, })

wss.on('connection', (websocketConnection, connectionRequest) => {
    const [path, params] = connectionRequest?.url?.split('?')
    const connectionParams = queryString.parse(params)
    
    websocketConnection.room = path.substring(1)
    websocketConnection.guid = connectionParams.guid
    websocketConnection.username = connectionParams.username
    websocketConnection.isHost = connectionParams.isHost
    saveUpdateRoomUser(websocketConnection.room, websocketConnection.guid, websocketConnection.username, websocketConnection.isHost)
    websocketConnection.on('message', (message) => {
        saveUpdateRoomUser(websocketConnection.room, websocketConnection.guid, websocketConnection.username, websocketConnection.isHost)
        handleIncomingMessage(websocketConnection, message)
            .then(({ outgoingMessage, sendBackToSender }) => {
                if (outgoingMessage) {
                    // Forward message to all other clients (for this room)
                    wss.clients.forEach(client => {
                        if (client.readyState === ws.OPEN) {
                            if (client.room !== websocketConnection.room)
                                return // Don't send to other rooms
                            if ((client === websocketConnection) && !sendBackToSender)
                                return // Don't send back to sender
                            client.send(JSON.stringify(outgoingMessage))
                        }
                    })
                }
            })
    })
})

// Start server
server.listen(serverPort, () => {
    console.log(`Server started on port ${server.address().port}.`)
})
