import Map from '../models/map.js'

export const saveUpdateRoomMap = async (room, newMap) => {
    if (!room || !newMap)
        return undefined

    return Map.findOneAndUpdate(
        { roomName: room, id: newMap.id }, 
        { ...newMap, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedMap) => {
        return updatedMap
    })
}
