enum UserType {
    "host" = 0,
    "player" = 1,
}

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
