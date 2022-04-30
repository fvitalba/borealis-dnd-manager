import Character from '../models/character.js'

export const saveUpdateRoomCharacters = async (roomId, newCharacters) => {
    if (!roomId || !newCharacters)
        return undefined

    return Character.deleteMany({ roomId: roomId, })
        .then(() => {
            return newCharacters.map(async (newCharacter) => {
                return Character.findOneAndUpdate(
                    { roomId: roomId, guid: newCharacter.guid }, 
                    { ...newCharacter, roomId: roomId, timestamp: new Date(), }, 
                    { new: true, upsert: true, }
                ).then((updatedCharacter) => {
                    return updatedCharacter
                })
                .catch(() => null)
            })
        })
        .catch(() => null)
}
