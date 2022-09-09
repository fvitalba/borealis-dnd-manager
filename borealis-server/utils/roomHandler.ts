import { FilterQuery, UpdateQuery } from 'mongoose'
import IIncRoom from '../incomingInterfaces/incRoom.js'
import Room, { IGameSchema } from '../models/room.js'
import RoomUser, { IRoomUserSchema } from '../models/roomUser.js'
import { overwriteSingleRoomUser } from './userHandler.js'

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
        { new: true, upsert: true, })
        .then((updatedRoom) => updatedRoom)
        .catch(() => undefined)
}

export const overwriteRoom = async (roomId: string, roomName: string, hostUserGuid: string, newRoom: IGameSchema): Promise<IGameSchema | undefined> => {
    if (roomId === '' || roomName === '' || !newRoom)
        return undefined

    const newRoomInDb = await upsertSingleRoom(roomId, hostUserGuid, { ...newRoom, roomId: roomId, roomName: roomName, hostUserGuid: hostUserGuid, timestamp: new Date(), })
    const roomsForUser = await getAllRoomsForUserIdWithRole(roomId, hostUserGuid)
    if ((roomsForUser === undefined) || (roomsForUser.length === 0)) {
        const newRoomUser = new RoomUser({
            roomId: roomId,
            guid: hostUserGuid,
            name: 'Host',   //TODO: get name from mongodb?
            type: 0,
            assignedCharacterGuid: '',
            lastOnline: (new Date()).getMilliseconds(),
            active: true,
        })
        await overwriteSingleRoomUser(roomId, newRoomUser)
    }
    return newRoomInDb
}

export const exportRoomWithRole = (roomToExport: IGameSchema, role: number): IGameSchemaWithRole => {
    return {
        currentMapId: roomToExport.currentMapId,
        fogEnabled: roomToExport.fogEnabled,
        height: roomToExport.height,
        hostUserGuid: roomToExport.hostUserGuid,
        roomId: roomToExport.roomId,
        roomName: roomToExport.roomName,
        timestamp: roomToExport.timestamp,
        tokenSelected: roomToExport.tokenSelected,
        version: roomToExport.version,
        width: roomToExport.width,
        userRole: role,
    }
}

export const getAllRoomUsers = async (roomId: string, userGuid: string): Promise<Array<IRoomUserSchema>> => {
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
    const roomUsers = await getAllRoomUsers(roomId, userGuid)
    const roomsToExport: Array<IGameSchemaWithRole> = []
    for(let i = 0; i < roomUsers.length; i++) {
        const userRoom = await getRoomFromId(roomUsers[i].roomId)
        if ((userRoom !== undefined) && (userRoom !== null)) {
            const roomWithRole = exportRoomWithRole(userRoom, roomUsers[i].type)
            roomsToExport.push(roomWithRole)
        }
    }
    return roomsToExport
}

export const getAllRoomsForUserIdWithRole = async (roomId: string, userGuid: string): Promise<Array<IGameSchemaWithRole | undefined>> => {
    if (userGuid === '')
        return []

    const usersRoomsWithRole = await getAllUserRoomsWithRole(roomId, userGuid)
    return usersRoomsWithRole
}
