import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const pointSchema = new mongoose.Schema({
    x: Number,
    y: Number,
})

const pathSchema = new mongoose.Schema({
    points: [pointSchema],
    r: Number,
    r2: Number,
    tool: String,
    drawColor: String,
    drawSize: Number,
})

const mapSchema = new mongoose.Schema({
    roomName: String,
    name: String,
    id: Number,
    backgroundUrl: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    drawPaths: [pathSchema],
    fogPaths: [pathSchema],
    timestamp: Number,
})

export default mongoose.model('Map', mapSchema, 'room-map')
