// most parts copied from an example "https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express#getting-started"
import WebSocket from 'ws'
import queryString from 'query-string'

export default async (expressServer) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: '/websockets',
    })

    expressServer.on('upgrade', (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit('connection', websocket, request)
        })
    })

    websocketServer.on('connection',
        function connection(websocketConnection, connectionRequest) {
            const [_path, params] = connectionRequest?.url?.split('?')
            const connectionParams = queryString.parse(params)
            
            websocketConnection.room = connectionParams.room
            websocketConnection.guid = connectionParams.guid

            console.log('Connection Parameters: ',connectionParams)

            websocketConnection.on('message', (message) => {
                const parsedMessage = JSON.parse(message)
                /* Forward message to all other clients (for this room) */
                ws.clients.forEach(connection => {
                    if (connection.readyState === WebSocket.OPEN) {
                        if (connection.room !== this.room)
                            return /* Don't send to other rooms */
                        if (connection === this)
                            return /* Don't send back to sender */
                            connection.send(JSON.stringify(data))
                    }
                })
            })
        }
    )

    return websocketServer
}
