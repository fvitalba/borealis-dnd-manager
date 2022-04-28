import Token from '../models/token.js'

export const saveUpdateRoomToken = async (roomId, newTokens) => {
    if (!roomId || !newTokens)
        return undefined

    return newTokens.map(async (newToken) => {
        return Token.findOneAndUpdate(
            { roomId: roomId, guid: newToken.guid }, 
            { ...newToken, roomId: roomId, selected: false, timestamp: new Date(), }, 
            { new: true, upsert: true, }
        ).then((updatedToken) => {
            return updatedToken
        })
        .catch(() => null)
    })
}
