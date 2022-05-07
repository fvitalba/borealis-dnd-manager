import React from 'react'
import {
    PlusCircleOutlineIcon,
    MinusCircleOutlineIcon,
} from '../Icons'
import ControlPanelContainer from '../GenericViews/ControlPanelContainer'
import ControlPanelRow from '../GenericViews/ControlPanelRow'
import ToggleButton from '../GenericViews/ToggleButton'
import ToolSelectView from './ToolSelectView'
import { ToolPanelTabName } from '../../components/ToolPanel'
import ToolControls from '../../components/ToolControls'

interface ToolPanelViewProps {
    hidden: boolean,
    toggleToolPanelTab: (tabName: ToolPanelTabName) => void,
    submenuHidden: boolean,
    isHost: boolean,
    fogEnabled: boolean,
}

const ToolPanelView = ({ hidden, toggleToolPanelTab, submenuHidden, isHost, fogEnabled }: ToolPanelViewProps) => {
    if (hidden)
        return (
            <ControlPanelContainer>
                <ControlPanelRow>
                    <ToggleButton value={ <PlusCircleOutlineIcon /> } toggleValue={ () => toggleToolPanelTab('hidden') } title='show control panel' />
                </ControlPanelRow>
            </ControlPanelContainer>
        )

    return (
        <ControlPanelContainer>
            <ControlPanelRow>
                <ToggleButton value={ <MinusCircleOutlineIcon /> } toggleValue={ () => toggleToolPanelTab('hidden') } title='hide control panel'/>
                <ToolSelectView fogEnabled={ fogEnabled } isHost={ isHost } />
            </ControlPanelRow>
            { !submenuHidden
                ? <ControlPanelRow>
                    <ToolControls />
                </ControlPanelRow>
                : null
            }
        </ControlPanelContainer>
    )
}

export default ToolPanelView
