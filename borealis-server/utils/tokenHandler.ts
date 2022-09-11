import { UpdateQuery } from 'mongoose'
import IIncToken from '../incomingInterfaces/incToken.js'
import Token, { ITokenSchema } from '../models/token.js'

export const parseIncTokenToTokenSchema = (incToken: IIncToken, roomId: string, timestamp: Date): ITokenSchema => {
    return {
        guid: incToken.guid,
        imageUrl: incToken.imageUrl,
        mapId: incToken.mapId,
        name: incToken.name,
        condition: incToken.condition,
        height: incToken.height,
        hidden: incToken.hidden,
        selected: incToken.selected,
        showLabel: incToken.showLabel,
        size: incToken.size,
        type: incToken.type,
        width: incToken.width,
        x: incToken.x,
        x0: incToken.x0,
        y: incToken.y,
        y0: incToken.y0,
        roomId: roomId,
        timestamp: timestamp.getMilliseconds(),
    }
}

export const deleteAllRoomTokens = async (roomId: string) : Promise<number> => {
    return await Token.deleteMany({ roomId: roomId, })
        .then((result) => result.deletedCount)
        .catch(() => 0)
}

export const upsertSingleToken = async (roomId: string, tokenGuid: string, updQuery: UpdateQuery<ITokenSchema>): Promise<ITokenSchema | undefined> => {
    return await Token.findOneAndUpdate(
        { roomId: roomId, guid: tokenGuid },
        updQuery,
        { new: true, upsert: true, })
        .then((updatedToken) => updatedToken)
        .catch(() => undefined)
}

export const overwriteRoomTokens = async (roomId: string, newTokens: Array<ITokenSchema>): Promise<Array<ITokenSchema | undefined>> => {
    if (!roomId || !newTokens)
        return []

    await deleteAllRoomTokens(roomId)

    const updatedTokens = Promise.all(
        newTokens.map((newToken) => upsertSingleToken(roomId, newToken.guid, { ...newToken, roomId: roomId, selected: false, timestamp: new Date(), }))
    )
    return updatedTokens
}

export const getRoomTokens = async (roomId: string, tokenGuid?: string): Promise<Array<ITokenSchema>> => {
    const queryParameters = tokenGuid ? { 'roomId': roomId, 'guid': tokenGuid, } : { 'roomId': roomId, }
    return await Token.find(queryParameters)
        .then((tokens) => tokens)
        .catch(() => [])
}
