import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import { pushDrawReset, pushFogReset, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { setDrawToolSettings, setFogToolSettings, SettingsState, setToolSettings } from '../reducers/settingsReducer'
import { resetFog, resetDraw } from '../reducers/mapReducer'
import ToolControlsView from '../views/Tools/ToolControlsView'
import ControlTool from '../enums/Tool'

interface ToolControlsProps {
    gameState: Game,
    settingsState: SettingsState,
    setToolSettings: (arg0: ControlTool) => void,
    setDrawToolSettings: (arg0: string, arg1: number) => void,
    setFogToolSettings: (arg0: number, arg1: number) => void,
    resetFog: (arg0: number) => void,
    resetDraw: (arg0: number) => void,
}

const ToolControls = ({ gameState, settingsState, setToolSettings, setDrawToolSettings, setFogToolSettings, resetFog, resetDraw }: ToolControlsProps) => {
    const [toolControlState, setToolControlState] = useState({
        showColorPicker: false,
    })
    const webSocketContext = useWebSocket()
    const drawColorRef = useRef<HTMLButtonElement>(null)

    const toggleColorPicker = () => {
        setToolControlState({
            ...toolControlState,
            showColorPicker: !toolControlState.showColorPicker,
        })
    }

    const setTool = (newTool: ControlTool) => {
        setToolSettings(newTool)
    }

    const setDrawColor = (value: string) => {
        setDrawToolSettings(value, settingsState.drawSize)
    }

    const setDrawSize = (value: number) => {
        const newSize = value
        if (!isNaN(newSize))
            setDrawToolSettings(settingsState.drawColor, newSize)
    }

    const setFogRadius = (value: number) => {
        const newRadius = value
        if (!isNaN(newRadius))
            setFogToolSettings(settingsState.fogOpacity, newRadius)
    }

    const resetFogOnCurrentMap = () => {
        resetFog(gameState.currentMapId)
        if (webSocketContext.ws)
            pushFogReset(webSocketContext.ws, webSocketContext.wsSettings)
    }

    const resetDrawOnCurrentMap = () => {
        resetDraw(gameState.currentMapId)
        if (webSocketContext.ws)
            pushDrawReset(webSocketContext.ws, webSocketContext.wsSettings)
    }

    return (
        <ToolControlsView
            tool={ settingsState.tool }
            setTool={ setTool }
            drawColor={ settingsState.drawColor }
            setDrawColor={ setDrawColor }
            drawColorRef={ drawColorRef }
            showColorPicker={ toolControlState.showColorPicker }
            toggleColorPicker={ toggleColorPicker }
            drawSize={ settingsState.drawSize }
            setDrawSize={ setDrawSize }
            fogRadius={ settingsState.fogRadius }
            setFogRadius={ setFogRadius }
            resetFog={ resetFogOnCurrentMap }
            resetDrawing={ resetDrawOnCurrentMap } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    setToolSettings,
    setDrawToolSettings,
    setFogToolSettings,
    resetFog,
    resetDraw,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolControls)
