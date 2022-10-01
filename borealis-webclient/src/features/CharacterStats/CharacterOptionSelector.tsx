import { OptionSelector } from '@/components/OptionSelector'
import React from 'react'
import { CharacterOptionSelctorProps } from './types'

const CharacterOptionSelector = ({ statValue, valueOptions, onSelectValue, title, label }: CharacterOptionSelctorProps) => {
    return (
        <div className='borealis-character-stat-input-container'>
            <label className='borealis-character-stats-label'>{ label }</label>
            <OptionSelector value={ statValue } options={ valueOptions } onChange={ onSelectValue } title={ title } />
        </div>
    )
}

export default CharacterOptionSelector
