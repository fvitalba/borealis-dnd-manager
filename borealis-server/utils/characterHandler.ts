import { UpdateQuery } from 'mongoose'
import Character, { ICharacterSchema } from '../models/character.js'

//https://github.com/TomDoesTech/The-Ultimate-Guide-to-TypeScript-With-Mongoose/
//https://www.youtube.com/watch?v=TbT7eO1fxuI

export const deleteAllRoomCharacters = async (roomId: string): Promise<number> => {
    return Character.deleteMany({ roomId: roomId, })
        .then((result) => {
            return result.deletedCount
        })
        .catch(() => 0)
}

export const upsertSingleCharacter = async (roomId: string, characterGuid: string, updQuery: UpdateQuery<ICharacterSchema>): Promise<ICharacterSchema | undefined> => {
    return Character.findOneAndUpdate(
        { roomId: roomId, guid: characterGuid },
        updQuery,
        { new: true, upsert: true, })
        .then((updatedCharacter) => updatedCharacter)
        .catch(() => undefined)
}

export const overwriteRoomCharacters = async (roomId: string, newCharacters: Array<ICharacterSchema>): Promise<Array<ICharacterSchema | undefined>> => {
    if (!roomId || !newCharacters)
        return []

    await deleteAllRoomCharacters(roomId)

    const updatedCharacters = Promise.all(
        newCharacters.map((newCharacter) => upsertSingleCharacter(roomId, newCharacter.guid, { ...newCharacter, roomId: roomId, timestamp: new Date(), }))
    )
    return updatedCharacters
}
