import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const sessionSchema = new mongoose.Schema({
    guid: String,
    userGuid: String,
    timestamp: Number,
    createdFrom: String,
    createdFromDevice: String,
    validTo: Number,
    active: Boolean,
})

export default mongoose.model('Session', sessionSchema, 'session')
