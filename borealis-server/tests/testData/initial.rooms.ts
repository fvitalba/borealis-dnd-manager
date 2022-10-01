import { IGameSchema } from '../../src/models/room.js'
import { randomUUID } from 'crypto'
import { initialUsersForAuthentication } from './initial.users.js'
import IIncRoom from '../../src/incomingInterfaces/incRoom.js'

export const initialRooms: Array<IGameSchema> = [
    {
        roomId: randomUUID(),
        roomName: 'First Room (Created by Guest)',
        currentMapId: 1,
        version: 1,
        width: 640,
        height: 480,
        fogEnabled: true,
        tokenSelected: false,
        hostUserGuid: initialUsersForAuthentication[1].guid,
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        roomId: randomUUID(),
        roomName: 'Second Room (Empty)',
        currentMapId: -1,
        version: 1,
        width: 640,
        height: 480,
        fogEnabled: true,
        tokenSelected: false,
        hostUserGuid: initialUsersForAuthentication[2].guid,
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        roomId: randomUUID(),
        roomName: 'Third Room',
        currentMapId: 0,
        version: 1,
        width: 640,
        height: 480,
        fogEnabled: true,
        tokenSelected: false,
        hostUserGuid: initialUsersForAuthentication[3].guid,
        timestamp: (new Date()).getMilliseconds(),
    },
]

export const newRoom: IIncRoom = {
    currentMapId: 0,
    fogEnabled: true,
    height: 1080,
    width: 1920,
    tokenSelected: false,
    version: 1,
}

export const newRoomId = randomUUID()
export const newRoomName = 'New Room'
export const newRoomHostUserGuid = initialUsersForAuthentication[3].guid
