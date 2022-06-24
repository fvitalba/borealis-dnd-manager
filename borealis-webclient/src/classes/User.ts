import UserType from '../enums/UserType'
import { RoomUserSchema } from '../utils/mongoDbSchemas'

class User {
    public guid: string
    public name: string
    public type: UserType
    public assignedCharacterGuid: string
    public lastOnline: number
    public email: string

    public constructor(newGuid: string, newName: string, newType: UserType) {
        this.guid = newGuid
        this.name = newName
        this.type = newType
        this.assignedCharacterGuid = ''
        this.lastOnline = 0
        this.email = ''
    }

    static fromDbSchema(dbUser: RoomUserSchema): User {
        const newUser = new User(dbUser.guid, dbUser.name, dbUser.type)
        return newUser
    }

    public copy(): User {
        const userCopy = new User(this.guid, this.name, this.type)
        userCopy.assignedCharacterGuid = this.assignedCharacterGuid
        userCopy.lastOnline = this.lastOnline
        userCopy.email = this.email
        return userCopy
    }

    public isEmpty(): boolean {
        return (this.guid === '') && (this.name === '')
    }
}

export default User
