import { connect } from 'react-redux'
import { toJson } from '../controllers/jsonHandler'
import { defaultGameState, overwriteGame, incrementGen, loadDefaultBattleGame, setFogEnabled } from '../reducers/gameReducer'
import { setUsername, setCursorSize, setToolSettings } from '../reducers/settingsReducer'
import { pushGameRefresh, pushFogEnabled, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { saveRoomToDatabase, loadRoomFromDatabase } from '../controllers/apiHandler'
import UserToolView from '../views/UserToolView'

const UserTool = ({ toggleOnUser, game, chat, metadata, settings, setFogEnabled, overwriteGame, incrementGen, setUsername, setCursorSize, setToolSettings, loadDefaultBattleGame }) => {
    const [webSocket, wsSettings, setWsSettings] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

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
        const defaultGame = defaultGameState
        pushGameRefresh(webSocket, wsSettings, defaultGame, chat)
    }

    const toggleFog = () => {
        setFogEnabled(!game.fogEnabled)
        pushFogEnabled(webSocket, wsSettings, !game.fogEnabled)
        if (settings.tool === 'fog')
            setToolSettings('move','')
    }

    const saveGameInServer = () => {
        setIsLoading(true)
        incrementGen()
        const json = toJson(game, metadata)
        saveRoomToDatabase(wsSettings, json)
            .then(() => {
                // result here contains the saved room
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }

    const loadGameFromServer = () => {
        setIsLoading(true)
        loadRoomFromDatabase(wsSettings)
            .then((result) => {
                const loadedGame = {
                    ...result.data.game,
                    gen: result.data.game.gen + 1,
                }
                overwriteGame(loadedGame)
                pushGameRefresh(webSocket, wsSettings, loadedGame, chat)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
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
        chat: state.chat,
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
    overwriteGame,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
