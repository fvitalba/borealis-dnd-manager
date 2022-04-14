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

    public isEmpty(): boolean {
        return this.guid === ''
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

    public getFormattedModifier(attribute: CharacterAttribute): string {
        const modifier = this.getModifier(attribute)
        switch(true) {
        case modifier === 0:
            return `${modifier}`
        case modifier > 0:
            return `+${modifier}`
        case modifier < 0:
            return `-${Math.abs(modifier)}`
        default:
            return ''
        }
    }

    //TODO: retrieve attribute by using a type instead of a string
    public SetNumberAttributeValue(attributeName: string, newAttributeValue: number) {
        switch(attributeName.toUpperCase()) {
        case 'MAXHEALTH':
            this.maxHealth = newAttributeValue
            break
        case 'CURRHEALTH':
            this.currHealth = newAttributeValue
            break
        case 'STRENGTH':
            this.strength = newAttributeValue
            break
        case 'DEXTERITY':
            this.dexterity = newAttributeValue
            break
        case 'CONSTITUTION':
            this.constitution = newAttributeValue
            break
        case 'INTELLIGENCE':
            this.intelligence = newAttributeValue
            break
        case 'WISDOM':
            this.wisdom = newAttributeValue
            break
        case 'CHARISMA':
            this.charisma = newAttributeValue
            break
        case 'PROFICIENCY':
            this.proficiency = newAttributeValue
            break
        case 'ARMORCLASS':
            this.armorclass = newAttributeValue
            break
        case 'PASSIVEPERCEPTION':
            this.passivePerception = newAttributeValue
            break
        case 'TEMPHEALTH':
            this.tempHealth = newAttributeValue
            break
        }
    }

    public setClassLevel(newClass: CharacterClass, newLevel: number) {
        const currentClass = this.class.filter((currClass) => currClass.class === newClass)
        const newClassLevel = new CharacterClassLevel(newClass, newLevel)
        let updatedClass = this.class
        if (currentClass.length > 0)
            updatedClass = this.class.map((currentClass) => currentClass.class === newClass ? newClassLevel : currentClass)
        else
            updatedClass = this.class.concat(newClassLevel)
        this.class = updatedClass
    }

    public useHitDice(noOfDiceToUse: number, diceTypeToUse?: DiceType): number {
        const diceTypeToReduce = diceTypeToUse ? diceTypeToUse : findFirstAvailableDiceType(this.hitDice)
        let noOfUsedDice = 0
        this.hitDice = this.hitDice.map(
            (currHitDice: CharacterHitDice) => {
                if (currHitDice.hitDiceType === diceTypeToReduce) {
                    if (currHitDice.remainingNoOfDice < noOfDiceToUse)
                        noOfUsedDice = currHitDice.remainingNoOfDice
                    else
                        noOfUsedDice = noOfDiceToUse
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
