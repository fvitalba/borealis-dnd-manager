import mongoose from 'mongoose'

export interface IPointSchema {
    x: number,
    y: number,
}

export interface IPathSchema {
    points: [IPointSchema],
    r: number,
    r2: number,
    tool: number,
    drawColor: string,
    drawSize: number,
}

export interface IMapSchema {
    roomId: string,
    name: string,
    id: number,
    backgroundUrl: string,
    x: number,
    y: number,
    width: number,
    height: number,
    drawPaths: [IPathSchema],
    fogPaths: [IPathSchema],
    timestamp: number,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const pointSchema = new mongoose.Schema<IPointSchema>({
    x: Number,
    y: Number,
})

const pathSchema = new mongoose.Schema<IPathSchema>({
    points: [pointSchema],
    r: Number,
    r2: Number,
    tool: Number,
    drawColor: String,
    drawSize: Number,
})

const mapSchema = new mongoose.Schema<IMapSchema>({
    roomId: String,
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
