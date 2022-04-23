import React from 'react'
import ToolButton from '../components/ToolButton'
import ControlTool from '../enums/Tool'
import { LocationSolidIcon, EditSolidIcon, CloudOffSolidIcon } from './Icons'

interface ToolSelectViewProps {
    isHost: boolean,
    fogEnabled: boolean,
}

const ToolSelectView = ({ isHost, fogEnabled }: ToolSelectViewProps) => {
    return (
        <div className='tool-select-view'>
            <ToolButton title='move' controlTool={ ControlTool.Move } value={ <LocationSolidIcon /> } />
            <ToolButton title='draw' controlTool={ ControlTool.Draw } value={ <EditSolidIcon /> } />
            { (fogEnabled && isHost) ? <ToolButton title='fog' controlTool={ ControlTool.EreaseFog } value={ <CloudOffSolidIcon /> } /> : null }
        </div>
    )
}

export default ToolSelectView
