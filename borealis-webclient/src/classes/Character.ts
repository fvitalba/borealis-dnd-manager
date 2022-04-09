import DiceType from '../enums/DiceType'
import CharacterClass from '../enums/CharacterClass'
import CharacterAttribute from '../enums/CharacterAttribute'

export class CharacterClassLevel {
    public level: number
    public class: CharacterClass

    public constructor(newLevel: number, newClass: CharacterClass) {
        this.level = newLevel
        this.class = newClass
    }
}

export class CharacterHitDice {
    public numberOfDice: number
    public remainingNoOfDice: number
    public hitDiceType: DiceType

    public constructor(newNumberOfDice: number, newHitDiceType: DiceType) {
        this.numberOfDice = newNumberOfDice
        this.remainingNoOfDice = this.numberOfDice
        this.hitDiceType = newHitDiceType
    }
}

class Character {
    public guid: string
    public name: string
    public strength: number
    public dexterity: number
    public constitution: number
    public intelligence: number
    public wisdom: number
    public charisma: number
    public proficiency: number
    public armorclass: number
    public passivePerception: number
    public maxHealth: number
    public currHealth: number
    public tempHealth: number
    public class: Array<CharacterClassLevel>
    public hitDice: Array<CharacterHitDice>
    public username: string

    public constructor(newGuid: string, newName: string, newMaxHealth: number, newClassLevel?: Array<CharacterClassLevel>, newHitDice?: Array<CharacterHitDice>, newUsername?: string) {
        this.guid = newGuid
        this.name = newName
        this.class = newClassLevel ? newClassLevel : new Array<CharacterClassLevel>()
        this.hitDice = newHitDice ? newHitDice : new Array<CharacterHitDice>()
        this.maxHealth = newMaxHealth
        this.currHealth = this.maxHealth
        this.strength = 10
        this.dexterity = 10
        this.constitution = 10
        this.intelligence = 10
        this.wisdom = 10
        this.charisma = 10
        this.proficiency = 2
        this.armorclass = 10
        this.passivePerception = 10
        this.tempHealth = 0
        this.username = newUsername ? newUsername : ''
    }

    public getModifier(attribute: CharacterAttribute): number {
        switch(attribute) {
            case CharacterAttribute.Strength:
                return modifierFromStat(this.strength)
            case CharacterAttribute.Dexterity:
                return modifierFromStat(this.dexterity)
            case CharacterAttribute.Constitution:
                return modifierFromStat(this.constitution)
            case CharacterAttribute.Intelligence:
                return modifierFromStat(this.intelligence)
            case CharacterAttribute.Wisdom:
                return modifierFromStat(this.wisdom)
            case CharacterAttribute.Charisma:
                return modifierFromStat(this.charisma)
        }
    }

    public getModifierFromString(attributeText: string): number {
        switch (attributeText.toUpperCase()) {
        case 'STR':
        case 'STRENGTH':
            return this.getModifier(CharacterAttribute.Strength)
        case 'DEX':
        case 'DEXTERITY':
            return this.getModifier(CharacterAttribute.Dexterity)
        case 'CON':
        case 'CONSTITUTION':
            return this.getModifier(CharacterAttribute.Constitution)
        case 'INT':
        case 'INTELLIGENCE':
            return this.getModifier(CharacterAttribute.Intelligence)
        case 'WIS':
        case 'WISDOM':
            return this.getModifier(CharacterAttribute.Wisdom)
        case 'CHA':
        case 'CHARISMA':
            return this.getModifier(CharacterAttribute.Charisma)
        default:
            return -20
        }
    }

    public useHitDice(noOfDiceToUse: number, diceTypeToUse?: DiceType): number {
        const diceTypeToReduce = diceTypeToUse ? diceTypeToUse : findFirstAvailableDiceType(this.hitDice)
        let noOfUsedDice: number = 0
        this.hitDice = this.hitDice.map(
            (currHitDice: CharacterHitDice) => {
                if (currHitDice.hitDiceType === diceTypeToReduce) {
                    if (currHitDice.remainingNoOfDice < noOfDiceToUse)
                        noOfUsedDice = currHitDice.remainingNoOfDice
                    else
                        noOfDiceToUse = noOfDiceToUse
                    return {
                        ...currHitDice,
                        remainingNoOfDice: currHitDice.remainingNoOfDice - noOfUsedDice
                    }
                } else {
                    return currHitDice
                }
            }
        )
        return noOfUsedDice
    }

    public getCharacterClassInfo(): string {
        return this.class.map((classLevel: CharacterClassLevel) => `lvl. ${classLevel.level} ${classLevel.class}`).join(', ')
    }
}

const findFirstAvailableDiceType = (characterHitDice: Array<CharacterHitDice>): DiceType => {
    characterHitDice.filter((currCharHitDice: CharacterHitDice) => (currCharHitDice.remainingNoOfDice > 0))
    if (characterHitDice.length > 0)
        return characterHitDice[0].hitDiceType
    else
        return characterHitDice[0].hitDiceType
}

const modifierFromStat = (statValue: number): number => {
    return Math.floor((statValue - 10) / 2)
}

export default Character
