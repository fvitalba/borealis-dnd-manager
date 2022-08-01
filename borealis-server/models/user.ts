import mongoose from 'mongoose'

export interface IUserSchema {
    guid: string,
    name: string,
    secret: string,
    email: string,
    guest: boolean,
    lastOnline: number,
    active: boolean,
}

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const userSchema = new mongoose.Schema<IUserSchema>({
    guid: String,
    name: String,
    secret: String,
    email: String,
    guest: Boolean,
    lastOnline: Number,
    active: Boolean,
})

export default mongoose.model('User', userSchema, 'user')
