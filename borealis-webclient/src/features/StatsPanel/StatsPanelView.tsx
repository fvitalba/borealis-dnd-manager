import React from 'react'
import { CharacterStatsPanel } from './CharacterStatsPanel'
import { StatsPanelViewProps } from './types'

const StatsPanelView = ({ pageToShow }: StatsPanelViewProps) => {
    const panelToShow = () => {
        switch(pageToShow) {
        case 'Character Stats':
            return <CharacterStatsPanel />
        default:
            return <></>
        }
    }

    return (
        <div className='borealis-stats-panel-layer'>
            { panelToShow() }
        </div>
    )
}

export default StatsPanelView
