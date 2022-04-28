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
    secret: String,
    email: String,
    guest: Boolean,
    lastOnline: Number,
    active: Boolean,
})

export default mongoose.model('User', userSchema, 'user')
