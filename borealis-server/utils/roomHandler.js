import Room from '../models/room.js'

export const saveUpdateRoom = async (roomId, roomName, hostUserGuid, newRoom) => {
    if (!roomId || !roomName || !newRoom)
        return undefined

    return Room.findOneAndUpdate(
        { roomId: roomId, hostUserGuid: hostUserGuid, }, 
        { ...newRoom, roomId: roomId, roomName: roomName, hostUserGuid: hostUserGuid, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedRoom) => {
        return updatedRoom
    })
}

export const exportRoomWithRole = (room, role) => {
    return {
        ...room,
        userRole: role,
    }
}
