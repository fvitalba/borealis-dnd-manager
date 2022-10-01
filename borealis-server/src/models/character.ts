import mongo from '../utils/mongo.js'

export interface ICharacterClassSchema {
    level: number,
    class: number,
}

export interface ICharacterHitDiceSchema {
    numberOfDice: number,
    remainingNoOfDice: number,
    hitDiceType: number,
}

export interface ICharacterSchema {
    roomId: string,
    guid: string,
    name: string,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    proficiency: number,
    armorclass: number,
    passivePerception: number,
    maxHealth: number,
    currHealth: number,
    tempHealth: number,
    class: Array<ICharacterClassSchema>,
    hitDice: Array<ICharacterHitDiceSchema>,
    username: string,
    timestamp: number,
}

const characterClassSchema = new mongo.Schema<ICharacterClassSchema>({
    level: Number,
    class: Number,
})

const characterHitDiceSchema = new mongo.Schema<ICharacterHitDiceSchema>({
    numberOfDice: Number,
    remainingNoOfDice: Number,
    hitDiceType: Number,
})

const characterSchema = new mongo.Schema<ICharacterSchema>({
    roomId: String,
    guid: String,
    name: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    proficiency: Number,
    armorclass: Number,
    passivePerception: Number,
    maxHealth: Number,
    currHealth: Number,
    tempHealth: Number,
    class: [characterClassSchema],
    hitDice: [characterHitDiceSchema],
    username: String,
    timestamp: Number,
})

export default mongo.model('Character', characterSchema, 'room-character')
