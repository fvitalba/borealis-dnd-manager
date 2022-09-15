import { WebSocket } from 'ws'

export interface IOutgoingMessage {
    outgoingMessage: string,
    sendBackToSender: boolean,
}

interface IIncomingMessage {
    type: string,
}

export const handleIncomingMessage = (_websocketConnection: WebSocket, incMessage: string): Promise<IOutgoingMessage> => {
    const parsedMessage = JSON.parse(incMessage) as IIncomingMessage

    return new Promise((resolve, _reject) => {
        let outgoingMessage = ''
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
            //TODO: Check if this is still OK, we changed from = parsedMessage to = incMessage
            outgoingMessage = incMessage
            resolve({
                outgoingMessage,
                sendBackToSender: false
            })
            break
        }
    })
}
