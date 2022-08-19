/* eslint-disable @typescript-eslint/no-unsafe-call */
import 'dotenv/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { ServerOptions, WebSocket, WebSocketServer } from 'ws'
import cors from 'cors'
import bodyParser from 'body-parser'
import queryString from 'query-string'
import characterRouter from './controllers/characterRouter.js'
import roomRouter from './controllers/roomRouter.js'
import userRouter from './controllers/userRouter.js'
import mapRouter from './controllers/mapRouter.js'
import tokenRouter from './controllers/tokenRouter.js'
import chatRouter from './controllers/chatRouter.js'
import { handleIncomingMessage } from './utils/messageHandler.js'

const app = express()
const privateKeyFilename = 'privkey.pem'
const SslCertificateFilename = 'fullchain.pem'
const serverPort = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('build'))
app.use('/api/characters', characterRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/users', userRouter)
app.use('/api/maps', mapRouter)
app.use('/api/tokens', tokenRouter)
app.use('/api/chats', chatRouter)

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
const wsOptions: ServerOptions = {
    server: server,
    //TODO: Check if neccessary:
    //autoAcceptConnections: true,
}
const wss = new WebSocketServer(wsOptions)

interface IBorealisWebSocket extends WebSocket {
    roomId: string,
    socketGuid: string,
    userGuid: string,
    userType: number,
}

wss.on('connection', (websocketConnection: IBorealisWebSocket, connectionRequest) => {
    const [_path, params] = connectionRequest.url ? connectionRequest.url.split('?') : ['', '']
    const connectionParams = queryString.parse(params, { parseNumbers: true, parseBooleans: true, })

    websocketConnection.roomId = connectionParams.roomId as string
    websocketConnection.socketGuid = connectionParams.socketGuid as string
    websocketConnection.userGuid = connectionParams.userGuid as string
    websocketConnection.userType = connectionParams.userType as number
    websocketConnection.on('message', (message) => {
        handleIncomingMessage(websocketConnection, message.toString())
            .then(({ outgoingMessage, sendBackToSender }) => {
                if (outgoingMessage) {
                    // Forward message to all other clients (for this room)
                    const clients = wss.clients as Set<IBorealisWebSocket>
                    clients.forEach(client => {
                        if (client.readyState === client.OPEN) {
                            if (client.roomId !== websocketConnection.roomId)
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
    console.log(`Server started on following address\n${ server.address()?.toString() }.`)
})
