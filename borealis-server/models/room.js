import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const gameSchema = new mongoose.Schema({
    roomId: String,
    currentMapId: Number,
    version: Number,
    width: Number,
    height: Number,
    fogEnabled: Boolean,
    tokenSelected: Boolean,
    hostUserGuid: String,
    timestamp: Number,
})

export default mongoose.model('Room', gameSchema, 'room')
