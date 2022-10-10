import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '@/interfaces/StateInterface'
import CharacterStatsPanelView from './CharacterStatsPanelView'
import { CharacterStatsPanelProps } from './types'

const StatsPanel = ({ characterState }: CharacterStatsPanelProps) => {
    return (
        <CharacterStatsPanelView
            characters={ characterState.characters }
            selectedCharacterGuid={ characterState.currentCharacterGuid }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        characterState: state.character,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPanel)
