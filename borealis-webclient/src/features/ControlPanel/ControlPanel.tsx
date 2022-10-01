import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserType from '@/enums/UserType'
import StateInterface from '@/interfaces/StateInterface'
import ControlPanelView from './ControlPanelView'
import { ControlPanelState, ControlPanelProps, ControlPanelTabName } from './types'

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

const ControlPanel = ({ metadataState, gameState }: ControlPanelProps) => {
    const [controlPanelState, setControlPanelState] = useState(initialControlPanelState())

    const toggleControlPanelTab = (tabName: ControlPanelTabName) => {
        setControlPanelState({
            ...controlPanelState,
            toggleOnUser: false,
            toggleOnMaps: false,
            toggleOnTokens: false,
            hidden: false,
            toggleOnCharacterStats: false,
            toggleOnCharacterInventory: false,
            toggleOnCharacterSpells: false,
            [tabName]: !controlPanelState[tabName],
        })
    }

    const submenuHidden = (controlPanelState.hidden || (!controlPanelState.toggleOnMaps && !controlPanelState.toggleOnTokens && !controlPanelState.toggleOnUser && !controlPanelState.toggleOnCharacterStats && !controlPanelState.toggleOnCharacterInventory && !controlPanelState.toggleOnCharacterSpells))

    return (
        <ControlPanelView
            controlPanelState={ controlPanelState }
            hidden={ controlPanelState.hidden }
            toggleControlPanelTab={ toggleControlPanelTab }
            submenuHidden={ submenuHidden }
            fogEnabled={ gameState.fogEnabled }
            isHost={ metadataState.userType === UserType.host } />
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

export default connect(mapStateToProps, {})(ControlPanel)
