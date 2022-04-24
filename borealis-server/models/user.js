import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const userSchema = new mongoose.Schema({
    guid: String,
    name: String,
    type: Number,
    assignedCharacterGuid: String,
    email: String,
    lastOnline: Number,
    active: Boolean,
})

export default mongoose.model('User', userSchema, 'room-user')
