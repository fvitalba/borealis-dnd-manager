import Room from '../models/room.js'
import RoomUser from '../models/roomUser.js'

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

export const getAllRoomsForUserIdWithRole = async (roomId, userGuid) => {
    if (!userGuid)
        return undefined
    
    const queryParameters = {}
    queryParameters['guid'] = userGuid
    if (roomId !== undefined && roomId !== '')
        queryParameters['roomId'] = roomId

    return RoomUser.find(queryParameters)
        .then((roomUsers) => {
            return Promise.all(roomUsers.map(async (roomUser) => {
                return Room.findOne({ roomId: roomUser.roomId })
                    .then((foundRoom) => {
                        return exportRoomWithRole(foundRoom, roomUser.type)
                    })
                    .catch(() => undefined)
            }))
        })
        .catch(() => undefined)
}

export const exportRoomWithRole = (room, role) => {
    return {
        ...room,
        userRole: role,
    }
}
