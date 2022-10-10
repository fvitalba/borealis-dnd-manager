import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '@/interfaces/StateInterface'
import StatsPanelView from './StatsPanelView'
import { StatsPanelProps } from './types'

const StatsPanel = ({ pageToShow }: StatsPanelProps) => {
    return (
        <StatsPanelView
            pageToShow={ pageToShow }
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
