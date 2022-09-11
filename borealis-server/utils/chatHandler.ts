import IIncChatMessage from '../incomingInterfaces/incChatMessage.js'
import Chat, { IChatMessage, IChatSchema } from '../models/chat.js'

export const parseIncChatToChatSchema = (incChatMessages: Array<IIncChatMessage>, roomId: string, timestamp: Date): IChatSchema => {
    const parsedChatMessages = incChatMessages.map((incChatMessage): IChatMessage => {
        return {
            guid: incChatMessage.guid,
            playerInfo: incChatMessage.playerInfo,
            privateMessage: incChatMessage.privateMessage,
            publicMessage: incChatMessage.publicMessage,
            read: incChatMessage.read,
            targetUsername: incChatMessage.targetUsername,
            timestamp: incChatMessage.timestamp,
            type: incChatMessage.type,
            username: incChatMessage.username,
        }
    })
    return {
        messages: parsedChatMessages,
        roomId: roomId,
        timestamp: timestamp.getMilliseconds(),
    }
}

export const overwriteRoomChat = async (roomId : string, newMessages: Array<IChatMessage>) : Promise<IChatSchema | undefined> => {
    if (!roomId || !newMessages)
        return undefined

    return await Chat.findOneAndUpdate(
        { roomId: roomId },
        { roomId: roomId, messages: newMessages, timestamp: new Date(), },
        { new: true, upsert: true, }
    )
}

export const getRoomChat = async (roomId: string): Promise<Array<IChatSchema>> => {
    return await Chat.find({ 'roomId': roomId, })
        .then((chat) => chat)
        .catch(() => [])
}
