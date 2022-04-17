import React from 'react'
import { connect } from 'react-redux'
import ControlTool from '../enums/Tool'
import StateInterface from '../interfaces/StateInterface'
import { SettingsState, setToolSettings } from '../reducers/settingsReducer'
import Button from '../views/Button'

interface ToolButtonProps {
    title: string,
    value: JSX.Element,
    controlTool: ControlTool,
    settingsState: SettingsState,
    setToolSettings: (arg0: ControlTool) => void,
}

const ToolButton = ({ title, value, controlTool, settingsState, setToolSettings }: ToolButtonProps) => {
    const isSelected = controlTool === settingsState.tool
    const onClick = () => {
        setToolSettings(controlTool)
    }

    return (
        <Button title={ title } value={ value } onClick={ onClick } isSelected={ isSelected } />
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
