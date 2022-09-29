import React from 'react'
import { connect } from 'react-redux'
import ControlTool from '@/enums/Tool'
import StateInterface from '@/interfaces/StateInterface'
import { setToolSettings } from '@/reducers/settingsReducer'
import { ToggleButton } from '@/components/ToggleButton'
import { ToolButtonProps } from './types'

const ToolButton = ({ title, value, controlTools, settingsState, setToolSettings }: ToolButtonProps) => {
    const isSelected = controlTools.includes(settingsState.tool)
    const onClick = () => {
        switch(true) {
        case controlTools.includes(ControlTool.Move):
            setToolSettings(ControlTool.Move)
            break
        case controlTools.includes(ControlTool.Draw):
            setToolSettings(ControlTool.Draw)
            break
        case controlTools.includes(ControlTool.EreaseFog):
            setToolSettings(ControlTool.EreaseFog)
            break
        }
    }

    return (
        <ToggleButton title={ title } value={ value } toggleValue={ onClick } isActive={ isSelected } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    setToolSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolButton)
