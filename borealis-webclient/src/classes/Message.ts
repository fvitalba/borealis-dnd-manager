import guid from '../utils/guid'
import MessageType from '../enums/MessageType'

class Message {
    public guid: string
    public type: MessageType
    public username: string
    public targetUsername: string
    public playerInfo: string
    public publicMessage: string
    public privateMessage: string
    public timestamp: number
    public read: boolean

    public constructor(newType: MessageType, newUsername: string, newPlayerInfo: string, newPublicMessage: string, newGuid?: string, newTimestamp?: number, newTargetUsername?: string, newPrivateMessage?: string, newRead?: boolean) {
        this.guid = newGuid ? newGuid : guid()
        this.type = newType
        this.username = newUsername
        this.targetUsername = newTargetUsername ? newTargetUsername : ''
        this.playerInfo = newPlayerInfo
        this.publicMessage = newPublicMessage
        this.privateMessage = newPrivateMessage ? newPrivateMessage : ''
        this.timestamp = newTimestamp ? newTimestamp : Date.now()
        this.read = (newRead !== undefined) ? newRead : false
    }
}

export default Message
