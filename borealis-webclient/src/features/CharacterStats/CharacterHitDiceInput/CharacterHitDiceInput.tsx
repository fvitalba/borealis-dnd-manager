import React, { ChangeEvent } from 'react'
import { CharacterHitDiceProperty } from '../../../classes/Character'
import { DiceTypeArray } from '../../../enums/DiceType'
import CharacterHitDiceInputView from './CharacterHitDiceInputView'
import { CharacterHitDiceInputProps } from './types'

const CharacterHitDiceInput = ({ character, setSelectedCharacter }: CharacterHitDiceInputProps) => {
    const onSelectHitDiceType = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const newDiceType = parseInt(e.target.value)
        const newCharacter = character.copy()
        newCharacter.setSpecificHitDice(newCharacter.hitDice[index].numberOfDice, newDiceType, index, newCharacter.hitDice[index].remainingNoOfDice)
        setSelectedCharacter(newCharacter)
    }

    const setHitDiceNumber = (characterHitDiceProperty: CharacterHitDiceProperty, noOfDice: number, index: number) => {
        const newHitDice = character.hitDice[index]
        newHitDice[characterHitDiceProperty] = noOfDice
        const newCharacter = character.copy()
        newCharacter.setSpecificHitDice(newHitDice.numberOfDice, newHitDice.hitDiceType, index, newHitDice.remainingNoOfDice)
        setSelectedCharacter(newCharacter)
    }

    const addHitDice = () => {
        const newCharacter = character.copy()
        newCharacter.addNewHitDice()
        setSelectedCharacter(newCharacter)
    }

    const showAddHitDice = character.canAddHitDice()

    return (
        <CharacterHitDiceInputView
            characterHitDice={ character.hitDice }
            availableCharacterHitDice={ DiceTypeArray }
            onSelectHitDiceType={ onSelectHitDiceType }
            setHitDiceNumber={ setHitDiceNumber }
            showAddHitDice={ showAddHitDice }
            addHitDice={ addHitDice }
        />
    )
}

export default CharacterHitDiceInput
