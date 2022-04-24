import Room from '../models/room.js'

export const saveUpdateRoom = async (roomId, hostUserGuid, newRoom) => {
    if (!roomId || !newRoom)
        return undefined

    return Room.findOneAndUpdate(
        { roomId: roomId, hostUserGuid: hostUserGuid, }, 
        { ...newRoom, roomId: roomId, hostUserGuid: hostUserGuid, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedRoom) => {
        return updatedRoom
    })
}
