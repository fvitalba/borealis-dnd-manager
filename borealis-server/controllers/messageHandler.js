import { assignCharacter } from './userHandler.js'

export const handleIncomingMessage = (websocketConnection, incMessage) => {
    const parsedMessage = JSON.parse(incMessage)

    return new Promise((resolve, reject) => {
        let outgoingMessage = undefined
        switch (parsedMessage.type) {
            case 'assignCharacter':
                assignCharacter(websocketConnection.room, websocketConnection.guid, websocketConnection.username, parsedMessage.characterGuid)
                resolve({ outgoingMessage: undefined, sendBackToSender: false })
                break
            default:
                // Forward message to all other clients (for this room)
                outgoingMessage = parsedMessage
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            }
    })
}
