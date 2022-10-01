import { ChangeEvent } from 'react'
import Character from '@/classes/Character'
import { CharacterClassLevel } from '@/classes/Character'
import CharacterClass from '@/enums/CharacterClass'

export interface CharacterClassLevelInputProps {
    character: Character,
    setSelectedCharacter: (character: Character) => void,
}

export interface CharacterClassLevelInputViewProps {
    characterClass: Array<CharacterClassLevel>,
    availableCharacterClasses: Array<CharacterClass>,
    onSelectCharacterClass: (event: ChangeEvent<HTMLSelectElement>, index: number) => void,
    setCharacterClassLevel: (classLevel: number, index: number) => void,
    showAddCharacterClass: boolean,
    addCharacterClass: () => void,
}
