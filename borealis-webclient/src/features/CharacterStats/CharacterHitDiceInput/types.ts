import { ChangeEvent } from 'react'
import Character, { CharacterHitDice, CharacterHitDiceProperty } from '@/classes/Character'
import DiceType from '@/enums/DiceType'

export interface CharacterHitDiceInputProps {
    character: Character,
    setSelectedCharacter: (character: Character) => void,
}

export interface CharacterHitDiceInputViewProps {
    characterHitDice: Array<CharacterHitDice>,
    availableCharacterHitDice: Array<DiceType>,
    onSelectHitDiceType: (event: ChangeEvent<HTMLSelectElement>, index: number) => void,
    setHitDiceNumber: (characterHitDiceProperty: CharacterHitDiceProperty, noOfDice: number, index: number) => void,
    showAddHitDice: boolean,
    addHitDice: () => void,
}
