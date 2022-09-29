import React from 'react'
import { ControlPanelContainerProps } from './types'

const ControlPanelContainer = ({ children }: ControlPanelContainerProps) => {
    return (<div className='borealis-control-panel-container'>
        { children }
    </div>)
}

export default ControlPanelContainer
