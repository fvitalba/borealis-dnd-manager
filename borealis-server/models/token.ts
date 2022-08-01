import mongoose from 'mongoose'

export interface ITokenSchema {
    roomId: string,
    guid: string,
    name: string,
    imageUrl: string,
    mapId: number,
    x: number,
    y: number,
    condition: number,
    type: number,
    size: number,
    width: number,
    height: number,
    selected: boolean,
    hidden: boolean,
    showLabel: boolean,
    x0: number,
    y0: number,
    timestamp: number,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const tokenSchema = new mongoose.Schema<ITokenSchema>({
    roomId: String,
    guid: String,
    name: String,
    imageUrl: String,
    mapId: Number,
    x: Number,
    y: Number,
    condition: Number,
    type: Number,
    size: Number,
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
