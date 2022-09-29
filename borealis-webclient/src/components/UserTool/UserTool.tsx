import React from 'react'
import { connect } from 'react-redux'
import generateDefaultGameState from '../../defaults/DefaultGameState'
import ControlTool from '../../enums/Tool'
import UserType from '../../enums/UserType'
import { pushGameRefresh, pushFogEnabled, useWebSocket } from '../../hooks/useSocket'
import { useLoading } from '../../hooks/useLoading'
import StateInterface from '../../interfaces/StateInterface'
import { overwriteChat } from '../../reducers/chatReducer'
import { assignCharacter, setCharacters } from '../../reducers/characterReducer'
import { overwriteGame, incrementVersion, setFogEnabled } from '../../reducers/gameReducer'
import { setUsername, setToolSettings, toggleMousesharing } from '../../reducers/settingsReducer'
import { updateMaps } from '../../reducers/mapReducer'
import { updateTokens } from '../../reducers/tokenReducer'
import UserToolView from './UserToolView'
import loadAllFromDatabase from '../../utils/gameLoadHandler'
import { setUsersFromAPI } from '../../reducers/userReducer'
import saveAllToDatabase from '../../utils/gameSaveHandler'
import { deleteLoginFromLocalStorage } from '../../utils/loginHandler'
import { UserToolProps } from './types'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const REACT_APP_PORT = 3000

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

    const logoutUser = () => {
        deleteLoginFromLocalStorage()
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
                copyUrlToClipboard={ copyUrlToClipboard }
                logoutUser={ logoutUser } />
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
