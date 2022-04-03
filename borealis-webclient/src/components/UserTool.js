import { connect } from 'react-redux'
import { toJson } from '../controllers/jsonHandler'
import { defaultGameState, overwriteGame, incrementGen, loadDefaultBattleGame, setFogEnabled } from '../reducers/gameReducer'
import { setUsername, setCursorSize, setToolSettings, toggleMousesharing } from '../reducers/settingsReducer'
import { pushGameRefresh, pushFogEnabled, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { saveRoomToDatabase, getRoomFromDatabase } from '../controllers/apiHandler'
import UserToolView from '../views/UserToolView'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const REACT_APP_PORT = 3000

const UserTool = ({ toggleOnUser, game, chat, character, metadata, settings, setFogEnabled, overwriteGame, incrementGen, setUsername, toggleMousesharing, setToolSettings, loadDefaultBattleGame }) => {
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

    const toggleShareMouse = () => {
        toggleMousesharing()
    }

    const initAsDev = () => {
        const mapsExist = game.maps.length > 0
        const tokensExist = game.tokens.length > 0
        if ((mapsExist && tokensExist) && !window.confirm('Overwrite game with defaults?'))
            return
        loadDefaultBattleGame()
        const defaultGame = defaultGameState
        pushGameRefresh(webSocket, wsSettings, defaultGame, chat, character)
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
        getRoomFromDatabase(wsSettings)
            .then((result) => {
                const loadedGame = {
                    ...result.data.game,
                    gen: result.data.game.gen + 1,
                }
                overwriteGame(loadedGame)
                pushGameRefresh(webSocket, wsSettings, loadedGame, chat, character)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }

    const copyUrlToClipboard = () => {
        const host = window.location.host.replace(/:\d+$/, '')
        const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'
        const userUrl = DEBUG_MODE ? `${protocol}://${host}:${REACT_APP_PORT}/?room=${metadata.room}` : `https://${host}/?room=${metadata.room}`
        navigator.clipboard.writeText(userUrl)
    }

    return (
        toggleOnUser ?
            <UserToolView
                isHost={ metadata.isHost }
                initAsDev={ initAsDev }
                toggleFog={ toggleFog }
                saveGameInServer={ saveGameInServer }
                loadGameFromServer={ loadGameFromServer }
                username={ settings.username }
                updateUsername={ updateUsername }
                cursorSize={ settings.cursorSize }
                mouseIsShared={ settings.shareMouse }
                toggleShareMouse={ toggleShareMouse }
                copyUrlToClipboard={ copyUrlToClipboard } />
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        chat: state.chat,
        metadata: state.metadata,
        settings: state.settings,
        character: state.character,
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
    toggleMousesharing,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
