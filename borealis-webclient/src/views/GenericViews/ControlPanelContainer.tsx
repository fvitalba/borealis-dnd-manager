import React, { ReactNode } from 'react'

interface ControlPanelContainerProps {
    children: ReactNode,
}

const ControlPanelContainer = ({ children }: ControlPanelContainerProps) => {
    return (<div className='borealis-control-panel-container'>
        { children }
    </div>)
}

export default ControlPanelContainer
