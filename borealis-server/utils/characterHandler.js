import Character from '../models/character.js'

export const saveUpdateRoomCharacter = async (roomId, newCharacter) => {
    if (!roomId || !newCharacter)
        return undefined

    return Character.findOneAndUpdate(
        { roomId: roomId, guid: newCharacter.guid }, 
        { ...newCharacter, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedCharacter) => {
        return updatedCharacter
    })
}
