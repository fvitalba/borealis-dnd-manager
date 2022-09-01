import mongo from '../utils/mongo.js'

export interface IRoomUserSchema {
    roomId: string,
    guid: string,
    name: string,
    type: number,
    assignedCharacterGuid: string,
    lastOnline: number,
    active: boolean,
}

const roomUserSchema = new mongo.Schema<IRoomUserSchema>({
    roomId: String,
    guid: String,
    name: String,
    type: Number,
    assignedCharacterGuid: String,
    lastOnline: Number,
    active: Boolean,
})

export default mongo.model('RoomUser', roomUserSchema, 'room-user')
