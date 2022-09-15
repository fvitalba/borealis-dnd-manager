import { IChatSchema } from '../../models/chat'
import { randomUUID } from 'crypto'
import { initialRooms } from './initial.rooms'
import { initialUsersForAuthentication } from './initial.users.js'
import IIncChatMessage from '../../incomingInterfaces/incChatMessage'

export const initialChats: Array<IChatSchema> = [
    {
        roomId: initialRooms[2].roomId,
        timestamp: (new Date()).getMilliseconds(),
        messages: [
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[3].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Whispering',
                privateMessage: 'Hello Player (#4)!',
                targetUsername: initialUsersForAuthentication[4].name,
                playerInfo: 'Player (#3)',
                type: 0,
                read: true,
            },
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[4].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Hi Player (#3)!',
                privateMessage: '',
                targetUsername: '',
                playerInfo: 'Player (#4)',
                type: 0,
                read: true,
            },
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[4].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Ups, I wanted to send this message in Private, I will try again!',
                privateMessage: '',
                targetUsername: '',
                playerInfo: 'Player (#4)',
                type: 0,
                read: true,
            },
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[4].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Whisper',
                privateMessage: 'Hi Player (#3)!',
                targetUsername: initialUsersForAuthentication[3].name,
                playerInfo: 'Player (#4)',
                type: 0,
                read: true,
            },
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[3].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'The command /whipser does not exist!',
                privateMessage: 'The command /whipser does not exist!',
                targetUsername: initialUsersForAuthentication[3].name,
                playerInfo: 'Player (#3)',
                type: 3,
                read: true,
            },
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[3].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Well that was embarrassing.',
                privateMessage: '',
                targetUsername: '',
                playerInfo: 'Player (#3)',
                type: 0,
                read: true,
            },
        ],
    },
    {
        roomId: initialRooms[1].roomId,
        timestamp: (new Date()).getMilliseconds(),
        messages: [],
    },
    {
        roomId: initialRooms[0].roomId,
        timestamp: (new Date()).getMilliseconds(),
        messages: [
            {
                guid: randomUUID(),
                username: initialUsersForAuthentication[0].name,
                timestamp: (new Date()).getMilliseconds(),
                publicMessage: 'Welcome Everyone!',
                privateMessage: '',
                targetUsername: '',
                playerInfo: 'Player (#0)',
                type: 0,
                read: true,
            },
        ],
    },
]

export const newChat: Array<IIncChatMessage> = [
    {
        guid: randomUUID(),
        username: initialUsersForAuthentication[1].name,
        playerInfo: 'Player (#1)',
        privateMessage: '',
        publicMessage: 'Anyone here?',
        read: true,
        targetUsername: '',
        timestamp: (new Date()).getMilliseconds(),
        type: 0,
    },
    {
        guid: randomUUID(),
        username: initialUsersForAuthentication[2].name,
        playerInfo: 'Player (#2)',
        privateMessage: '',
        publicMessage: 'Yeah, Im here.',
        read: true,
        targetUsername: '',
        timestamp: (new Date()).getMilliseconds(),
        type: 0,
    },
]
