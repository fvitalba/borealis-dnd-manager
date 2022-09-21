import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '../../interfaces/StateInterface'
import GameSetupView from './GameSetupView'
import { GameSetupProps } from './types'

const GameSetup = ({ metadataState }: GameSetupProps) => {
    return (
        <GameSetupView
            showLogin={ (metadataState.sessionGuid === '') && (metadataState.userGuid === '') }
            showRoomSelection={ (metadataState.sessionGuid !== '') && (metadataState.roomGuid === '') }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup)
