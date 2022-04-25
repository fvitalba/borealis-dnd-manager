import { CharacterClassLevel, CharacterHitDice } from '../classes/Character'
import Path from '../classes/Path'
import MessageType from '../enums/MessageType'
import TokenCondition from '../enums/TokenCondition'
import TokenSize from '../enums/TokenSize'
import TokenType from '../enums/TokenType'
import UserType from '../enums/UserType'

export interface CharacterSchema {
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
    class: Array<CharacterClassLevel>,
    hitDice: Array<CharacterHitDice>,
    username: string,
    timestamp: number,
}

export interface ChatMessageSchema {
    guid: string,
    type: MessageType,
    username: string,
    targetUsername: string,
    playerInfo: string,
    publicMessage: string,
    privateMessage: string,
    timestamp: number,
    read: boolean,
}

export interface MapSchema {
    roomId: string,
    name: string,
    id: number,
    backgroundUrl: string,
    x: number,
    y: number,
    width: number,
    height: number,
    drawPaths: Array<Path>,
    fogPaths: Array<Path>,
    timestamp: number,
}

export interface GameSchema {
    roomId: string,
    roomName: string,
    currentMapId: number,
    version: number,
    width: number,
    height: number,
    fogEnabled: boolean,
    tokenSelected: boolean,
    timestamp: number,
}

export interface RoomSchema extends GameSchema {
    roomName: string,
    userRole: UserType,
}

export interface TokenSchema {
    roomId: string,
    guid: string,
    name: string,
    imageUrl: string,
    mapId: number,
    x: number,
    y: number,
    condition: TokenCondition,
    type: TokenType,
    size: TokenSize,
    width: number,
    height: number,
    selected: boolean,
    hidden: boolean,
    showLabel: boolean,
    x0: number,
    y0: number,
    timestamp: number,
}

export interface UserSchema {
    guid: string,
    name: string,
    email: string,
    guest: boolean,
    lastOnline: number,
    active: boolean,
}

export interface RoomUserSchema {
    roomId: string,
    guid: string,
    name: string,
    type: UserType,
    assignedCharacterGuid: string,
    lastOnline: number,
    active: boolean,
}
