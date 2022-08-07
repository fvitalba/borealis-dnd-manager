import { UpdateQuery } from 'mongoose'
import Map, { IMapSchema } from '../models/map.js'

export const deleteAllRoomMaps = async (roomId: string) : Promise<number> => {
    return Map.deleteMany({ roomId: roomId, })
        .then((result) => result.deletedCount)
        .catch(() => 0)
}

export const upsertSingleMap = async (roomId: string, mapId: number, updQuery: UpdateQuery<IMapSchema>): Promise<IMapSchema | undefined> => {
    return Map.findOneAndUpdate(
        { roomId: roomId, id: mapId },
        updQuery,
        { new: true, upsert: true, })
        .then((updatedMap) => updatedMap)
        .catch(() => undefined)
}

export const overwriteRoomMaps = async (roomId: string, newMaps: Array<IMapSchema>): Promise<Array<IMapSchema | undefined>> => {
    if (!roomId || !newMaps)
        return []

    await deleteAllRoomMaps(roomId)

    const updatedMaps = Promise.all(
        newMaps.map((newMap) => upsertSingleMap(roomId, newMap.id, { ...newMap, roomId: roomId, timestamp: new Date(), }))
    )
    return updatedMaps
}
