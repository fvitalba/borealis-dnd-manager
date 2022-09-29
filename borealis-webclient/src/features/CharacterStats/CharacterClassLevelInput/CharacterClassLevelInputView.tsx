import React from 'react'
import CharacterClass from '@/enums/CharacterClass'
import { ActionButton } from '@/components/ActionButton'
import { BorealisAddCharacterClassIcon } from '@/views/Icons'
import { CharacterClassLevelInputViewProps } from './types'

const CharacterClassLevelInputView = ({ characterClass, availableCharacterClasses, onSelectCharacterClass, setCharacterClassLevel, showAddCharacterClass, addCharacterClass }: CharacterClassLevelInputViewProps) => {
    return (
        <div className='character-stats-view-row'>
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

                return (
                    <div key={ classLevel.class } className='character-stats-view-row'>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Class</label>
                            <select value={ classLevel.class } onChange={ (e) => onSelectCharacterClass(e, index) } title='which class' className='character-stats-input'>
                                { availableCharacterClassesForLine.map((characterClass) => (
                                    <option key={ characterClass } value={ characterClass } >{ CharacterClass[characterClass] }</option>
                                ))}
                            </select>
                        </div>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Level</label>
                            <input value={ classLevel.level } placeholder='Level' onChange={ (e) => setCharacterClassLevel(parseInt(e.target.value), index) } type='number' min='0' max='20' step='1' title='level' className='w-12 character-stats-input' />
                        </div>
                    </div>
                )
            })}
            { showAddCharacterClass
                ? <div className='select-character-input-container'>
                    <ActionButton title='Add new Class' value={ <BorealisAddCharacterClassIcon /> } onClick={ addCharacterClass } />
                </div>
                : null
            }
        </div>
    )
}

export default CharacterClassLevelInputView
