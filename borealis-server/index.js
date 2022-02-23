import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import WebSocket from 'ws'
import queryString from 'query-string'
import Room from './models/room.js'
import mongoose from 'mongoose'

const app = express()
const privateKeyFilename = 'privkey.pem'
const SslCertificateFilename = 'fullchain.pem'
const serverPort = process.env.PORT || 8000

fs.writeFile('pid.tmp', process.pid.toString(), err => {
    if (err)
        return console.log(err)
    console.log(`process id ${process.pid}`)
})

app.use(express.static('build'))

app.route('/room-json/:roomName').get((req, res) => {
    const room = req.params.roomName
    const savedGame = JSON.parse(fs.readFileSync(`${room}.room`,'utf8'))
    res.json(savedGame)
})

app.route('/room-mongoDB-json/:roomName').get((req, res) => {
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
    
    websocketConnection.room = path
    websocketConnection.guid = connectionParams.guid
    websocketConnection.on('message', (message) => {
        const parsedMessage = JSON.parse(message)
        switch (parsedMessage.type) {
        case 'saveGame':
            // Save game locally
            fs.writeFile(`${websocketConnection.room}.room`.substring(1), parsedMessage.payload, (err) => {
                console.error(err)
            })
            break
        case 'requestLoadGame':
            // Load game from storage
            const savedGame = fs.readFileSync(`${websocketConnection.room}.room`.substring(1),'utf8')
            const savedGameMessage = {
                type: 'loadGame',
                from: undefined,
                to: undefined,
                room: websocketConnection.room,
                payload: JSON.parse(savedGame), //this is the saved game
            }
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    if (client.room !== websocketConnection.room)
                        return // Don't send to other rooms
                    client.send(JSON.stringify(savedGameMessage))
                }
            })
        case 'saveGameToDatabase':
            const room = new Room(JSON.parse(parsedMessage.payload))
            room.save().then()
            break
        case 'requestLoadGameFromDatabase':
            const roomName = req.params.roomName
            let currentRoom = undefined
            if (roomName) {
                Room.find({ 'metadata.room': roomName }).then((result) => {
                    result.forEach((room) => {
                        if ((!currentRoom) || (currentRoom.game.gen < room.game.gen)) {
                            currentRoom = room
                        }
                    })
                    if (currentRoom) {
                        const savedGameMessage = {
                            type: 'loadGame',
                            from: undefined,
                            to: undefined,
                            room: websocketConnection.room,
                            payload: currentRoom, //this is the saved game
                        }
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                if (client.room !== websocketConnection.room)
                                    return // Don't send to other rooms
                                client.send(JSON.stringify(savedGameMessage))
                            }
                        })
                    }
                })
            }
            break
        default:
            // Forward message to all other clients (for this room)
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    if (client.room !== websocketConnection.room)
                        return // Don't send to other rooms
                    if (client === websocketConnection)
                        return // Don't send back to sender
                    client.send(JSON.stringify(parsedMessage))
                }
            })
            break
        }
    })
})

// Start server
server.listen(serverPort, () => {
    console.log(`Server started on port ${server.address().port}.`)
})
