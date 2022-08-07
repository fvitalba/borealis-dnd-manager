import Chat, { IChatMessage, IChatSchema } from '../models/chat.js'

export const overwriteRoomChat = async (roomId : string, newMessages: Array<IChatMessage>) : Promise<IChatSchema | undefined> => {
    if (!roomId || !newMessages)
        return undefined

    return Chat.findOneAndUpdate(
        { roomId: roomId },
        { roomId: roomId, messages: newMessages, timestamp: new Date(), },
        { new: true, upsert: true, }
    ).then((updatedChat) => {
        return updatedChat
    })
}
