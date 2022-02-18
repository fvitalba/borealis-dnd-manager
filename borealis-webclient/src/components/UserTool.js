import { connect } from 'react-redux'
import { toJson } from '../controllers/jsonHandler'
import { incrementGen, loadDefaultBattleGame, setFogEnabled } from '../reducers/gameReducer'
import { setUsername, setCursorSize, setToolSettings } from '../reducers/settingsReducer'
import { pushFogEnabled, saveGame, requestLoadGame, useWebSocket } from '../hooks/useSocket'
import UserToolView from '../views/UserToolView'

const UserTool = ({ toggleOnUser, game, metadata, settings, setFogEnabled, incrementGen, setUsername, setCursorSize, setToolSettings, loadDefaultBattleGame }) => {
    const [webSocket, wsSettings, setWsSettings] = useWebSocket()
    if (!toggleOnUser)
        return null

    const updateUsername = (value) => {
        setUsername(value)
        setWsSettings({
            ...wsSettings,
            username: value,
        })
    }

    const updateCursorSize = (value) => {
        const newSize = value
        if (!isNaN(newSize))
            setCursorSize(newSize)
    }

    const initAsDev = () => {
        const mapsExist = game.maps.length > 0
        const tokensExist = game.tokens.length > 0
        if ((mapsExist && tokensExist) && !window.confirm('Overwrite game with defaults?'))
            return
        loadDefaultBattleGame()
    }

    const toggleFog = () => {
        setFogEnabled(!game.fogEnabled)
        pushFogEnabled(webSocket, wsSettings, !game.fogEnabled)
        if (settings.tool === 'fog')
            setToolSettings('move','')
    }

    const saveGameInServer = () => {
        incrementGen()
        const json = toJson(game, metadata, incrementGen)
        saveGame(webSocket,wsSettings,json)
    }

    const loadGameFromServer = () => {
        requestLoadGame(webSocket,wsSettings)
    }

    return (
        toggleOnUser ?
            <UserToolView
                initAsDev={ initAsDev }
                toggleFog={ toggleFog }
                saveGameInServer={ saveGameInServer }
                loadGameFromServer={ loadGameFromServer }
                username={ settings.username }
                updateUsername={ updateUsername }
                cursorSize={ settings.cursorSize }
                updateCursorSize={ updateCursorSize } />
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        metadata: state.metadata,
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    setUsername,
    setCursorSize,
    setFogEnabled,
    setToolSettings,
    loadDefaultBattleGame,
    incrementGen,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
