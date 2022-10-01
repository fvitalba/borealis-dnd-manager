import React, { ChangeEvent } from 'react'
import DiceType from '@/enums/DiceType'
import { ActionButton } from '@/components/ActionButton'
import { BorealisAddCharacterHitDiceIcon } from '@/views/Icons'
import { CharacterHitDiceInputViewProps } from './types'
import CharacterStatsRow from '../CharacterStatsRow'
import CharacterOptionSelector from '../CharacterOptionSelector'
import CharacterStatsContainer from '../CharacterStatsContainer'
import CharacterNumberInput from '../CharacterNumberInput'

const CharacterHitDiceInputView = ({ characterHitDice, availableCharacterHitDice, onSelectHitDiceType, setHitDiceNumber, addHitDice }: CharacterHitDiceInputViewProps) => {
    return (
        <CharacterStatsContainer>
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
                const diceOptions = availableCharacterDiceTypesForLine.map((characterDiceType) => {
                    return {
                        key: characterDiceType,
                        value: characterDiceType,
                        caption: `${DiceType[characterDiceType]}`,
                    }
                })
                const onSelectDiceType = (e: ChangeEvent<HTMLSelectElement>) => {
                    onSelectHitDiceType(e, index)
                }
                const onNoOfDiceChange = (e: ChangeEvent<HTMLInputElement>) => {
                    setHitDiceNumber('numberOfDice', parseInt(e.target.value), index)
                }
                const onRemNoOfDiceChange = (e: ChangeEvent<HTMLInputElement>) => {
                    setHitDiceNumber('remainingNoOfDice', parseInt(e.target.value), index)
                }

                return (
                    <CharacterStatsRow key={ charHitDice.hitDiceType } >
                        <CharacterOptionSelector label='Dice Type' statValue={ charHitDice.hitDiceType } title='Which dice type' valueOptions={ diceOptions } onSelectValue={ onSelectDiceType } />
                        <CharacterNumberInput label='Max. Hit Dice' statValue={ charHitDice.numberOfDice } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onValueChange={ onNoOfDiceChange } />
                        <CharacterNumberInput label='Rem. Hit Dice' statValue={ charHitDice.remainingNoOfDice } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onValueChange={ onRemNoOfDiceChange } />
                    </CharacterStatsRow>
                )
            })}
            <CharacterStatsRow>
                <ActionButton title='Add new Hit Dice' value={ <BorealisAddCharacterHitDiceIcon /> } onClick={ addHitDice } />
            </CharacterStatsRow>
        </CharacterStatsContainer>
    )
}

export default CharacterHitDiceInputView
