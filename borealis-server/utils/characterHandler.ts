import { UpdateQuery } from 'mongoose'
import IIncCharacter, { IIncCharacterClassLevel, IIncCharacterHitDice } from '../incomingInterfaces/incCharacter.js'
import Character, { ICharacterClassSchema, ICharacterHitDiceSchema, ICharacterSchema } from '../models/character.js'
//https://github.com/TomDoesTech/The-Ultimate-Guide-to-TypeScript-With-Mongoose/
//https://www.youtube.com/watch?v=TbT7eO1fxuI

export const parseIncCharacterToCharacterSchema = (incCharacter: IIncCharacter, roomId: string, timestamp: Date): ICharacterSchema => {
    const parsedCharacterClass = incCharacter.class.map((incClassLevel: IIncCharacterClassLevel) => {
        const characterClassLevel: ICharacterClassSchema = {
            ...incClassLevel,
        }
        return characterClassLevel
    })
    const parsedCharacterHidDice = incCharacter.hitDice.map((incHitDice: IIncCharacterHitDice) => {
        const characterHitDice: ICharacterHitDiceSchema = {
            ...incHitDice,
        }
        return characterHitDice
    })
    return {
        armorclass: incCharacter.armorclass,
        charisma: incCharacter.charisma,
        class: parsedCharacterClass,
        constitution: incCharacter.constitution,
        currHealth: incCharacter.currHealth,
        dexterity: incCharacter.dexterity,
        guid: incCharacter.guid,
        hitDice: parsedCharacterHidDice,
        intelligence: incCharacter.intelligence,
        maxHealth: incCharacter.maxHealth,
        name: incCharacter.name,
        passivePerception: incCharacter.passivePerception,
        proficiency: incCharacter.proficiency,
        roomId: roomId,
        strength: incCharacter.strength,
        tempHealth: incCharacter.tempHealth,
        timestamp: timestamp.getMilliseconds(),
        username: incCharacter.username,
        wisdom: incCharacter.wisdom,
    }
}

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

export const getRoomCharacters = async (roomId: string, characterGuid?: string): Promise<Array<ICharacterSchema>> => {
    const queryParameters = ((characterGuid !== undefined) && (characterGuid !== '')) ? { 'roomId': roomId, 'guid': characterGuid, } : { 'roomId': roomId, }
    return Character.find(queryParameters)
        .then((characters) => characters)
        .catch(() => [])
}
