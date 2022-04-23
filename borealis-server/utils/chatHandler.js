import Chat from '../models/chat.js'

export const saveUpdateRoomChat = async (room, newChat) => {
    if (!room || !newChat)
        return undefined

    return Chat.findOneAndUpdate(
        { roomName: room }, 
        { ...newChat, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedChat) => {
        return updatedChat
    })
}
