import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import queryString from 'query-string'


const app = express()

const serverPort = process.env.PORT || 8000

app.use(express.static('build'))

const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(websocketConnection, connectionRequest) {
    const [_path, params] = connectionRequest?.url?.split('?')
    const connectionParams = queryString.parse(params)
    
    websocketConnection.room = connectionParams.room
    websocketConnection.guid = connectionParams.guid

    websocketConnection.on('message', (message) => {
        const parsedMessage = JSON.parse(message)
        /* Forward message to all other clients (for this room) */
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                if (client.room !== this.room)
                    return /* Don't send to other rooms */
                if (client === this)
                    return /* Don't send back to sender */
                    client.send(JSON.stringify(parsedMessage))
            }
        })
    })
})

//start our server
server.listen(serverPort, () => {
    console.log(`Server started on port ${server.address().port}.`)
})
