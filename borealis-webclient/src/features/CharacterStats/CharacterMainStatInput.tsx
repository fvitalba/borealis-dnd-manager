import React from 'react'
import { CharacterMainStatInputProps } from './types'

const CharacterMainStatInput = ({ statFullname, statAbbreviation, statValue, statModifier, onStatChange }: CharacterMainStatInputProps) => {
    return (
        <div className='borealis-character-stat-input-container'>
            <label className='borealis-character-stats-label'>{ statAbbreviation }</label>
            <input value={ statValue } placeholder='0' onChange={ (e) => onStatChange(statFullname, e) } type='number' min='0' max='20' step='1' title={ statFullname } className='w-12 borealis-character-main-stats-input' />
            <label className='borealis-character-stats-modifier-label'>{ statModifier }</label>
        </div>
    )
}

export default CharacterMainStatInput
