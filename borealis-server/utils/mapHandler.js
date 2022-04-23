import Map from '../models/map.js'

export const saveUpdateRoomMap = async (roomId, newMap) => {
    if (!roomId || !newMap)
        return undefined

    return Map.findOneAndUpdate(
        { roomId: roomId, id: newMap.id }, 
        { ...newMap, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedMap) => {
        return updatedMap
    })
}
