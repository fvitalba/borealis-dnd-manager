import { WebSocket } from 'ws'

export interface IOutgoingMessage {
    outgoingMessage: string,
    sendBackToSender: boolean,
}

export const handleIncomingMessage = async (websocketConnection: WebSocket, incMessage: string): Promise<IOutgoingMessage> => {
    const parsedMessage = JSON.parse(incMessage)

    return await new Promise((resolve, _reject) => {
        let outgoingMessage = undefined
        switch (parsedMessage.type) {
        /*
            case 'pushAssignCharacter':
                assignCharacter(websocketConnection.roomId, parsedMessage.userGuid, parsedMessage.characterGuid)
                resolve({ outgoingMessage, sendBackToSender: false })
                break
            case 'ping':
                resolve({ outgoingMessage: undefined, sendBackToSender: false, })
                break
*/
        default:
            // Forward message to all other clients (for this room)
            outgoingMessage = parsedMessage
            resolve({
                outgoingMessage,
                sendBackToSender: false
            })
            break
        }
    })
}
