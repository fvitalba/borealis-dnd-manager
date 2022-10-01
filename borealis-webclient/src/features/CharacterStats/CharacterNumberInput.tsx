import React, { ChangeEvent } from 'react'
import { CharacterNumberInputProps } from './types'

const CharacterNumberInput = ({ statValue, minValue, maxValue, valueStep, statFullname, onStatChange, onValueChange, label, placeholder }: CharacterNumberInputProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (statFullname !== undefined) {
            if (onStatChange) {
                onStatChange(statFullname, e)
            }
        } else {
            if (onValueChange) {
                onValueChange(e)
            }
        }
    }

    return (
        <div className='borealis-character-stat-input-container'>
            <label className='borealis-character-stats-label'>{ label ? label : statFullname }</label>
            <input title={ statFullname } placeholder={ placeholder ? placeholder : statFullname } value={ statValue } onChange={ (e) => onChange(e) } type='number' min={ minValue } max={ maxValue } step={ valueStep } className='w-12 borealis-character-stats-number-input' />
        </div>
    )
}

export default CharacterNumberInput
