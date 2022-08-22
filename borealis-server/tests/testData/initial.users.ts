import { IUserSchema } from '../../models/user'
import { randomUUID } from 'crypto'
import IIncUser from '../../incomingInterfaces/incUser'

export const initialUsers: Array<IUserSchema> = [
    {
        active: false,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Inactive Guest',
        secret: '',
    },
    {
        active: true,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Active Guest',
        secret: '',
    },
    {
        active: true,
        email: 'one@two.three',
        guest: false,
        guid: randomUUID(),
        lastOnline: (new Date()).getMilliseconds(),
        name: 'Test Actual User',
        secret: 'password',
    },
]

export const initialUsersForAuthentication = initialUsers.concat([
    {
        active: true,
        email: 'four@five.six',
        guest: false,
        guid: randomUUID(),
        lastOnline: (new Date()).getMilliseconds(),
        name: 'Test Actual User 2',
        secret: 'drowssap',
    },
    {
        active: true,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Active Guest 2',
        secret: '',
    }
])

export const newActualUser: IIncUser = {
    userName: 'Test New User',
    userGuid: '',
    email: 'four@five.six',
    isGuest: false,
    secret: 'drowssap',
}

export const newGuestUser: IIncUser = {
    userName: 'Test New Guest User',
    userGuid: '',
    email: '',
    isGuest: true,
    secret: '',
}
