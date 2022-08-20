import mongo from '../utils/mongo'

export interface IChatMessage {
    guid: string,
    type: number,
    username: string,
    targetUsername: string,
    playerInfo: string,
    publicMessage: string,
    privateMessage: string,
    timestamp: number,
    read: boolean,
}

export interface IChatSchema {
    roomId: string,
    messages: Array<IChatMessage>,
    timestamp: number,
}

const chatMessageSchema = new mongo.Schema<IChatMessage>({
    guid: String,
    type: Number,
    username: String,
    targetUsername: String,
    playerInfo: String,
    publicMessage: String,
    privateMessage: String,
    timestamp: Number,
    read: Boolean,
})

const chatSchema = new mongo.Schema<IChatSchema>({
    roomId: String,
    messages: [chatMessageSchema],
    timestamp: Number,
})

export default mongo.model('Chat', chatSchema, 'room-chat')
