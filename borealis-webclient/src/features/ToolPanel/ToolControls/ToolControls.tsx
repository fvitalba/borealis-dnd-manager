import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { pushDrawReset, pushFogReset, useWebSocket } from '@/hooks/useSocket'
import StateInterface from '@/interfaces/StateInterface'
import { setDrawToolSettings, setFogToolSettings, setToolSettings } from '@/reducers/settingsReducer'
import { resetFog, resetDraw } from '@/reducers/mapReducer'
import ToolControlsView from './ToolControlsView'
import ControlTool from '@/enums/Tool'
import { ToolControlsProps } from './types'

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
