import Room from '../models/room.js'

export const saveUpdateRoom = async (roomId, newRoom) => {
    if (!roomId || !newRoom)
        return undefined

    return Room.findOneAndUpdate(
        { roomId: roomId, }, 
        { ...newRoom, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedRoom) => {
        return updatedRoom
    })
}
