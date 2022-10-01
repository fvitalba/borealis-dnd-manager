import React, { ChangeEvent } from 'react'
import CharacterClass from '@/enums/CharacterClass'
import { ActionButton } from '@/components/ActionButton'
import { BorealisAddCharacterClassIcon } from '@/views/Icons'
import { CharacterClassLevelInputViewProps } from './types'
import CharacterStatsRow from '../CharacterStatsRow'
import CharacterOptionSelector from '../CharacterOptionSelector'
import CharacterStatsContainer from '../CharacterStatsContainer'
import CharacterNumberInput from '../CharacterNumberInput'

const CharacterClassLevelInputView = ({ characterClass, availableCharacterClasses, onSelectCharacterClass, setCharacterClassLevel, showAddCharacterClass, addCharacterClass }: CharacterClassLevelInputViewProps) => {
    return (
        <CharacterStatsContainer>
            { characterClass.map((classLevel, index) => {
                // We need to filter out all the duplicate Class Lines, to avoid assigning the same class twice
                const availableCharacterClassesForLine = availableCharacterClasses.filter((currClass) => {
                    const filteredCharacterClass = characterClass.filter((currCharacterClass) => currCharacterClass.class === currClass)
                    if (filteredCharacterClass.length > 0)
                        return false
                    else
                        return true
                })
                availableCharacterClassesForLine.push(classLevel.class)
                const classOptions = availableCharacterClassesForLine.map((characterClass) => {
                    return {
                        key: characterClass,
                        value: characterClass,
                        caption: `${CharacterClass[characterClass]}`,
                    }
                })
                const onSelectClass = (e: ChangeEvent<HTMLSelectElement>) => {
                    onSelectCharacterClass(e, index)
                }
                const onLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
                    setCharacterClassLevel(parseInt(e.target.value), index)
                }

                return (
                    <CharacterStatsRow key={ classLevel.class }>
                        <CharacterOptionSelector label='Class' statValue={ classLevel.class } title='Which class' valueOptions={ classOptions } onSelectValue={ onSelectClass } />
                        <CharacterNumberInput label='Level' statValue={ classLevel.level } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onValueChange={ onLevelChange } />
                    </CharacterStatsRow>
                )
            })}
            { showAddCharacterClass
                ? <CharacterStatsRow>
                    <ActionButton title='Add new Class' value={ <BorealisAddCharacterClassIcon /> } onClick={ addCharacterClass } />
                </CharacterStatsRow>
                : null
            }
        </CharacterStatsContainer>
    )
}

export default CharacterClassLevelInputView
