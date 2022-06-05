import React, { ReactNode } from 'react'

interface ControlPanelContainerProps {
    children: ReactNode,
}

const ControlPanelSubcontainer = ({ children }: ControlPanelContainerProps) => {
    return (<div className='borealis-control-panel-subcontainer'>
        { children }
    </div>)
}

export default ControlPanelSubcontainer
