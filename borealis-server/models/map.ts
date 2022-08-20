import mongo from '../utils/mongo'

export interface IPointSchema {
    x: number,
    y: number,
}

export interface IPathSchema {
    points: Array<IPointSchema>,
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
    drawPaths: Array<IPathSchema>,
    fogPaths: Array<IPathSchema>,
    timestamp: number,
}

const pointSchema = new mongo.Schema<IPointSchema>({
    x: Number,
    y: Number,
})

const pathSchema = new mongo.Schema<IPathSchema>({
    points: [pointSchema],
    r: Number,
    r2: Number,
    tool: Number,
    drawColor: String,
    drawSize: Number,
})

const mapSchema = new mongo.Schema<IMapSchema>({
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

export default mongo.model('Map', mapSchema, 'room-map')
