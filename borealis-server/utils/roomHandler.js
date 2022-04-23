import Room from '../models/room.js'

export const saveUpdateRoom = async (room, newRoom) => {
    if (!room || !newRoom)
        return undefined

    return Room.findOneAndUpdate(
        { roomName: room, }, 
        { ...newRoom, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedRoom) => {
        return updatedRoom
    })
}
