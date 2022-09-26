import { ChangeEvent } from 'react'
import Character, { ClassNumberProperty } from '../../classes/Character'
import User from '../../classes/User'
import { CharacterState } from '../../reducers/characterReducer'
import { UserState } from '../../reducers/userReducer'
import { MetadataState } from '../../reducers/metadataReducer'

export interface CharacterStatsProps {
    toggleOnCharacterStats: boolean,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
    updateCharacter: (arg0: Character) => void,
    deleteCharacter: (arg0: string) => void,
}

export interface Modifiers {
    strength: string,
    dexterity: string,
    constitution: string,
    intelligence: string,
    wisdom: string,
    charisma: string,
}

export interface CharacterStatsViewProps {
    showCharacterStats: boolean,
    isHost: boolean,
    character: Character,
    setSelectedCharacter: (arg0: Character) => void,
    users: Array<User>,
    modifiers: Modifiers,
    characterName: string,
    setCharacterName: (arg0: string) => void,
    onStatChange: (arg0: ClassNumberProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
    onSelectUser: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    saveCharacter: () => void,
    deleteCharacter: () => void,
}
