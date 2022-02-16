import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
import WebSocket from 'ws'
import queryString from 'query-string'

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
    console.log(`Client connecting --- Room: ${websocketConnection.room}, guid: ${websocketConnection.guid}`)

    websocketConnection.on('message', (message) => {
        const parsedMessage = JSON.parse(message)
        console.log(`Received message  --- (Room: ${websocketConnection.room}) From: ${parsedMessage.username}, Message Type: ${parsedMessage.type}`)
        // Forward message to all other clients (for this room)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                if (client.room !== websocketConnection.room)
                    return // Don't send to other rooms
                if (client === websocketConnection)
                    return // Don't send back to sender
                console.log(`Sending message   --- Sending to guid: ${client.guid} in Room: ${client.room}`)
                client.send(JSON.stringify(parsedMessage))
            }
        })
    })
})

// Start server
server.listen(serverPort, () => {
    console.log(`Server started on port ${server.address().port}.`)
})
