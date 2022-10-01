import React from 'react'
import { ToolButton } from '@/features/ToolPanel/ToolButton'
import ControlTool from '@/enums/Tool'
import {
    BorealisMoveToolIcon,
    BorealisDrawToolIcon,
    BorealisFogToolIcon,
} from '@/styles/Icons'
import { ToolSelectViewProps } from './types'

const ToolSelectView = ({ isHost, fogEnabled }: ToolSelectViewProps) => {
    return (
        <>
            <ToolButton title='move' controlTools={ [ControlTool.Move] } value={ <BorealisMoveToolIcon /> } />
            <ToolButton title='draw' controlTools={ [ControlTool.Draw, ControlTool.EreaseDraw] } value={ <BorealisDrawToolIcon /> } />
            { (fogEnabled && isHost) ? <ToolButton title='fog' controlTools={ [ControlTool.Fog, ControlTool.EreaseFog] } value={ <BorealisFogToolIcon /> } /> : null }
        </>
    )
}

export default ToolSelectView
