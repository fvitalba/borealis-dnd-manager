import React from 'react'
import {
    BorealisCollapseIcon,
    BorealisExpandIcon,
} from '@/styles/Icons'
import { ControlPanelContainer } from '@/features/ControlPanel'
import { ControlPanelRow } from '@/features/ControlPanel'
import { ToggleButton } from '@/components/ToggleButton'
import ToolSelectView from './ToolSelectView'
import { ToolControls } from './ToolControls'
import { ToolPanelViewProps } from './types'

const ToolPanelView = ({ hidden, toggleToolPanelTab, submenuHidden, isHost, fogEnabled }: ToolPanelViewProps) => {
    if (hidden)
        return (
            <ControlPanelContainer>
                <ControlPanelRow>
                    <ToggleButton value={ <BorealisExpandIcon /> } toggleValue={ () => toggleToolPanelTab('hidden') } title='show control panel' />
                </ControlPanelRow>
            </ControlPanelContainer>
        )

    return (
        <ControlPanelContainer>
            <ControlPanelRow>
                <ToggleButton value={ <BorealisCollapseIcon /> } toggleValue={ () => toggleToolPanelTab('hidden') } title='hide control panel'/>
                <ToolSelectView fogEnabled={ fogEnabled } isHost={ isHost } />
            </ControlPanelRow>
            { !submenuHidden
                ? <ToolControls />
                : null
            }
        </ControlPanelContainer>
    )
}

export default ToolPanelView
