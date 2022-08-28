import { IRoomUserSchema } from '../../models/roomUser'
import { initialUsersForAuthentication } from './initial.users'
import { initialRooms } from './initial.rooms'

export const initialRoomUsers: Array<IRoomUserSchema> = [
    {
        active: initialUsersForAuthentication[0].active,
        guid: initialUsersForAuthentication[0].guid,
        lastOnline: 0,
        name: initialUsersForAuthentication[0].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[0].roomId,
        type: 1,    // 1 is player
    },
    {
        active: initialUsersForAuthentication[1].active,
        guid: initialUsersForAuthentication[1].guid,
        lastOnline: 0,
        name: initialUsersForAuthentication[1].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[0].roomId,
        type: 0,    // 0 is host
    },
    {
        active: initialUsersForAuthentication[1].active,
        guid: initialUsersForAuthentication[1].guid,
        lastOnline: 0,
        name: initialUsersForAuthentication[1].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[1].roomId,
        type: 1,    // 1 is player
    },
    {
        active: initialUsersForAuthentication[2].active,
        guid: initialUsersForAuthentication[2].guid,
        lastOnline: (new Date()).getMilliseconds(),
        name: initialUsersForAuthentication[2].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[1].roomId,
        type: 0,    // 0 is host
    },
    {
        active: initialUsersForAuthentication[3].active,
        guid: initialUsersForAuthentication[3].guid,
        lastOnline: (new Date()).getMilliseconds(),
        name: initialUsersForAuthentication[3].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[1].roomId,
        type: 1,    // 1 is player
    },
    {
        active: initialUsersForAuthentication[3].active,
        guid: initialUsersForAuthentication[3].guid,
        lastOnline: (new Date()).getMilliseconds(),
        name: initialUsersForAuthentication[3].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[2].roomId,
        type: 0,    // 0 is host
    },
    {
        active: initialUsersForAuthentication[4].active,
        guid: initialUsersForAuthentication[4].guid,
        lastOnline: 0,
        name: initialUsersForAuthentication[4].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[2].roomId,
        type: 1,    // 1 is player
    },
    {
        active: initialUsersForAuthentication[4].active,
        guid: initialUsersForAuthentication[4].guid,
        lastOnline: 0,
        name: initialUsersForAuthentication[4].name,
        assignedCharacterGuid: '',
        roomId: initialRooms[0].roomId,
        type: 1,    // 1 is player
    }
]
