import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => {})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const mapSchema = new mongoose.Schema({
    name: String,
    id: Number,
    imageUrl: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    drawPaths: [mongoose.Schema.Types.Mixed],
    fogPaths: [mongoose.Schema.Types.Mixed],
})

const tokenSchema = new mongoose.Schema({
    guid: String,
    name: String,
    url: String,
    mapId: Number,
    x: Number,
    y: Number,
    ko: Boolean,
    pc: Boolean,
    width: Number,
    height: Number,
    selected: false,
    hidden: Boolean,
    x0: Number,
    y0: Number,
})

const gameSchema = new mongoose.Schema({
    mapId: Number,
    gen: Number,
    width: Number,
    height: Number,
    fogEnabled: Boolean,
    maps: [mapSchema],
    tokens: [tokenSchema],
})

const metadataSchema = new mongoose.Schema({
    isHost: String,
    room: String,
    cursors: [],
    lastX: Number,
    lastY: Number,
    downX: Number,
    downY: Number,
})

const roomSchema = new mongoose.Schema({
    game: gameSchema,
    metadata: metadataSchema,
    timestamp: Number,
})

export default mongoose.model('Room', roomSchema, 'room')
