import React from 'react'
import { CharacterStatInputProps } from './types'

const CharacterStatInput = ({ statFullname, statAbbreviation, statValue, statModifier, onStatChange }: CharacterStatInputProps) => {
    return (
        <div className='borealis-character-stat-input-container'>
            <label className='borealis-character-stats-label'>{ statAbbreviation }</label>
            <input value={ statValue } placeholder={ statFullname } onChange={ (e) => onStatChange(statFullname, e) } type='number' min='0' max='20' step='1' title={ statFullname } className='w-12 borealis-character-main-stats-input' />
            <label className='borealis-character-stats-modifier-label'>{ statModifier }</label>
        </div>
    )
}

export default CharacterStatInput
