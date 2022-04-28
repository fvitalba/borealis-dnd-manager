import React, { Ref } from 'react'
import DiceType, { DiceTypeArray } from '../enums/DiceType'
import Button from './Button'

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
        <div className='dice-roll-button-container'>
            { showSelector
                ? <div className='dice-roll-selector-container' style={ selectorPosition } ref={ selectorRef }>
                    {
                        DiceTypeArray.map((diceType) =>
                            <Button key={ diceType } title={ DiceType[diceType] } value={ <b>{ diceType }</b> } onClick={ () => rollDice(diceType) } customClass='dice-roll-button'></Button>
                        )
                    }
                </div>
                : null
            }
            <Button title='Roll dice' value={ <b>/D</b> } onClick={ toggleSelector } ref={ rollDiceButtonRef } />
        </div>
    )
}

export default DiceRollButtonView
