import React, { Ref } from 'react'
import DiceType, { DiceTypeArray } from '../enums/DiceType'
import ActionButton from './GenericViews/ActionButton'
import { BorealisRollDiceIcon } from './Icons'

interface SelectorPosition {
    top: number,
    left: number,
}

interface DiceRollButtonViewProps {
    rollDice: (arg0: DiceType) => void,
    selectorPosition: SelectorPosition,
    showSelector: boolean,
    toggleSelector: () => void,
    selectorRef: Ref<HTMLDivElement>,
    rollDiceButtonRef: Ref<HTMLButtonElement>,
}

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
