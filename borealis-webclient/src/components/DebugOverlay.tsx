import React from 'react'
import { connect } from 'react-redux'
import { useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import DebugOverlayView from '../views/DebugOverlayView'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true

interface DebugOverlayProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
}

const DebugOverlay = ({ metadataState, settingsState }: DebugOverlayProps) => {
    const webSocketContext = useWebSocket()

    if (!DEBUG_MODE)
        return null

    return (<DebugOverlayView
        userType={ metadataState.userType }
        userGuid={ metadataState.userGuid }
        userName={ settingsState.username }
        roomId={ metadataState.roomGuid }
        roomName={ metadataState.roomName }
        socketGuid={ webSocketContext.wsSettings.socketGuid }
        sessionGuid={ metadataState.sessionGuid }
        isGuest={ metadataState.isGuest }
    />)
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DebugOverlay)
