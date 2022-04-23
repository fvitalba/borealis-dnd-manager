import { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Path from '../classes/Path'
import Game from '../classes/Game'
import Map from '../classes/Map'
import Token from '../classes/Token'
import Character from '../classes/Character'
import Message from '../classes/Message'
import UserType from '../enums/UserType'
import { pushGameRefresh, useWebSocket, FormattedWebSocketPayload } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { overwriteGame, loadMap, setFogEnabled } from '../reducers/gameReducer'
import { addMap, updateMaps, MapState } from '../reducers/mapReducer'
import { updateTokens, TokenState } from '../reducers/tokenReducer'
import { addChatMessage, ChatState, overwriteChat } from '../reducers/chatReducer'
import { MetadataState, updateCursor } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { assignCharacter, assignCharacterToUser, CharacterState, setCharacters, updateCharacter } from '../reducers/characterReducer'
import { getMap } from '../utils/mapHandler'
import { GAME_REQUEST_REFRESH } from '../utils/loadingTasks'

interface DataReceiverProps {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    characterState: CharacterState,
    chatState: ChatState,
    updateCursor: (arg0: string, arg1: number, arg2: number) => void,
    updateMaps: (arg0: Array<Map>) => void,
    updateTokens: (arg0: Array<Token>) => void,
    loadMap: (arg0: number) => void,
    addMap: (arg0: Map) => void,
    setFogEnabled: (arg0: boolean) => void,
    assignCharacter: (arg0: string) => void,
    assignCharacterToUser: (arg0: string, arg1: string) => void,
    updateCharacter: (arg0: Character) => void,
    overwriteGame: (arg0: Game) => void,
    overwriteChat: (arg0: Array<Message>) => void,
    setCharacters: (arg0: Array<Character>) => void,
    addChatMessage: (arg0: Message) => void,
}

const DataReceiver = ({ gameState, mapState, tokenState, metadataState, settingsState, characterState, chatState, updateCursor, updateMaps, updateTokens, loadMap, addMap, setFogEnabled, assignCharacterToUser, updateCharacter, overwriteGame, overwriteChat, setCharacters, addChatMessage }: DataReceiverProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()
    const currMap = getMap(mapState, gameState.currentMapId)

    const receiveData = useCallback((evt: MessageEvent<any>) => {
        if (!webSocketContext.ws)
            return  // Web Socket Connection is not active
        const data: FormattedWebSocketPayload = JSON.parse(evt.data)
        if (data.fromSocketGuid === webSocketContext.wsSettings.socketGuid) {
            return  // ignore messages sent by self
        }
        if (data.targetGuid && data.targetGuid !== webSocketContext.wsSettings.socketGuid) {
            return  // ignore messages sent to different recipients
        }

        let pathToUpdate = new Array<Path>()
        let updatedMaps = mapState.maps
        let updatedTokens = tokenState.tokens
        switch (data.type) {
        case 'pushCursor':
            if ((data.x && data.y) && (data.fromUserGuid !== metadataState.userGuid))
                updateCursor(data.fromUserGuid, data.x, data.y)
            break
        case 'pushDrawPath':
            if (currMap) {
                pathToUpdate = currMap.drawPaths ? currMap.drawPaths : []
                if (data.drawPath)
                    pathToUpdate.push(data.drawPath)
                const newMap = currMap
                newMap.drawPaths = pathToUpdate
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushDrawReset':
            if (currMap) {
                const newMap = currMap
                newMap.drawPaths = new Array<Path>()
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushFogPath':
            if (currMap) {
                pathToUpdate = currMap.fogPaths ? currMap.fogPaths : []
                if (data.fogPath)
                    pathToUpdate.push(data.fogPath)
                const newMap = currMap
                newMap.fogPaths = pathToUpdate
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushFogReset':
            if (currMap) {
                const newMap = currMap
                newMap.fogPaths = new Array<Path>()
                updatedMaps = updatedMaps.map((map) => {
                    return map.id === currMap.id ? newMap : map
                })
                updateMaps(updatedMaps)
            }
            break
        case 'pushSingleToken':
            updatedTokens = updatedTokens.map((token) => {
                const newToken = data.token
                if (newToken)
                    newToken.selected = (token.type === newToken.type) ? token.selected : false
                return (newToken && (token.guid === newToken.guid)) ? newToken : token
            })
            updateTokens(updatedTokens)
            break
        case 'deleteSingleToken':
            updatedTokens = updatedTokens.filter((token) => token.guid !== data.entityGuid)
            updateTokens(updatedTokens)
            break
        case 'pushTokens':
            if (data.tokens)
                updatedTokens = data.tokens.map((token) => {
                    let tokenSelected = false
                    const currentToken = updatedTokens.filter((token2) => token2.guid === token.guid)
                    if (currentToken.length > 0)
                        tokenSelected = currentToken[0].selected
                    token.selected = tokenSelected
                    return token
                })
            updateTokens(updatedTokens)
            break
        case 'pushMapId':
            if (data.mapId)
                loadMap(data.mapId)
            break
        case 'pushMapState':
            if (data.maps && data.mapId) {
                updateMaps(data.maps)
                loadMap(data.mapId)
            }
            break
        case 'pushCreateMap':
            if (data.map)
                addMap(data.map)
            break
        case 'pushFogEnabled':
            if (data.fogEnabled)
                setFogEnabled(data.fogEnabled)
            break
        case 'pushAssignCharacterToUser':
            if (data.targetUsername && data.entityGuid)
                assignCharacterToUser(data.targetUsername, data.entityGuid)
            break
        case 'pushUpdateCharacter':
            if (data.character)
                updateCharacter(data.character)
            break
        case 'pushGameRefresh': // refresh from host
            if (data.game && data.chatState && data.characterState && data.mapState && data.tokenState) {
                overwriteGame(data.game)
                overwriteChat(data.chatState.messages)
                updateMaps(data.mapState.maps)
                updateTokens(data.tokenState.tokens)
                setCharacters(data.characterState.characters)
                const assignedCharacter = data.characterState.characters.filter((character) => character.username === settingsState.username)[0]
                if (assignedCharacter && (!assignedCharacter.isEmpty())) {
                    assignCharacter(assignedCharacter.guid)
                }
                loadingContext.stopLoadingTask(GAME_REQUEST_REFRESH)
            }
            break
        case 'requestRefresh': // refresh request from player
            if (webSocketContext.ws && webSocketContext.wsSettings)
                if (metadataState.userType === UserType.host) {
                    pushGameRefresh(webSocketContext.ws, webSocketContext.wsSettings, gameState, mapState, tokenState, chatState, characterState)
                }
            break
        case 'loadGame':
            if (data.game && data.chatState && data.characterState && data.mapState && data.tokenState) {
                overwriteGame(data.game)
                overwriteChat(data.chatState.messages)
                updateMaps(data.mapState.maps)
                updateTokens(data.tokenState.tokens)
                setCharacters(data.characterState.characters)
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
