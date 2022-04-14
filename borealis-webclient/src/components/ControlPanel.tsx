import React, { useState } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import UserType from '../enums/UserType'
import { pushGameRefresh, requestRefresh, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import { ChatState } from '../reducers/chatReducer'
import { CharacterState } from '../reducers/characterReducer'
import { TokenState } from '../reducers/tokenReducer'
import { MapState } from '../reducers/mapReducer'
import ControlPanelView from '../views/ControlPanelView'

export interface ControlPanelState {
    hidden: boolean,
    toggleOnMaps: boolean,
    toggleOnUser: boolean,
    toggleOnTokens: boolean,
    toggleOnCharacterStats: boolean,
    toggleOnCharacterInventory: boolean,
    toggleOnCharacterSpells: boolean,
   [key: string]: boolean,
}

const initialControlPanelState = (): ControlPanelState => {
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

interface ControlPanelProps {
    metadataState: MetadataState,
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    chatState: ChatState,
    characterState: CharacterState,
}

const ControlPanel = ({ metadataState, gameState, mapState, tokenState, chatState, characterState }: ControlPanelProps) => {
    const [controlPanelState, setControlPanelState] = useState(initialControlPanelState())
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    const toggleHidden = () => {
        setControlPanelState({
            ...controlPanelState,
            hidden: !controlPanelState.hidden,
        })
    }

    const socketRequestRefresh = () => {
        if (webSocketContext.ws && webSocketContext.wsSettings) {
            if (loadingContext.setIsLoading)
                loadingContext.setIsLoading(true)
            requestRefresh(webSocketContext.ws, webSocketContext.wsSettings)
        }
    }

    const pushRefreshToPlayers = () => {
        if (webSocketContext.ws && webSocketContext.wsSettings)
            pushGameRefresh(webSocketContext.ws, webSocketContext.wsSettings, gameState, mapState, tokenState, chatState, characterState)
    }

    const submenuHidden = (controlPanelState.hidden || (!controlPanelState.toggleOnMaps && !controlPanelState.toggleOnTokens && !controlPanelState.toggleOnUser && !controlPanelState.toggleOnCharacterStats && !controlPanelState.toggleOnCharacterInventory && !controlPanelState.toggleOnCharacterSpells))

    return (
        <ControlPanelView
            controlPanelState={ controlPanelState }
            setControlPanelState={ setControlPanelState }
            hidden={ controlPanelState.hidden }
            toggleHidden={ toggleHidden }
            submenuHidden={ submenuHidden }
            fogEnabled={ gameState.fogEnabled }
            isHost={ metadataState.userType === UserType.host }
            socketRequestRefresh={ socketRequestRefresh }
            pushRefreshToPlayers={ pushRefreshToPlayers } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        gameState: state.game,
        mapState: state.map,
        tokenState: state.token,
        chatState: state.chat,
        characterState: state.character,
    }
}

export default connect(mapStateToProps, undefined)(ControlPanel)
