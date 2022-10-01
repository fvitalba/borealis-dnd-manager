import React from 'react'
import { CharacterStatsRowProps } from './types'

const CharacterStatsRow = ({ children, reverseDirection }: CharacterStatsRowProps) => {
    const directionClass = reverseDirection ? 'flex-row-reverse' : 'flex-row'
    return (<div className={ `${directionClass} borealis-character-stats-row` }>
        { children }
    </div>)
}

export default CharacterStatsRow
