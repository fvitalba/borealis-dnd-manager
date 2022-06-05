import React from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import generateDefaultGameState from '../defaults/DefaultGameState'
import ControlTool from '../enums/Tool'
import UserType from '../enums/UserType'
import { pushGameRefresh, pushFogEnabled, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { ChatState, overwriteChat } from '../reducers/chatReducer'
import { assignCharacter, CharacterState, setCharacters } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { overwriteGame, incrementVersion, setFogEnabled } from '../reducers/gameReducer'
import { setUsername, setToolSettings, toggleMousesharing, SettingsState } from '../reducers/settingsReducer'
import { MapState, updateMaps } from '../reducers/mapReducer'
import { TokenState, updateTokens } from '../reducers/tokenReducer'
import UserToolView from '../views/UserToolView'
import loadAllFromDatabase from '../utils/gameLoadHandler'
import { setUsersFromAPI, UserState } from '../reducers/userReducer'
import Token from '../classes/Token'
import Message from '../classes/Message'
import Map from '../classes/Map'
import Character from '../classes/Character'
import User from '../classes/User'
import saveAllToDatabase from '../utils/gameSaveHandler'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const REACT_APP_PORT = 3000

interface UserToolProps {
    toggleOnUser: boolean,
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    chatState: ChatState,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    setFogEnabled: (arg0: boolean) => void,
    incrementVersion: () => void,
    setUsername: (arg0: string) => void,
    toggleMousesharing: () => void,
    setToolSettings: (arg0: ControlTool) => void,
    overwriteGame: (arg0: Game) => void,
    updateMaps: (arg0: Array<Map>) => void,
    updateTokens: (arg0: Array<Token>) => void,
    overwriteChat: (arg0: Array<Message>) => void,
    setCharacters: (arg0: Array<Character>) => void,
    assignCharacter: (arg0: string) => void,
    setUsersFromAPI: (arg0: Array<User>) => void,
}

const UserTool = ({ toggleOnUser, gameState, mapState, tokenState, chatState, characterState, userState, metadataState, settingsState, setFogEnabled, incrementVersion, setUsername, toggleMousesharing, setToolSettings, overwriteGame, updateMaps, updateTokens, overwriteChat, setCharacters, assignCharacter, setUsersFromAPI }: UserToolProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    if (!toggleOnUser)
        return <></>

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        webSocketContext.setWsSettings({
            ...webSocketContext.wsSettings,
            userGuid: e.target.value,
        })
    }

    const toggleShareMouse = () => {
        toggleMousesharing()
    }

    const initAsDev = () => {
        const defaultGameState = generateDefaultGameState()
        overwriteGame(defaultGameState.gameState)
        updateMaps(defaultGameState.mapState.maps)
        updateTokens(defaultGameState.tokenState.tokens)
        setCharacters(defaultGameState.characterState.characters)
        assignCharacter(defaultGameState.characterState.currentCharacterGuid)
        if (webSocketContext.ws)
            pushGameRefresh(webSocketContext.ws, webSocketContext.wsSettings, defaultGameState.gameState, defaultGameState.mapState, defaultGameState.tokenState, chatState, characterState)
    }

    const toggleFog = () => {
        setFogEnabled(!gameState.fogEnabled)
        if (webSocketContext.ws)
            pushFogEnabled(webSocketContext.ws, webSocketContext.wsSettings, !gameState.fogEnabled)
        if ((settingsState.tool === ControlTool.Fog) || (settingsState.tool === ControlTool.EreaseFog))
            setToolSettings(ControlTool.Move)
    }

    const saveGameInServer = () => {
        const dbState = {
            gameState: gameState,
            metadataState: metadataState,
            mapState: mapState,
            tokenState: tokenState,
            chatState: chatState,
            characterState: characterState,
            userState: userState,
        }
        saveAllToDatabase(webSocketContext, loadingContext, dbState)
            .then((result) => {
                if (!result.roomSaved || !result.mapsSaved || !result.tokensSaved || !result.chatSaved || !result.charactersSaved || !result.usersSaved)
                    throw new Error(`Attention! Not everything was saved. Look at this object to find out what failed: ${result}`)
                incrementVersion()
            })
    }

    const loadGameFromServer = () => {
        loadAllFromDatabase(webSocketContext, loadingContext)
            .then((dbState) => {
                if (dbState.gameState) {
                    overwriteGame(dbState.gameState)
                    incrementVersion()
                }
                if (dbState.mapState)
                    updateMaps(dbState.mapState.maps)
                if (dbState.tokenState)
                    updateTokens(dbState.tokenState.tokens)
                if (dbState.chatState)
                    overwriteChat(dbState.chatState.messages)
                if (dbState.characterState) {
                    setCharacters(dbState.characterState.characters)
                    if (dbState.characterState.currentCharacterGuid !== '')
                        assignCharacter(dbState.characterState.currentCharacterGuid)
                }
                if (dbState.usersState)
                    setUsersFromAPI(dbState.usersState.users)
            })
    }

    const copyUrlToClipboard = () => {
        const host = window.location.host.replace(/:\d+$/, '')
        const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'
        const userUrl = DEBUG_MODE ? `${protocol}://${host}:${REACT_APP_PORT}/?roomId=${metadataState.roomGuid}&roomName=${metadataState.roomName}` : `https://${host}/?roomId=${metadataState.roomGuid}&roomName=${metadataState.roomName}`
        navigator.clipboard.writeText(userUrl)
    }

    return (
        toggleOnUser ?
            <UserToolView
                isHost={ metadataState.userType === UserType.host }
                initAsDev={ initAsDev }
                fogEnabled={ gameState.fogEnabled }
                toggleFog={ toggleFog }
                saveGameInServer={ saveGameInServer }
                loadGameFromServer={ loadGameFromServer }
                userName={ settingsState.username }
                updateUserName={ updateUsername }
                mouseIsShared={ settingsState.shareMouse }
                toggleShareMouse={ toggleShareMouse }
                copyUrlToClipboard={ copyUrlToClipboard } />
            : null
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        tokenState: state.token,
        chatState: state.chat,
        characterState: state.character,
        metadataState: state.metadata,
        settingsState: state.settings,
        userState: state.user,
    }
}

const mapDispatchToProps = {
    setUsername,
    setFogEnabled,
    setToolSettings,
    incrementVersion,
    toggleMousesharing,
    overwriteGame,
    updateMaps,
    updateTokens,
    overwriteChat,
    setCharacters,
    assignCharacter,
    setUsersFromAPI,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTool)
