import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const roomUserSchema = new mongoose.Schema({
    roomId: String,
    guid: String,
    name: String,
    type: Number,
    assignedCharacterGuid: String,
    lastOnline: Number,
    active: Boolean,
})

export default mongoose.model('RoomUser', roomUserSchema, 'room-user')
