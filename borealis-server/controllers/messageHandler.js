export const handleIncomingMessage = (websocketConnection, incMessage) => {
    const parsedMessage = JSON.parse(incMessage)

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
