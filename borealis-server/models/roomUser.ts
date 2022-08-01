import mongoose from 'mongoose'

export interface IRoomUserSchema {
    roomId: string,
    guid: string,
    name: string,
    type: number,
    assignedCharacterGuid: string,
    lastOnline: number,
    active: boolean,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const roomUserSchema = new mongoose.Schema<IRoomUserSchema>({
    roomId: String,
    guid: String,
    name: String,
    type: Number,
    assignedCharacterGuid: String,
    lastOnline: Number,
    active: Boolean,
})

export default mongoose.model('RoomUser', roomUserSchema, 'room-user')
