import { UpdateQuery } from 'mongoose'
import IIncMap, { IIncPath } from '../incomingInterfaces/incMap'
import Map, { IMapSchema, IPathSchema } from '../models/map'

const parseIncPathToPathSchema = (incPath: IIncPath): IPathSchema => {
    return {
        drawColor: incPath.drawColor,
        drawSize: incPath.drawSize,
        points: incPath.points,
        r: incPath.r,
        r2: incPath.r2,
        tool: incPath.tool,
    }
}

export const parseIncMapToMapSchema = (incMap: IIncMap, roomId: string, timestamp: Date): IMapSchema => {
    const parsedDrawPaths = incMap.drawPaths.map((path) => parseIncPathToPathSchema(path))
    const parsedFogPaths = incMap.fogPaths.map((path) => parseIncPathToPathSchema(path))
    return {
        id: incMap.id,
        name: incMap.name,
        height: incMap.height,
        width: incMap.width,
        backgroundUrl: incMap.backgroundUrl,
        drawPaths: parsedDrawPaths,
        fogPaths: parsedFogPaths,
        x: incMap.x,
        y: incMap.y,
        roomId: roomId,
        timestamp: timestamp.getMilliseconds(),
    }
}

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

export const getRoomMaps = async (roomId: string, mapId?: number): Promise<Array<IMapSchema>> => {
    const queryParameters = ((mapId !== undefined) && (mapId !== -1)) ? { 'roomId': roomId, 'id': mapId, } : { 'roomId': roomId, }
    return Map.find(queryParameters)
        .then((maps) => maps)
        .catch(() => [])
}
