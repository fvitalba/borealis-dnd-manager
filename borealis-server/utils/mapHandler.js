import Map from '../models/map.js'

export const saveUpdateRoomMap = async (roomId, newMaps) => {
    if (!roomId || !newMaps)
        return undefined

    return Map.deleteMany({ roomId: roomId, })
        .then(() => {
            return newMaps.map(async (newMap) => {
                return Map.findOneAndUpdate(
                    { roomId: roomId, id: newMap.id }, 
                    { ...newMap, roomId: roomId, timestamp: new Date(), }, 
                    { new: true, upsert: true, }
                ).then((updatedMap) => {
                    return updatedMap
                })
                .catch(() => null)
            })
        })
        .catch(() => null)
}
