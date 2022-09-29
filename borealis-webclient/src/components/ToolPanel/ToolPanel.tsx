import React, { useState } from 'react'
import { connect } from 'react-redux'
import ControlTool from '../../enums/Tool'
import UserType from '../../enums/UserType'
import StateInterface from '../../interfaces/StateInterface'
import ToolPanelView from './ToolPanelView'
import { ToolPanelState, ToolPanelProps, ToolPanelTabName } from './types'

const initialToolPanelState = (): ToolPanelState => {
    return {
        hidden: false,

    }
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
