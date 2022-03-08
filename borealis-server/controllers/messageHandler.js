import Room from '../models/room.js'
import { saveUpdateRoomUser } from './userHandler.js'

export const handleIncomingMessage = (websocketConnection, incMessage) => {
    const parsedMessage = JSON.parse(incMessage)
    const _updatedUser = saveUpdateRoomUser(parsedMessage.room, parsedMessage.from, parsedMessage.username)

    return new Promise((resolve, reject) => {
        let outgoingMessage = undefined
        switch (parsedMessage.type) {
            case 'saveGame':
                // Save game locally
                fs.writeFile(`${websocketConnection.room}.room`, parsedMessage.payload, (err) => {
                    console.error(err)
                })
                resolve({ outgoingMessage, sendBackToSender: false })
            case 'requestLoadGame':
                // Load game from storage
                const savedGame = fs.readFileSync(`${websocketConnection.room}.room`,'utf8')
                outgoingMessage = {
                    type: 'loadGame',
                    from: undefined,
                    to: undefined,
                    room: websocketConnection.room,
                    payload: JSON.parse(savedGame), //this is the saved game
                }
                resolve(outgoingMessage)
            case 'saveGameToDatabase':
                const room = new Room(JSON.parse(parsedMessage.payload))
                room.save().then(() => {
                    resolve({ outgoingMessage, sendBackToSender: false })
                })
            case 'requestLoadGameFromDatabase':
                const roomName = websocketConnection.room
                let currentRoom = undefined
                if (roomName) {
                    Room.find({ 'metadata.room': roomName })
                    .then((result) => {
                        result.forEach((room) => {
                            if ((!currentRoom) || (currentRoom.game.gen < room.game.gen)) {
                                currentRoom = room
                            }
                        })
                        if (currentRoom) {
                            outgoingMessage = {
                                type: 'loadGame',
                                from: undefined,
                                to: undefined,
                                room: websocketConnection.room,
                                payload: currentRoom, //this is the saved game
                            }
                            resolve({ outgoingMessage, sendBackToSender: true })
                        }
                    })
                }
                break
            default:
                // Forward message to all other clients (for this room)
                outgoingMessage = parsedMessage
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            }
    })
}
