import mongoose from 'mongoose'

export interface ISessionSchema {
    guid: string,
    userGuid: string,
    timestamp: number,
    createdFrom: string,
    createdFromDevice: string,
    validTo: number,
    active: boolean,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const sessionSchema = new mongoose.Schema<ISessionSchema>({
    guid: String,
    userGuid: String,
    timestamp: Number,
    createdFrom: String,
    createdFromDevice: String,
    validTo: Number,
    active: Boolean,
})

export default mongoose.model('Session', sessionSchema, 'session')
