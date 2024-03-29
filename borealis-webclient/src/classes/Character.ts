import CharacterAttribute from '../enums/CharacterAttribute'
import CharacterClass, { CharacterClassArray } from '../enums/CharacterClass'
import DiceType, { DiceTypeArray } from '../enums/DiceType'
import { CharacterClassLevelSchema, CharacterHitDiceSchema, CharacterSchema } from '../utils/mongoDbSchemas'

export type ClassTextProperty = 'guid' | 'name' | 'username'
export type ClassNumberProperty = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma' | 'proficiency' | 'armorclass' | 'passivePerception' | 'maxHealth' | 'currHealth' | 'tempHealth'

export class CharacterClassLevel {
    public level: number
    public class: CharacterClass

    public constructor(newLevel: number, newClass: CharacterClass) {
        this.level = newLevel
        this.class = newClass
    }

    static fromDbSchema(dbClassLevel: CharacterClassLevelSchema): CharacterClassLevel {
        return new CharacterClassLevel(dbClassLevel.level, dbClassLevel.class)
    }

    public copy(): CharacterClassLevel {
        const characterClassLevelCopy = new CharacterClassLevel(this.level, this.class)
        return characterClassLevelCopy
    }
}

export type CharacterHitDiceProperty = 'numberOfDice' | 'remainingNoOfDice'

export class CharacterHitDice {
    public numberOfDice: number
    public remainingNoOfDice: number
    public hitDiceType: DiceType

    public constructor(newNumberOfDice: number, newHitDiceType: DiceType, remainingNoOfDice?: number) {
        this.numberOfDice = newNumberOfDice
        this.remainingNoOfDice = remainingNoOfDice ? remainingNoOfDice : this.numberOfDice
        this.hitDiceType = newHitDiceType
    }

    static fromDbSchema(dbHitDice: CharacterHitDiceSchema): CharacterHitDice {
        return new CharacterHitDice(dbHitDice.numberOfDice, dbHitDice.hitDiceType, dbHitDice.remainingNoOfDice)
    }

    public copy(): CharacterHitDice {
        const characterHitDiceCopy = new CharacterHitDice(this.numberOfDice, this.hitDiceType, this.remainingNoOfDice)
        return characterHitDiceCopy
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

    static fromDbSchema(dbCharacter: CharacterSchema): Character {
        const newCharacter = new Character(dbCharacter.guid, dbCharacter.name, dbCharacter.maxHealth, dbCharacter.class.map((charClass) => CharacterClassLevel.fromDbSchema(charClass)), dbCharacter.hitDice.map((charHitDice) => CharacterHitDice.fromDbSchema(charHitDice)), dbCharacter.username)
        newCharacter.currHealth = dbCharacter.currHealth
        newCharacter.strength = dbCharacter.strength
        newCharacter.dexterity = dbCharacter.dexterity
        newCharacter.constitution = dbCharacter.constitution
        newCharacter.intelligence = dbCharacter.intelligence
        newCharacter.wisdom = dbCharacter.wisdom
        newCharacter.charisma = dbCharacter.charisma
        newCharacter.proficiency = dbCharacter.proficiency
        newCharacter.armorclass = dbCharacter.armorclass
        newCharacter.passivePerception = dbCharacter.passivePerception
        newCharacter.tempHealth = dbCharacter.tempHealth
        return newCharacter
    }

    public copy(): Character {
        const characterCopy = new Character(this.guid, this.name, this.maxHealth, this.class.map((charClass) => charClass.copy()), this.hitDice.map((charHitDice) => charHitDice.copy()), this.username)
        characterCopy.currHealth = this.maxHealth
        characterCopy.strength = this.strength
        characterCopy.dexterity = this.dexterity
        characterCopy.constitution = this.constitution
        characterCopy.intelligence = this.intelligence
        characterCopy.wisdom = this.wisdom
        characterCopy.charisma = this.charisma
        characterCopy.proficiency = this.proficiency
        characterCopy.armorclass = this.armorclass
        characterCopy.passivePerception = this.passivePerception
        characterCopy.tempHealth = this.tempHealth
        return characterCopy
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

    public SetNumberAttributeValue(attributeName: ClassNumberProperty, newAttributeValue: number) {
        this[attributeName] = newAttributeValue
    }

    public setAnyClassLevel(newClass: CharacterClass, newLevel: number) {
        const currentClass = this.class.filter((currClass) => currClass.class === newClass)
        const newClassLevel = new CharacterClassLevel(newClass, newLevel)
        let updatedClass = this.class
        if (currentClass.length > 0)
            updatedClass = this.class.map((currentClass) => currentClass.class === newClass ? newClassLevel : currentClass)
        else
            updatedClass = this.class.concat(newClassLevel)
        this.class = updatedClass
    }

    public setSpecificClassLevel(newClass: CharacterClass, newLevel: number, index: number) {
        this.class = this.class.map((classLevel, i) => {
            if (index === i) {
                return new CharacterClassLevel(newLevel, newClass)
            } else {
                return classLevel
            }
        })
    }

    public canAddClass(): boolean {
        const firstAvailableClass = CharacterClassArray.filter((characterClass) => {
            const currCharacterClass = this.class.filter((currCharClass) => currCharClass.class !== characterClass)
            if (currCharacterClass.length === 0)
                return true
            else
                return false
        })
        if (firstAvailableClass.length > 0) {
            return true
        } else {
            return false
        }
    }

    public addNewClass() {
        const firstAvailableClass = CharacterClassArray.filter((characterClass) => {
            const currCharacterClass = this.class.filter((currCharClass) => currCharClass.class !== characterClass)
            if (currCharacterClass.length === 0)
                return true
            else
                return false
        })
        if (firstAvailableClass.length > 0) {
            this.class.push(new CharacterClassLevel(1, firstAvailableClass[0]))
        } else {
            throw new Error('No more classes available for character. All possible classes were assigned.')
        }
    }

    public setSpecificHitDice(noOfDice: number, diceType: DiceType, index: number, remainingNoOfDice?: number) {
        this.hitDice = this.hitDice.map((hitDice, i) => {
            if (index === i) {
                return new CharacterHitDice(noOfDice, diceType, remainingNoOfDice)
            } else {
                return hitDice
            }
        })
    }

    public canAddHitDice(): boolean {
        const firstAvailableDiceType = DiceTypeArray.filter((diceType) => {
            const currCharacterDiceType = this.hitDice.filter((currCharDiceType) => currCharDiceType.hitDiceType !== diceType)
            if (currCharacterDiceType.length === 0)
                return true
            else
                return false
        })
        if (firstAvailableDiceType.length > 0) {
            return true
        } else {
            return false
        }
    }

    public addNewHitDice() {
        const firstAvailableDiceType = DiceTypeArray.filter((diceType) => {
            const currCharacterDiceType = this.hitDice.filter((currCharDiceType) => currCharDiceType.hitDiceType !== diceType)
            if (currCharacterDiceType.length === 0)
                return true
            else
                return false
        })
        if (firstAvailableDiceType.length > 0) {
            this.hitDice.push(new CharacterHitDice(1, firstAvailableDiceType[0]))
        } else {
            throw new Error('No more dice types available for Character. All possible dice types were assigned.')
        }
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
                    return new CharacterHitDice(currHitDice.numberOfDice, currHitDice.hitDiceType, currHitDice.remainingNoOfDice - noOfUsedDice)
                } else {
                    return currHitDice
                }
            }
        )
        return noOfUsedDice
    }

    public getCharacterClassInfo(): string {
        return this.class.map((classLevel: CharacterClassLevel) => `lvl. ${classLevel.level} ${CharacterClass[classLevel.class]}`).join(', ')
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
