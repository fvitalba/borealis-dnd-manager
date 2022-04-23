import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const tokenSchema = new mongoose.Schema({
    roomId: String,
    guid: String,
    name: String,
    imageUrl: String,
    mapId: Number,
    x: Number,
    y: Number,
    condition: String,
    type: String,
    size: String,
    width: Number,
    height: Number,
    selected: Boolean,
    hidden: Boolean,
    showLabel: Boolean,
    x0: Number,
    y0: Number,
    timestamp: Number,
})

export default mongoose.model('Token', tokenSchema, 'room-token')
