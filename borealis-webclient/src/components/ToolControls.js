import { connect } from 'react-redux'
import { setToolSettings, setDrawToolSettings, setFogToolSettings } from '../reducers/settingsReducer'
import { resetFog, resetDraw } from '../reducers/gameReducer'
import { pushDrawReset, pushFogReset, useWebSocket } from '../hooks/useSocket'
import ToolControlsView from '../views/ToolControlsView'

const ToolControls = ({ settings, setToolSettings, setDrawToolSettings, setFogToolSettings, resetFog, resetDraw }) => {
    const [webSocket, wsSettings] = useWebSocket()
    const setSubtool = (subtool) => {
        setToolSettings(settings.tool, subtool)
    }

    const setDrawColor = (value) => {
        setDrawToolSettings(value, settings.drawSize)
    }

    const setDrawSize = (value) => {
        const newSize = value
        if (!isNaN(newSize))
            setDrawToolSettings(settings.drawColor, newSize)
    }

    const setFogOpacity = (value) => {
        const newOpacity = value
        if (!isNaN(newOpacity))
            setFogToolSettings(newOpacity, settings.fogRadius)
    }

    const setFogRadius = (value) => {
        const newRadius = value
        if (!isNaN(newRadius))
            setFogToolSettings(settings.fogOpacity, newRadius)
    }

    const resetFogOnCurrentMap = () => {
        resetFog()
        pushFogReset(webSocket, wsSettings)
    }

    const resetDrawOnCurrentMap = () => {
        resetDraw()
        pushDrawReset(webSocket, wsSettings)
    }

    return (
        <ToolControlsView
            tool={ settings.tool }
            subtool={ settings.subtool }
            drawColor={ settings.drawColor }
            setDrawColor={ setDrawColor }
            drawSize={ settings.drawSize }
            setDrawSize={ setDrawSize }
            fogOpacity={ settings.fogOpacity }
            setFogOpacity={ setFogOpacity }
            fogRadius={ settings.fogRadius }
            setFogRadius={ setFogRadius }
            setSubtool={ setSubtool }
            resetFog={ resetFogOnCurrentMap }
            resetDrawing={ resetDrawOnCurrentMap } />
    )
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
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
