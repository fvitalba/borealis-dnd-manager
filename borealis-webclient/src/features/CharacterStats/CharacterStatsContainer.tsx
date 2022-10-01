import React from 'react'
import { CharacterStatsContainerProps } from './types'

const CharacterStatsContainer = ({ children }: CharacterStatsContainerProps) => {
    return (<div className='borealis-character-stats-container'>
        { children }
    </div>)
}

export default CharacterStatsContainer
