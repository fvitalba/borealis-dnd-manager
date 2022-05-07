import React, { useState } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import ControlTool from '../enums/Tool'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import ToolPanelView from '../views/Tools/ToolPanelView'

export interface ToolPanelState {
    hidden: boolean,
}

export type ToolPanelTabName = 'hidden'

const initialToolPanelState = (): ToolPanelState => {
    return {
        hidden: false,

    }
}


interface ToolPanelProps {
    metadataState: MetadataState,
    gameState: Game,
    settingsState: SettingsState,
}

const ToolPanel = ({ metadataState, gameState, settingsState }: ToolPanelProps) => {
    const [ toolPanelState, setToolPanelState ] = useState(initialToolPanelState())

    const toggleToolPanelTab = (tabName: ToolPanelTabName) => {
        setToolPanelState({
            ...toolPanelState,
            [tabName]: !toolPanelState[tabName],
            // to add hidden if more options exist
        })
    }

    const submenuHidden = (toolPanelState.hidden || (settingsState.tool === ControlTool.Move))

    return (
        <ToolPanelView
            hidden={ toolPanelState.hidden }
            toggleToolPanelTab={ toggleToolPanelTab }
            fogEnabled={ gameState.fogEnabled }
            isHost={ metadataState.userType === UserType.host }
            submenuHidden={ submenuHidden }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        gameState: state.game,
        settingsState: state.settings,
    }
}

export default connect(mapStateToProps, {})(ToolPanel)
