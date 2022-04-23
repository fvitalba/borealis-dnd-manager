import Chat from '../models/chat.js'

export const saveUpdateRoomChat = async (roomId, newChat) => {
    if (!roomId || !newChat)
        return undefined

    return Chat.findOneAndUpdate(
        { roomId: roomId }, 
        { ...newChat, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedChat) => {
        return updatedChat
    })
}
