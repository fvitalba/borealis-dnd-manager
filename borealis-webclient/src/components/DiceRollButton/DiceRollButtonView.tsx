import React from 'react'
import DiceType, { DiceTypeArray } from '../../enums/DiceType'
import ActionButton from '../../views/GenericViews/ActionButton'
import { BorealisRollDiceIcon } from '../../views/Icons'
import { DiceRollButtonViewProps } from './types'

const DiceRollButtonView = ({ rollDice, selectorPosition, showSelector, toggleSelector, selectorRef, rollDiceButtonRef }: DiceRollButtonViewProps) => {
    return (
        <div className='borealis-dice-roll-button-container'>
            { showSelector
                ? <div className='borealis-dice-roll-selector-container' style={ selectorPosition } ref={ selectorRef }>
                    {
                        DiceTypeArray.map((diceType) =>
                            <ActionButton key={ diceType } title={ DiceType[diceType] } value={ <b>{ DiceType[diceType] }</b> } onClick={ () => rollDice(diceType) } />
                        )
                    }
                </div>
                : null
            }
            <ActionButton title='Roll dice' value={ <BorealisRollDiceIcon /> } onClick={ toggleSelector } ref={ rollDiceButtonRef } />
        </div>
    )
}

export default DiceRollButtonView
