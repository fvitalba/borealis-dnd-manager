import { ChangeEvent, ReactNode } from 'react'
import Character, { ClassNumberProperty, ClassTextProperty } from '@/classes/Character'
import User from '@/classes/User'
import { CharacterState } from '@/reducers/characterReducer'
import { UserState } from '@/reducers/userReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { SelectionOption } from '@/components/OptionSelector/types'

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

export interface CharacterStatsContainerProps {
    children: ReactNode,
}

export interface CharacterStatsRowProps {
    children: ReactNode,
    reverseDirection?: boolean,
}

export interface CharacterMainStatInputProps {
    statFullname: ClassNumberProperty,
    statAbbreviation: string,
    statValue: number,
    statModifier: string,
    onStatChange: (attributeName: ClassNumberProperty, event: ChangeEvent<HTMLInputElement>) => void,
}

export interface CharacterTextInputProps {
    statFullname: ClassTextProperty,
    statValue: string,
    onStatChange: (newValue: string) => void,
    label?: string,
    placeholder?: string,
}

export interface CharacterNumberInputProps {
    statValue: number,
    minValue: number,
    maxValue: number,
    valueStep: number,
    statFullname?: ClassNumberProperty,
    onStatChange?: (attributeName: ClassNumberProperty, event: ChangeEvent<HTMLInputElement>) => void,
    onValueChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    placeholder?: string,
}

export interface CharacterOptionSelctorProps {
    label: string,
    statValue: string | number,
    valueOptions: Array<SelectionOption>,
    onSelectValue: (event: ChangeEvent<HTMLSelectElement>) => void,
    title: string,
}
