import { ChangeEvent } from 'react'
import Character, { ClassNumberProperty } from '@/classes/Character'
import User from '@/classes/User'
import { CharacterState } from '@/reducers/characterReducer'
import { UserState } from '@/reducers/userReducer'
import { MetadataState } from '@/reducers/metadataReducer'

export interface CharacterStatsProps {
    toggleOnCharacterStats: boolean,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
    updateCharacter: (character: Character) => void,
    deleteCharacter: (characterGuid: string) => void,
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
    setSelectedCharacter: (character: Character) => void,
    users: Array<User>,
    modifiers: Modifiers,
    characterName: string,
    setCharacterName: (characterName: string) => void,
    onStatChange: (attributeName: ClassNumberProperty, event: ChangeEvent<HTMLInputElement>) => void,
    onSelectUser: (event: ChangeEvent<HTMLSelectElement>) => void,
    saveCharacter: () => void,
    deleteCharacter: () => void,
}
