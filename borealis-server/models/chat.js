import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const chatMessageSchema = new mongoose.Schema({
    guid: String,
    type: String,
    username: String,
    targetUsername: String,
    playerInfo: String,
    publicMessage: String,
    privateMessage: String,
    timestamp: Number,
    read: Boolean,
})

const chatSchema = new mongoose.Schema({
    roomName: String,
    messages: [chatMessageSchema],
    timestamp: Number,
})

export default mongoose.model('Chat', chatSchema, 'room-chat')
