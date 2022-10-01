import { IUserSchema } from '../../src/models/user.js'
import { randomUUID } from 'crypto'
import IIncUser from '../../src/incomingInterfaces/incUser.js'

export const initialUsers: Array<IUserSchema> = [
    {
        active: false,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Inactive Guest',
        name_lowercase: 'test inactive guest',
        secret: '',
    },
    {
        active: true,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Active Guest',
        name_lowercase: 'test active guest',
        secret: '',
    },
    {
        active: true,
        email: 'one@two.three',
        guest: false,
        guid: randomUUID(),
        lastOnline: (new Date()).getMilliseconds(),
        name: 'Test Actual User',
        name_lowercase: 'test actual user',
        secret: 'password',
        //secret: '$argon2id$v=19$m=4096,t=3,p=1$+WEtYQRcN9cWU3ASX65FPA$N2lxRSkie3+oU68BnwcR1VRfz15k2URL45RU1SpHCYw',
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
        name_lowercase: 'test actual user 2',
        secret: 'drowssap',
        //hashedSecret: '$argon2id$v=19$m=4096,t=3,p=1$NQ68CTgNKSnwniUtY5rhVg$aC+gL5GTA6vkPnaP4Om9xatTujxOwaT0SOubJRmBwWE',
    },
    {
        active: true,
        email: '',
        guest: true,
        guid: randomUUID(),
        lastOnline: 0,
        name: 'Test Active Guest 2',
        name_lowercase: 'test active guest 2',
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
