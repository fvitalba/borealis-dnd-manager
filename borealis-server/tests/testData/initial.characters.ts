import { ICharacterClassSchema, ICharacterHitDiceSchema, ICharacterSchema } from '../../models/character'
import { randomUUID } from 'crypto'
import { initialRooms } from './initial.rooms'
import { initialUsersForAuthentication } from './initial.users'
import IIncCharacter, { IIncCharacterClassLevel, IIncCharacterHitDice } from '../../incomingInterfaces/incCharacter'

const initialCharacterClasses: Array<Array<ICharacterClassSchema>> = [
    [
        {
            class: 0,
            level: 5,
        },
    ],
    [
        {
            class: 1,
            level: 3,
        },
        {
            class: 6,
            level: 2,
        },
    ],
    [
        {
            class: 7,
            level: 1,
        },
        {
            class: 2,
            level: 4,
        },
    ],
]

const initialCharacterHitDice: Array<Array<ICharacterHitDiceSchema>> = [
    [
        {
            hitDiceType: 12,
            numberOfDice: 3,
            remainingNoOfDice: 3,
        },
    ],
    [
        {
            hitDiceType: 8,
            numberOfDice: 4,
            remainingNoOfDice: 2,
        },
    ],
    [
        {
            hitDiceType: 4,
            numberOfDice: 1,
            remainingNoOfDice: 0,
        },
        {
            hitDiceType: 10,
            numberOfDice: 4,
            remainingNoOfDice: 0,
        }
    ],
]

export const initialCharacters: Array<ICharacterSchema> = [
    {
        guid: randomUUID(),
        name: 'Test Character (1)',
        armorclass: 10,
        charisma: 10,
        class: initialCharacterClasses[0],
        constitution: 10,
        currHealth: 10,
        dexterity: 10,
        hitDice: initialCharacterHitDice[0],
        intelligence: 10,
        maxHealth: 10,
        passivePerception: 10,
        proficiency: 3,
        roomId: initialRooms[1].roomId,
        strength: 10,
        tempHealth: 0,
        timestamp: (new Date()).getMilliseconds(),
        username: initialUsersForAuthentication[2].name,
        wisdom: 10,
    },
    {
        guid: randomUUID(),
        name: 'Test Character (2)',
        armorclass: 10,
        charisma: 10,
        class: initialCharacterClasses[1],
        constitution: 10,
        currHealth: 10,
        dexterity: 10,
        hitDice: initialCharacterHitDice[1],
        intelligence: 10,
        maxHealth: 10,
        passivePerception: 10,
        proficiency: 10,
        roomId: initialRooms[1].roomId,
        strength: 3,
        tempHealth: 0,
        timestamp: (new Date()).getMilliseconds(),
        username: initialUsersForAuthentication[3].name,
        wisdom: 10,
    },
    {
        guid: randomUUID(),
        name: 'Test Character (3)',
        armorclass: 10,
        charisma: 10,
        class: initialCharacterClasses[2],
        constitution: 10,
        currHealth: 10,
        dexterity: 10,
        hitDice: initialCharacterHitDice[2],
        intelligence: 10,
        maxHealth: 10,
        passivePerception: 10,
        proficiency: 2,
        roomId: initialRooms[2].roomId,
        strength: 10,
        tempHealth: 0,
        timestamp: (new Date()).getMilliseconds(),
        username: initialUsersForAuthentication[3].name,
        wisdom: 10,
    }
]

const newCharacterClass: Array<IIncCharacterClassLevel> = [
    {
        class: 5,
        level: 3,
    },
    {
        class: 3,
        level: 2,
    },
]

const newCharacterHitDice: Array<IIncCharacterHitDice> = [
    {
        hitDiceType: 8,
        numberOfDice: 3,
        remainingNoOfDice: 3,
    },
    {
        hitDiceType: 10,
        numberOfDice: 2,
        remainingNoOfDice: 0,
    },
]

export const newCharacter: IIncCharacter = {
    guid: randomUUID(),
    name: 'New Character',
    armorclass: 12,
    charisma: 10,
    class: newCharacterClass,
    hitDice: newCharacterHitDice,
    constitution: 10,
    currHealth: 20,
    dexterity: 10,
    intelligence: 10,
    maxHealth: 20,
    passivePerception: 10,
    tempHealth: 0,
    proficiency: 2,
    strength: 10,
    username: initialUsersForAuthentication[3].name,
    wisdom: 10,
}
