import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUsername, setCursorSize, toggleMousesharing } from '../reducers/settingsReducer'
import { pushGameRefresh, requestRefresh, useWebSocket } from '../hooks/useSocket'
import ControlPanelView from '../views/ControlPanelView'

const initialControlPanelState = () => {
    return {
        hidden: false,
        toggleOnMaps: false,
        toggleOnUser: false,
        toggleOnTokens: false,
    }
}

const ControlPanel = ({ game, settings, metadata, chat, setUsername/*, setCursorSize */, toggleMousesharing }) => {
    const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)
    const [webSocket, wsSettings, setWsSettings] = useWebSocket()

    const toggleHidden = () => {
        setControlPanelState({
            ...controlPanelState,
            hidden: !controlPanelState.hidden,
        })
    }

    const toggleShareMouse = () => {
        toggleMousesharing()
    }

    const updateUsername = (value) => {
        setUsername(value)
        setWsSettings({
            ...wsSettings,
            username: value,
        })
    }

    /*
    const updateCursorSize = (value) => {
        const newSize = value
        if (!isNaN(newSize))
            setCursorSize(newSize)
    }
    */

    const socketRequestRefresh = () => {
        requestRefresh(webSocket, wsSettings)
    }

    const pushRefreshToPlayers = () => {
        pushGameRefresh(webSocket, wsSettings, game, chat)
    }

    const submenuHidden = (controlPanelState.hidden || (!controlPanelState.toggleOnMaps && !controlPanelState.toggleOnTokens && !controlPanelState.toggleOnUser))

    return (
        <ControlPanelView
            controlPanelState={ controlPanelState }
            setControlPanelState={ setControlPanelState }
            hidden={ controlPanelState.hidden }
            toggleHidden={ toggleHidden }
            submenuHidden={ submenuHidden }
            fogEnabled={ game.fogEnabled }
            isHost={ metadata.isHost }
            username={ settings.username }
            setUsername={ updateUsername }
            mouseIsShared={ settings.shareMouse }
            toggleShareMouse={ toggleShareMouse }
            socketRequestRefresh={ socketRequestRefresh }
            pushRefreshToPlayers={ pushRefreshToPlayers } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        settings: state.settings,
        metadata: state.metadata,
        chat: state.chat,
    }
}

const mapDispatchToProps = {
    setUsername,
    setCursorSize,
    toggleMousesharing,
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
