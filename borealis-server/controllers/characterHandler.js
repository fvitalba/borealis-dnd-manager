import Character from '../models/character.js'

export const saveUpdateRoomCharacter = async (room, newCharacter) => {
    if (!room || !newCharacter)
        return undefined

    return Character.findOneAndUpdate(
        { roomName: room, guid: newCharacter.guid }, 
        { ...newCharacter, timestamp: new Date(), }, 
        { new: true, upsert: true, }
    ).then((updatedCharacter) => {
        return updatedCharacter
    })
}
