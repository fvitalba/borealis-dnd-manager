import Room from '../models/room.js'
import { saveUpdateRoomUser } from './userHandler.js'

export const handleIncomingMessage = (websocketConnection, incMessage) => {
    const parsedMessage = JSON.parse(incMessage)
    const _updatedUser = saveUpdateRoomUser(parsedMessage.room, parsedMessage.from, parsedMessage.username)

    return new Promise((resolve, reject) => {
        let outgoingMessage = undefined
        switch (parsedMessage.type) {
            default:
                // Forward message to all other clients (for this room)
                outgoingMessage = parsedMessage
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            }
    })
}
