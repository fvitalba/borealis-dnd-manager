import mongo from '../utils/mongo.js'

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

const gameSchema = new mongo.Schema<IGameSchema>({
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

export default mongo.model('Room', gameSchema, 'room')
