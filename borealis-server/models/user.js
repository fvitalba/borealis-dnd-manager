import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const userSchema = new mongoose.Schema({
    guid: String,
    userName: String,
    roomName: String,
    lastOnline: Number,
    isHost: Boolean,
})

export default mongoose.model('User', userSchema, 'room-user')
