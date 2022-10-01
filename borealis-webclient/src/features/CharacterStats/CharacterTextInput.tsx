import React from 'react'
import { CharacterTextInputProps } from './types'

const CharacterTextInput = ({ statFullname, statValue, onStatChange, label, placeholder }: CharacterTextInputProps) => {
    return (
        <div className='borealis-character-stat-input-container'>
            <label className='borealis-character-stats-label'>{ label ? label : statFullname }</label>
            <input title={ statFullname } placeholder={ placeholder ? placeholder : statFullname } value={ statValue } onChange={ (e) => onStatChange(e.target.value) } className='borealis-character-stats-text-input' />
        </div>
    )
}

export default CharacterTextInput
