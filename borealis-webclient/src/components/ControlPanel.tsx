import React, { useState } from 'react'
import { connect } from 'react-redux'
import { pushGameRefresh, requestRefresh, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import ControlPanelView from '../views/ControlPanelView'

const initialControlPanelState = () => {
    return {
        hidden: false,
        toggleOnMaps: false,
        toggleOnUser: false,
        toggleOnTokens: false,
        toggleOnCharacterStats: false,
        toggleOnCharacterInventory: false,
        toggleOnCharacterSpells: false,
    }
}

const ControlPanel = ({ game, metadata, chat, character }) => {
    const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)
    const [webSocket, wsSettings] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

    const toggleHidden = () => {
        setControlPanelState({
            ...controlPanelState,
            hidden: !controlPanelState.hidden,
        })
    }

    const socketRequestRefresh = () => {
        setIsLoading(true)
        requestRefresh(webSocket, wsSettings)
    }

    const pushRefreshToPlayers = () => {
        pushGameRefresh(webSocket, wsSettings, game, chat, character.characters)
    }

    const submenuHidden = (controlPanelState.hidden || (!controlPanelState.toggleOnMaps && !controlPanelState.toggleOnTokens && !controlPanelState.toggleOnUser && !controlPanelState.toggleOnCharacterStats && !controlPanelState.toggleOnCharacterInventory && !controlPanelState.toggleOnCharacterSpells))

    return (
        <ControlPanelView
            controlPanelState={ controlPanelState }
            setControlPanelState={ setControlPanelState }
            hidden={ controlPanelState.hidden }
            toggleHidden={ toggleHidden }
            submenuHidden={ submenuHidden }
            fogEnabled={ game.fogEnabled }
            isHost={ metadata.isHost }
            socketRequestRefresh={ socketRequestRefresh }
            pushRefreshToPlayers={ pushRefreshToPlayers } />
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        metadata: state.metadata,
        chat: state.chat,
        character: state.character,
    }
}

export default connect(mapStateToProps, undefined)(ControlPanel)
