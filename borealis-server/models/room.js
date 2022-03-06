import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => {})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const coordinateSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    r: Number,
    r2: Number,
    tool: String,
    drawColor: String,
    drawSize: Number,
})

const mapSchema = new mongoose.Schema({
    name: String,
    $id: Number,
    imageUrl: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    drawPaths: [coordinateSchema],
    fogPaths: [coordinateSchema],
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
    $selected: false,
    $x0: Number,
    $y0: Number,
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
})

export default mongoose.model('Room', roomSchema, 'room')
