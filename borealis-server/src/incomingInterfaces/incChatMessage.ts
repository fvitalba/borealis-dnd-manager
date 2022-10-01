interface IIncChatMessage {
    guid: string,
    type: number,
    username: string,
    targetUsername: string,
    playerInfo: string,
    publicMessage: string,
    privateMessage: string,
    timestamp: number,
    read: boolean
}

export default IIncChatMessage
