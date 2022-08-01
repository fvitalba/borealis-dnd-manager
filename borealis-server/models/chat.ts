import mongoose from 'mongoose'

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
    messages: [IChatMessage],
    timestamp: number,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const chatMessageSchema = new mongoose.Schema<IChatMessage>({
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

const chatSchema = new mongoose.Schema<IChatSchema>({
    roomId: String,
    messages: [chatMessageSchema],
    timestamp: Number,
})

export default mongoose.model('Chat', chatSchema, 'room-chat')
