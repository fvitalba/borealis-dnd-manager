import mongoose from 'mongoose'

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then((result) => { })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const characterSchema = new mongoose.Schema({
    roomName: String,
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
    level: Number,
    class: String,
    maxNoOfHitDice: Number,
    currNoOfHitDice: Number,
    hitDiceType: Number,
    timestamp: Number,
    username: String,
})

export default mongoose.model('Character', characterSchema, 'room-character')
