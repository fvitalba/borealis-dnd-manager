import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const chatMessageSchema = new mongoose.Schema({
    userName: String,
    roomName: String,
    message: String,
})

export default mongoose.model('Message', chatMessageSchema, 'room-chat')
