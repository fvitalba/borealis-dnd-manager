import React from 'react'
import { connect } from 'react-redux'
import { overwriteGame, incrementVersion, setFogEnabled } from '../reducers/gameReducer'
import { setUsername, setToolSettings, toggleMousesharing, SettingsState } from '../reducers/settingsReducer'
import { pushGameRefresh, pushFogEnabled, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { saveRoomToDatabase, getRoomFromDatabase } from '../utils/apiHandler'
import UserToolView from '../views/UserToolView'
import StateInterface from '../interfaces/StateInterface'
import Game from '../classes/Game'
import { ChatState } from '../reducers/chatReducer'
import { CharacterState } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import ControlTool from '../enums/Tool'
import UserType from '../enums/UserType'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const REACT_APP_PORT = 3000

interface UserToolProps {
    toggleOnUser: boolean,
    gameState: Game,
    chatState: ChatState,
    characterState: CharacterState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    setFogEnabled: (arg0: boolean) => void,
    overwriteGame: (arg0: Game) => void,
    incrementVersion: () => void,
    setUsername: (arg0: string) => void,
    toggleMousesharing: () => void,
    setToolSettings: (arg0: ControlTool) => void,
}

const UserTool = ({ toggleOnUser, gameState, chatState, characterState, metadataState, settingsState, setFogEnabled, overwriteGame, incrementVersion, setUsername, toggleMousesharing, setToolSettings }: UserToolProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    if (!toggleOnUser)
        return <></>

    const updateUsername = (value: string) => {
        setUsername(value)
        webSocketContext.setWsSettings({
            ...webSocketContext.wsSettings,
            userGuid: value,
        })
    }

    const toggleShareMouse = () => {
        toggleMousesharing()
    }

    const initAsDev = () => {
        //TODO: Reenable Demo
        /*
        const mapsExist = game.maps.length > 0
        const tokensExist = game.tokens.length > 0
        if ((mapsExist && tokensExist) && !window.confirm('Overwrite game with defaults?'))
            return
        loadDefaultBattleGame()
        const defaultGame = defaultGameState
        pushGameRefresh(webSocket, wsSettings, defaultGame, chat, character)
        */
    }

    const toggleFog = () => {
        setFogEnabled(!gameState.fogEnabled)
        if (webSocketContext.ws)
            pushFogEnabled(webSocketContext.ws, webSocketContext.wsSettings, !gameState.fogEnabled)
        if ((settingsState.tool === ControlTool.Fog) || (settingsState.tool === ControlTool.EreaseFog))
            setToolSettings(ControlTool.Move)
    }

    const saveGameInServer = () => {
        //TODO: Reenable saving of game
        /*
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
        */
    }

    const loadGameFromServer = () => {
        //TODO: reenable loading of game
        /*
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
        */
    }

    const copyUrlToClipboard = () => {
        const host = window.location.host.replace(/:\d+$/, '')
        const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'
        const userUrl = DEBUG_MODE ? `${protocol}://${host}:${REACT_APP_PORT}/?roomId=${metadataState.roomGuid}` : `https://${host}/?roomId=${metadataState.roomGuid}`
        navigator.clipboard.writeText(userUrl)
    }

    return (
        toggleOnUser ?
            <UserToolView
                isHost={ metadataState.userType === UserType.host }
                initAsDev={ initAsDev }
                toggleFog={ toggleFog }
                saveGameInServer={ saveGameInServer }
                loadGameFromServer={ loadGameFromServer }
                username={ settingsState.username }
                updateUsername={ updateUsername }
                mouseIsShared={ settingsState.shareMouse }
                toggleShareMouse={ toggleShareMouse }
                copyUrlToClipboard={ copyUrlToClipboard } />
            : null
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        chatState: state.chat,
        characterState: state.character,
        metadataState: state.metadata,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    setUsername,
    setFogEnabled,
    setToolSettings,
    incrementVersion,
    overwriteGame,
    toggleMousesharing,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
