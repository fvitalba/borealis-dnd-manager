export interface IIncCharacterClassLevel {
    level: number,
    class: number,
}

export interface IIncCharacterHitDice {
    numberOfDice: number,
    remainingNoOfDice: number,
    hitDiceType: number,
}

interface IIncCharacter {
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
    class: Array<IIncCharacterClassLevel>,
    hitDice: Array<IIncCharacterHitDice>,
    username: string,
}

export default IIncCharacter
