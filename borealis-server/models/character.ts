import mongoose from 'mongoose'

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

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''
mongoose.connect(url)
    .then()
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const characterClassSchema = new mongoose.Schema<ICharacterClassSchema>({
    level: Number,
    class: Number,
})

const characterHitDiceSchema = new mongoose.Schema<ICharacterHitDiceSchema>({
    numberOfDice: Number,
    remainingNoOfDice: Number,
    hitDiceType: Number,
})

const characterSchema = new mongoose.Schema<ICharacterSchema>({
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

export default mongoose.model('Character', characterSchema, 'room-character')
