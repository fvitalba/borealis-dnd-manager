import React from 'react'
import { ControlPanelContainerProps } from './types'

const ControlPanelSubcontainer = ({ children }: ControlPanelContainerProps) => {
    return (<div className='borealis-control-panel-subcontainer'>
        { children }
    </div>)
}

export default ControlPanelSubcontainer
