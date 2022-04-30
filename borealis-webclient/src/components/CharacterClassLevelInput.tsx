import React, { ChangeEvent } from 'react'
import Character from '../classes/Character'
import { CharacterClassArray } from '../enums/CharacterClass'
import CharacterClassLevelInputView from '../views/CharacterStats/CharacterClassLevelInputView'

interface CharacterClassLevelInputProps {
    character: Character,
    setSelectedCharacter: (arg0: Character) => void,
}

const CharacterClassLevelInput = ({ character, setSelectedCharacter }: CharacterClassLevelInputProps) => {
    const onSelectCharacterClass = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const newClass = parseInt(e.target.value)
        const newCharacter = character.copy()
        newCharacter.setSpecificClassLevel(newClass, newCharacter.class[index].level, index)
        setSelectedCharacter(newCharacter)
    }

    const setCharacterClassLevel = (level: number, index: number) => {
        const newCharacter = character.copy()
        newCharacter.setSpecificClassLevel(newCharacter.class[index].class, level, index)
        setSelectedCharacter(newCharacter)
    }

    const addCharacterClass = () => {
        const newCharacter = character.copy()
        newCharacter.addNewClass()
        setSelectedCharacter(newCharacter)
    }

    const showAddCharacterClass = character.canAddClass()

    return (
        <CharacterClassLevelInputView
            characterClass={ character.class }
            availableCharacterClasses={ CharacterClassArray }
            onSelectCharacterClass={ onSelectCharacterClass }
            setCharacterClassLevel={ setCharacterClassLevel }
            showAddCharacterClass={ showAddCharacterClass }
            addCharacterClass={ addCharacterClass }
        />
    )
}

export default CharacterClassLevelInput
