import Chat from '../models/chat.js'

export const saveUpdateRoomChat = async (roomId, newMessages) => {
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
