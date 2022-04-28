import React from 'react'
import { connect } from 'react-redux'
import ControlTool from '../enums/Tool'
import StateInterface from '../interfaces/StateInterface'
import { SettingsState, setToolSettings } from '../reducers/settingsReducer'
import Button from '../views/Button'

interface ToolButtonProps {
    title: string,
    value: JSX.Element,
    controlTools: Array<ControlTool>,
    settingsState: SettingsState,
    setToolSettings: (arg0: ControlTool) => void,
}

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
