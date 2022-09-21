interface IIncRoomUser {
    roomId: string,
    guid: string,
    name: string,
    type: number,
    assignedCharacterGuid: string,
    lastOnline: number,
    active: boolean,
}

export default IIncRoomUser
