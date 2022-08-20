import { IUserSchema } from '../../models/user'
import { randomUUID } from 'crypto'

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
