import { assignCharacter } from './userHandler.js'

export const handleIncomingMessage = (websocketConnection, incMessage) => {
    const parsedMessage = JSON.parse(incMessage)

    return new Promise((resolve, reject) => {
        let outgoingMessage = undefined
        switch (parsedMessage.type) {
            case 'pushAssignCharacter':
                assignCharacter(websocketConnection.room, parsedMessage.username, parsedMessage.characterGuid)
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            case 'ping':
                resolve({ outgoingMessage: undefined, sendBackToSender: false, })
                break
            default:
                // Forward message to all other clients (for this room)
                outgoingMessage = parsedMessage
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            }
    })
}
