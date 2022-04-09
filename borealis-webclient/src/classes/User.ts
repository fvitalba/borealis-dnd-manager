import UserType from '../enums/UserType'

class User {
    public guid: string
    public name: string
    public type: UserType
    public assignedCharacterGuid: string
    public lastOnline: number

    public constructor(newGuid: string, newName: string, newType: UserType) {
        this.guid = newGuid
        this.name = newName
        this.type = newType
        this.assignedCharacterGuid = ''
        this.lastOnline = 0
    }
}

export default User
