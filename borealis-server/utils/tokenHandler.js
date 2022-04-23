import Token from '../models/token.js'

export const saveUpdateRoomToken = async (room, newToken) => {
    if (!room || !newToken)
        return undefined

    return Token.findOneAndUpdate(
        { roomName: room, guid: newToken.guid }, 
        { ...newToken, selected: false, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedToken) => {
        return updatedToken
    })
}
