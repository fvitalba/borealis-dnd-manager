import { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Path from '@/classes/Path'
import Game from '@/classes/Game'
import Map from '@/classes/Map'
import Token from '@/classes/Token'
import Character from '@/classes/Character'
import UserType from '@/enums/UserType'
import { pushGameRefresh, useWebSocket } from '@/hooks/useSocket'
import { useLoading } from '@/hooks/useLoading'
import StateInterface from '@/interfaces/StateInterface'
import { overwriteGame, loadMap, setFogEnabled } from '@/reducers/gameReducer'
import { addMap, updateMaps } from '@/reducers/mapReducer'
import { updateTokens } from '@/reducers/tokenReducer'
import { addChatMessage, overwriteChat } from '@/reducers/chatReducer'
import { updateCursor } from '@/reducers/metadataReducer'
import { assignCharacter, assignCharacterToUser, setCharacters, updateCharacter } from '@/reducers/characterReducer'
import { getMap } from '@/utils/mapHandler'
import { GAME_REQUEST_REFRESH } from '@/utils/loadingTasks'
import { IncomingWebSocketPayload, DataReceiverProps } from './types'

const DataReceiver = ({ gameState, mapState, tokenState, metadataState, settingsState, characterState, chatState, userState, updateCursor, updateMaps, updateTokens, loadMap, addMap, setFogEnabled, assignCharacterToUser, updateCharacter, overwriteGame, overwriteChat, setCharacters, addChatMessage }: DataReceiverProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()
    const currMap = getMap(mapState, gameState.currentMapId)

    const receiveData = useCallback((evt: MessageEvent<any>) => {
        if (!webSocketContext.ws)
            return  // Web Socket Connection is not active
        const data: IncomingWebSocketPayload = JSON.parse(evt.data)
        if (data.fromSocketGuid === webSocketContext.wsSettings.socketGuid) {
            return  // ignore messages sent by self
        }
        if (data.targetGuid && data.targetGuid !== webSocketContext.wsSettings.userGuid) {
            return  // ignore messages sent to different recipients
        }

        let pathToUpdate = new Array<Path>()
        let updatedMaps = mapState.maps.map((map) => map.copy())
        let updatedTokens = tokenState.tokens.map((token) => token.copy())
        switch (data.type) {
        case 'pushCursor':
            if ((data.x && data.y) && (data.fromUserGuid !== metadataState.userGuid)) {
                const cursorUser = userState.users.filter((user) => user.guid === data.fromUserGuid)[0]
                updateCursor(cursorUser?.name, data.x, data.y)
            }
            break
        case 'pushDrawPath':
            if (currMap !== undefined) {
                pathToUpdate = currMap.drawPaths ? currMap.drawPaths.map((path) => path.copy()) : []
                if (data.drawPath)
                    pathToUpdate.push(Path.fromDbSchema(data.drawPath))
                const newMap = currMap.copy()
                newMap.drawPaths = pathToUpdate
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushDrawReset':
            if (currMap !== undefined) {
                const newMap = currMap.copy()
                newMap.drawPaths = new Array<Path>()
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushFogPath':
            if (currMap !== undefined) {
                pathToUpdate = currMap.fogPaths ? currMap.fogPaths.map((path) => path.copy()) : []
                if (data.fogPath)
                    pathToUpdate.push(Path.fromDbSchema(data.fogPath))
                const newMap = currMap.copy()
                newMap.fogPaths = pathToUpdate
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushFogReset':
            if (currMap !== undefined) {
                const newMap = currMap.copy()
                newMap.fogPaths = new Array<Path>()
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushSingleToken':
            if (data.token !== undefined) {
                const newToken = Token.fromDbSchema(data.token)
                updatedTokens = updatedTokens.map((token) => {
                    if (newToken)
                        newToken.selected = (token.type === newToken.type) ? token.selected : false
                    return (newToken && (token.guid === newToken.guid)) ? newToken : token
                })
                updateTokens(updatedTokens)
            }
            break
        case 'deleteSingleToken':
            updatedTokens = updatedTokens.filter((token) => token.guid !== data.entityGuid)
            updateTokens(updatedTokens)
            break
        case 'pushTokens':
            if (data.tokens !== undefined) {
                updatedTokens = data.tokens.map((dToken) => {
                    const newToken = Token.fromDbSchema(dToken)
                    let tokenSelected = false
                    const currentToken = updatedTokens.filter((token2) => token2.guid === newToken.guid)
                    if (currentToken.length > 0)
                        tokenSelected = currentToken[0].selected
                    newToken.selected = tokenSelected
                    return newToken
                })
                updateTokens(updatedTokens)
            }
            break
        case 'pushMapId':
            if (data.mapId !== undefined)
                loadMap(data.mapId)
            break
        case 'pushMapState':
            if ((data.maps !== undefined) && (data.mapId !== undefined)) {
                updateMaps(data.maps.map((gMap) => Map.fromDbSchema(gMap)))
                loadMap(data.mapId)
            }
            break
        case 'pushCreateMap':
            if (data.map !== undefined)
                addMap(data.map)
            break
        case 'pushFogEnabled':
            if (data.fogEnabled !== undefined)
                setFogEnabled(data.fogEnabled)
            break
        case 'pushAssignCharacterToUser':
            if ((data.targetUsername !== undefined) && (data.entityGuid !== undefined))
                assignCharacterToUser(data.targetUsername, data.entityGuid)
            break
        case 'pushUpdateCharacter':
            if (data.character !== undefined)
                updateCharacter(Character.fromDbSchema(data.character))
            break
        case 'pushGameRefresh': // refresh from host
            if (data.game && data.chatState && data.characterState && data.mapState && data.tokenState) {
                overwriteGame(Game.fromDbSchema(data.game))
                overwriteChat(data.chatState.messages)
                updateMaps(data.mapState.maps.map((gMap) => Map.fromDbSchema(gMap)))
                updateTokens(data.tokenState.tokens.map((gToken) => Token.fromDbSchema(gToken)))
                setCharacters(data.characterState.characters.map((gCharacter) => Character.fromDbSchema(gCharacter)))
                const assignedCharacter = data.characterState.characters.filter((character) => character.username === settingsState.username)[0]
                if (assignedCharacter && (assignedCharacter.guid !== '')) {
                    assignCharacter(assignedCharacter.guid)
                }
                loadingContext.stopLoadingTask(GAME_REQUEST_REFRESH)
            }
            break
        case 'requestRefresh': // refresh request from player
            if (webSocketContext.ws) {
                if (metadataState.userType === UserType.host) {
                    pushGameRefresh(webSocketContext.ws, webSocketContext.wsSettings, gameState, mapState, tokenState, chatState, characterState)
                }
            }
            break
        case 'loadGame':
            if (data.game && data.chatState && data.characterState && data.mapState && data.tokenState) {
                overwriteGame(Game.fromDbSchema(data.game))
                overwriteChat(data.chatState.messages)
                updateMaps(data.mapState.maps.map((gMap) => Map.fromDbSchema(gMap)))
                updateTokens(data.tokenState.tokens.map((gToken) => Token.fromDbSchema(gToken)))
                setCharacters(data.characterState.characters.map((gCharacter) => Character.fromDbSchema(gCharacter)))
                const assignedCharacter = data.characterState.characters.filter((character) => character.username === settingsState.username)[0]
                if (assignedCharacter && (assignedCharacter.guid !== '')) {
                    assignCharacter(assignedCharacter.guid)
                }
                loadingContext.stopLoadingTask(GAME_REQUEST_REFRESH)
            }
            break
        case 'sendChatMessage':
            if (data.message)
                addChatMessage(data.message)
            break
        default:
            console.error(`Unrecognized websocket message type: ${data.type}`)
        }
    },[ gameState, mapState, tokenState, chatState, metadataState.userType, loadMap, overwriteGame, setFogEnabled, updateMaps, addMap, updateTokens, webSocketContext ])

    useEffect(() => {
        if (webSocketContext.ws) {
            webSocketContext.ws.addEventListener('message', receiveData)
        }

        return () => {
            if (webSocketContext.ws)
                webSocketContext.ws.removeEventListener('message', receiveData)
        }
    }, [ webSocketContext.ws, receiveData ])

    return <></>
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        gameState: state.game,
        mapState: state.map,
        tokenState: state.token,
        settingsState: state.settings,
        chatState: state.chat,
        characterState: state.character,
        userState: state.user,
    }
}

const mapDispatchToProps = {
    overwriteGame,
    loadMap,
    updateMaps,
    addMap,
    setFogEnabled,
    updateTokens,
    addChatMessage,
    overwriteChat,
    setCharacters,
    assignCharacter,
    assignCharacterToUser,
    updateCharacter,
    updateCursor,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataReceiver)
