import React from 'react'
import { ControlPanelRowProps } from './types'

const ControlPanelRow = ({ children, reverseDirection }: ControlPanelRowProps) => {
    const directionClass = reverseDirection ? 'flex-row-reverse' : 'flex-row'
    return (<div className={ `${directionClass} borealis-control-panel-row` }>
        { children }
    </div>)
}

export default ControlPanelRow
