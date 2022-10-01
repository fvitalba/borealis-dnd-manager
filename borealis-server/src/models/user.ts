import mongo from '../utils/mongo.js'

export interface IUserSchema {
    guid: string,
    name: string,
    name_lowercase: string,
    secret: string,
    email: string,
    guest: boolean,
    lastOnline: number,
    active: boolean,
}

const userSchema = new mongo.Schema<IUserSchema>({
    guid: String,
    name: String,
    name_lowercase: String,
    secret: String,
    email: String,
    guest: Boolean,
    lastOnline: Number,
    active: Boolean,
})

export default mongo.model('User', userSchema, 'user')
