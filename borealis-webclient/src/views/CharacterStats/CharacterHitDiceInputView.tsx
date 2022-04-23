import React, { ChangeEvent } from 'react'
import { CharacterHitDice, CharacterHitDiceProperty } from '../../classes/Character'
import DiceType from '../../enums/DiceType'
import Button from '../Button'
import { PlusSquareSolidIcon } from '../Icons'

interface CharacterHitDiceInputViewProps {
    characterHitDice: Array<CharacterHitDice>,
    availableCharacterHitDice: Array<DiceType>,
    onSelectHitDiceType: (arg0: ChangeEvent<HTMLSelectElement>, arg1: number) => void,
    setHitDiceNumber: (arg0: CharacterHitDiceProperty, arg1: number, arg2: number) => void,
    showAddHitDice: boolean,
    addHitDice: () => void,
}

const CharacterHitDiceInputView = ({ characterHitDice, availableCharacterHitDice, onSelectHitDiceType, setHitDiceNumber, addHitDice }: CharacterHitDiceInputViewProps) => {
    return (
        <div className='character-stats-view-row'>
            { characterHitDice.map((charHitDice, index) => {
                // We need to filter out all the duplicate Dice Types, to avoid assigning the same type twice
                const availableCharacterDiceTypesForLine = availableCharacterHitDice.filter((currDiceType) => {
                    const filteredCharacterDiceTypes = characterHitDice.filter((currCharacterHitDice) => currCharacterHitDice.hitDiceType === currDiceType)
                    if (filteredCharacterDiceTypes.length > 0)
                        return false
                    else
                        return true
                })
                availableCharacterDiceTypesForLine.push(charHitDice.hitDiceType)

                return (
                    <div key={ charHitDice.hitDiceType } className='character-stats-view-row'>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Class</label>
                            <select value={ charHitDice.hitDiceType } onChange={ (e) => onSelectHitDiceType(e, index) } title='which hit dice type' className='character-stats-input'>
                                { availableCharacterDiceTypesForLine.map((characterDiceType) => (
                                    <option key={ characterDiceType } value={ characterDiceType } >{ characterDiceType }</option>
                                ))}
                            </select>
                        </div>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Max. Hit Dice</label>
                            <input value={ charHitDice.numberOfDice } placeholder='Maximum Hit Dice' onChange={ (e) => setHitDiceNumber('numberOfDice', parseInt(e.target.value), index) } type='number' min='0' max='20' step='1' title='maxNoOfHitDice' className='w-12 character-stats-input' />
                        </div>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Remaining Hit Dice</label>
                            <input value={ charHitDice.remainingNoOfDice } placeholder='Remaining Hit Dice' onChange={ (e) => setHitDiceNumber('remainingNoOfDice', parseInt(e.target.value), index) } type='number' min='0' max='20' step='1' title='currNoOfHitDice' className='w-12 character-stats-input' />
                        </div>
                    </div>
                )
            })}
            <div className='select-character-input-container'>
                <Button title='Add new Hit Dice' value={ <PlusSquareSolidIcon /> } onClick={ addHitDice } />
            </div>
        </div>
    )
}

export default CharacterHitDiceInputView