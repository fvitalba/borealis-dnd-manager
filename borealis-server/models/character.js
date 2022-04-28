import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const characterClassSchema = new mongoose.Schema({
    level: Number,
    class: Number,
})

const characterHitDiceSchema = new mongoose.Schema({
    numberOfDice: Number,
    remainingNoOfDice: Number,
    hitDiceType: Number,
})

const characterSchema = new mongoose.Schema({
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
