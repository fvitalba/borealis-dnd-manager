import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import WebSocket from 'ws'
import cors from 'cors'
import queryString from 'query-string'
import Room from './models/room.js'
import User from './models/user.js'
import Message from './models/chatMessage.js'
import { handleIncomingMessage } from './controllers/messageHandler.js'
import { deleteOfflineUsers } from './middleware/userMiddleware.js'

const app = express()
const privateKeyFilename = 'privkey.pem'
const SslCertificateFilename = 'fullchain.pem'
const serverPort = process.env.PORT || 8000

app.use(cors())
app.use(deleteOfflineUsers)
app.use(express.static('build'))

app.route('/room-file/:roomName?').get((req, res) => {
    const room = req.params.roomName
    if (room) {
        const savedGame = JSON.parse(fs.readFileSync(`${room}.room`,'utf8'))
        res.json(savedGame)
    } else {
        res.json({ })
    }
})

app.route('/room-db/:roomName?').get((req, res) => {
    const roomName = req.params.roomName
    let currentRoom = undefined
    if (roomName) {
        Room.find({ 'metadata.room': roomName }).then((result) => {
            result.forEach((room) => {
                if ((!currentRoom) || (currentRoom.game.gen < room.game.gen)) {
                    currentRoom = room
                }
            })
            res.json(currentRoom)
        })
    } else {
        res.json([])
    }
})

app.route('/room-users-db/:roomName?').get((req, res) => {
    const roomName = req.params.roomName
    if (roomName) {
        User.find({ 'roomName': roomName }).then((result) => {
            res.json(result)
        })
    } else {
        res.json([])
    }
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
const wss = new WebSocket.Server({ server: server, autoAcceptConnections: true, })

wss.on('connection', (websocketConnection, connectionRequest) => {
    const [path, params] = connectionRequest?.url?.split('?')
    const connectionParams = queryString.parse(params)
    
    websocketConnection.room = path.substring(1)
    websocketConnection.guid = connectionParams.guid
    websocketConnection.on('message', (message) => {
        const outgoingMessage = handleIncomingMessage(message)
        if (outgoingMessage) {
            // Forward message to all other clients (for this room)
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    if (client.room !== websocketConnection.room)
                        return // Don't send to other rooms
                    if (client === websocketConnection)
                        return // Don't send back to sender
                    client.send(JSON.stringify(outgoingMessage))
                }
            })
        }
    })
})

// Start server
server.listen(serverPort, () => {
    console.log(`Server started on port ${server.address().port}.`)
})
