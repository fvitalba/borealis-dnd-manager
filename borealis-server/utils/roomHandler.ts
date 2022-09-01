import { FilterQuery, UpdateQuery } from 'mongoose'
import IIncRoom from '../incomingInterfaces/incRoom.js'
import Room, { IGameSchema } from '../models/room.js'
import RoomUser, { IRoomUserSchema } from '../models/roomUser.js'

export interface IGameSchemaWithRole extends IGameSchema {
    userRole: number,
}

export const parseIncRoomToRoomSchema = (incRoom: IIncRoom, hostUserGuid: string, roomId: string, roomName: string, timestamp: Date): IGameSchema => {
    return {
        currentMapId: incRoom.currentMapId,
        fogEnabled: incRoom.fogEnabled,
        height: incRoom.height,
        width: incRoom.width,
        tokenSelected: incRoom.tokenSelected,
        version: incRoom.version,
        hostUserGuid: hostUserGuid,
        roomId: roomId,
        roomName: roomName,
        timestamp: timestamp.getMilliseconds(),
    }
}

export const upsertSingleRoom = async (roomId: string, hostUserGuid: string, updQuery: UpdateQuery<IGameSchema>): Promise<IGameSchema | undefined> => {
    return Room.findOneAndUpdate(
        { roomId: roomId, hostUserGuid: hostUserGuid, },
        updQuery,
        { new: true, upsert: true, }
    ).then((updatedRoom) => {
        return updatedRoom
    }).catch(() => undefined)
}

export const overwriteRoom = async (roomId: string, roomName: string, hostUserGuid: string, newRoom: IGameSchema): Promise<IGameSchema | undefined> => {
    if (roomId === '' || roomName === '' || !newRoom)
        return undefined

    return upsertSingleRoom(roomId, hostUserGuid, { ...newRoom, roomId: roomId, roomName: roomName, hostUserGuid: hostUserGuid, timestamp: new Date(), })
}

export const exportRoomWithRole = (room: IGameSchema, role: number): IGameSchemaWithRole => {
    return {
        ...room,
        userRole: role,
    }
}

export const getAllUserRooms = async (roomId: string, userGuid: string): Promise<Array<IRoomUserSchema>> => {
    // Returns all the Rooms where the userGuid is present as a User. This includes any Player or GM occurences.
    const queryParameters: FilterQuery<IRoomUserSchema> = {}
    queryParameters['guid'] = userGuid
    if (roomId !== undefined && roomId !== '')
        queryParameters['roomId'] = roomId

    return RoomUser.find(queryParameters)
        .then((roomUsers) => roomUsers)
        .catch(() => [])
}

export const getRoomFromId = async (roomId: string): Promise<IGameSchema | null | undefined> => {
    return Room.findOne({ roomId: roomId })
        .then((foundRoom) => foundRoom)
        .catch(() => undefined)
}

export const getAllUserRoomsWithRole = async (roomId: string, userGuid: string): Promise<Array<IGameSchemaWithRole | undefined>> => {
    const userRooms = await getAllUserRooms(roomId, userGuid)

    return Promise.all(
        userRooms.map(async (userRoom) => {
            const room = await getRoomFromId(userRoom.roomId)
            if ((room !== undefined) && (room !== null)) {
                return exportRoomWithRole(room, userRoom.type)
            } else {
                return undefined
            }
        })
    )
}

export const getAllRoomsForUserIdWithRole = async (roomId: string, userGuid: string): Promise<Array<IGameSchemaWithRole | undefined>> => {
    if (userGuid === '')
        return []

    const usersRoomsWithRole = await getAllUserRoomsWithRole(roomId, userGuid)
    return usersRoomsWithRole
}
