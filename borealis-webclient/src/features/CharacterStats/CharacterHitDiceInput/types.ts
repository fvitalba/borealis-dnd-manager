import { ChangeEvent } from 'react'
import Character, { CharacterHitDice, CharacterHitDiceProperty } from '@/classes/Character'
import DiceType from '@/enums/DiceType'

export interface CharacterHitDiceInputProps {
    character: Character,
    setSelectedCharacter: (arg0: Character) => void,
}

export interface CharacterHitDiceInputViewProps {
    characterHitDice: Array<CharacterHitDice>,
    availableCharacterHitDice: Array<DiceType>,
    onSelectHitDiceType: (arg0: ChangeEvent<HTMLSelectElement>, arg1: number) => void,
    setHitDiceNumber: (arg0: CharacterHitDiceProperty, arg1: number, arg2: number) => void,
    showAddHitDice: boolean,
    addHitDice: () => void,
}
