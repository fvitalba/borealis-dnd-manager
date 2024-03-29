import 'dotenv/config'
import fs from 'fs'
import http from 'http'
import https from 'https'
import { AddressInfo, ServerOptions, WebSocket, WebSocketServer } from 'ws'
import queryString from 'query-string'
import app from './app.js'
import { handleIncomingMessage } from './src/utils/messageHandler.js'

const privateKeyFilename = 'privkey.pem'
const SslCertificateFilename = 'fullchain.pem'
const serverPort = process.env.PORT || 8000

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
    /* eslint-disable @typescript-eslint/no-unused-vars */
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
                            client.send(outgoingMessage)
                        }
                    })
                }
            })
            .catch(() => undefined)
    })
})

// Start server
server.listen(serverPort, () => {
    const serverAddress = server.address() as AddressInfo
    console.log(`Server started on following port: ${ serverAddress.port }.`)
})
