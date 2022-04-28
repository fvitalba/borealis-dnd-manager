import React, { ChangeEvent } from 'react'
import Character, { CharacterHitDiceProperty } from '../classes/Character'
import DiceType, { DiceTypeArray } from '../enums/DiceType'
import CharacterHitDiceInputView from '../views/CharacterStats/CharacterHitDiceInputView'

interface CharacterHitDiceInputProps {
    character: Character,
    setSelectedCharacter: (arg0: Character) => void,
}

const CharacterHitDiceInput = ({ character, setSelectedCharacter }: CharacterHitDiceInputProps) => {
    const onSelectHitDiceType = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const newDiceType = DiceType[e.target.value as keyof typeof DiceType]
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
