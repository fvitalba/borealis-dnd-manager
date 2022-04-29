import React, { ChangeEvent } from 'react'
import { CharacterClassLevel } from '../../classes/Character'
import CharacterClass from '../../enums/CharacterClass'
import Button from '../Button'
import { PlusSquareSolidIcon } from '../Icons'

interface CharacterClassLevelInputViewProps {
    characterClass: Array<CharacterClassLevel>,
    availableCharacterClasses: Array<CharacterClass>,
    onSelectCharacterClass: (arg0: ChangeEvent<HTMLSelectElement>, arg1: number) => void,
    setCharacterClassLevel: (arg0: number, arg1: number) => void,
    showAddCharacterClass: boolean,
    addCharacterClass: () => void,
}

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
                    <Button title='Add new Class' value={ <PlusSquareSolidIcon /> } onClick={ addCharacterClass } />
                </div>
                : null
            }
        </div>
    )
}

export default CharacterClassLevelInputView
