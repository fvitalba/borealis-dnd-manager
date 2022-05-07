import React from 'react'
import ToolButton from '../../components/ToolButton'
import ControlTool from '../../enums/Tool'
import { LocationSolidIcon, EditSolidIcon, CloudOffSolidIcon } from '../Icons'

interface ToolSelectViewProps {
    isHost: boolean,
    fogEnabled: boolean,
}

const ToolSelectView = ({ isHost, fogEnabled }: ToolSelectViewProps) => {
    return (
        <>
            <ToolButton title='move' controlTools={ [ControlTool.Move] } value={ <LocationSolidIcon /> } />
            <ToolButton title='draw' controlTools={ [ControlTool.Draw, ControlTool.EreaseDraw] } value={ <EditSolidIcon /> } />
            { (fogEnabled && isHost) ? <ToolButton title='fog' controlTools={ [ControlTool.Fog, ControlTool.EreaseFog] } value={ <CloudOffSolidIcon /> } /> : null }
        </>
    )
}

export default ToolSelectView
