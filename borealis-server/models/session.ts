import mongo from '../utils/mongo.js'

export interface ISessionSchema {
    guid: string,
    userGuid: string,
    timestamp: number,
    createdFrom: string,
    createdFromDevice: string,
    validTo: number,
    active: boolean,
}

const sessionSchema = new mongo.Schema<ISessionSchema>({
    guid: String,
    userGuid: String,
    timestamp: Number,
    createdFrom: String,
    createdFromDevice: String,
    validTo: Number,
    active: Boolean,
})

export default mongo.model('Session', sessionSchema, 'session')
