import Token from '../models/token.js'

export const saveUpdateRoomToken = async (roomId, newToken) => {
    if (!roomId || !newToken)
        return undefined

    return Token.findOneAndUpdate(
        { roomId: roomId, guid: newToken.guid }, 
        { ...newToken, selected: false, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedToken) => {
        return updatedToken
    })
}
