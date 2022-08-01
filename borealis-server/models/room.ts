import mongoose from 'mongoose'

export interface IGameSchema {
    roomId: string,
    roomName: string,
    currentMapId: number,
    version: number,
    width: number,
    height: number,
    fogEnabled: boolean,
    tokenSelected: boolean,
    hostUserGuid: string,
    timestamp: number,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const gameSchema = new mongoose.Schema<IGameSchema>({
    roomId: String,
    roomName: String,
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
