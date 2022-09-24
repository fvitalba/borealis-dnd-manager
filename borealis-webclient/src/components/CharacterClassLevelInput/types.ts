import { ChangeEvent } from 'react'
import Character from '../../classes/Character'
import { CharacterClassLevel } from '../../classes/Character'
import CharacterClass from '../../enums/CharacterClass'

export interface CharacterClassLevelInputProps {
    character: Character,
    setSelectedCharacter: (arg0: Character) => void,
}

export interface CharacterClassLevelInputViewProps {
    characterClass: Array<CharacterClassLevel>,
    availableCharacterClasses: Array<CharacterClass>,
    onSelectCharacterClass: (arg0: ChangeEvent<HTMLSelectElement>, arg1: number) => void,
    setCharacterClassLevel: (arg0: number, arg1: number) => void,
    showAddCharacterClass: boolean,
    addCharacterClass: () => void,
}
