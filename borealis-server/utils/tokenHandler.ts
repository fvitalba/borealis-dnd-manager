import { UpdateQuery } from 'mongoose'
import Token, { ITokenSchema } from '../models/token.js'

export const deleteAllRoomTokens = async (roomId: string) : Promise<number> => {
    return Token.deleteMany({ roomId: roomId, })
        .then((result) => result.deletedCount)
        .catch(() => 0)
}

export const upsertSingleToken = async (roomId: string, tokenGuid: string, updQuery: UpdateQuery<ITokenSchema>): Promise<ITokenSchema | undefined> => {
    return Token.findOneAndUpdate(
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
