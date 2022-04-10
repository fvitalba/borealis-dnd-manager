import React, { useContext } from 'react'
import { WebSocketContext, IWsSettings, IWebSocketContext } from '../contexts/WebSocketProvider'
import Path from '../classes/Path'
import Message from '../classes/Message'
import Character from '../classes/Character'
import Map from '../classes/Map'
import Token from '../classes/Token'
import Game from '../classes/Game'
import { MapState } from '../reducers/mapReducer'
import { TokenState } from '../reducers/tokenReducer'
import { ChatState } from '../reducers/chatReducer'
import { CharacterState } from '../reducers/characterReducer'

export const useWebSocket = (): IWebSocketContext => {
    const webSocket = useContext(WebSocketContext)
    if (!webSocket) {
        throw new Error('useSocket must be used with WebSocketContext')
    }
    return webSocket
}

interface WebSocketPayload {
    type: string,
    targetGuid?: string,
    targetUsername?: string,
    x?: number,
    y?: number,
    mapId?: number,
    drawPath?: Path,
    fogPath?: Path,
    entityGuid?: string,
    maps?: Array<Map>,
    map?: Map,
    tokens?: Array<Token>,
    token?: Token,
    character?: Character,
    width?: number,
    height?: number,
    fogEnabled?: boolean,
    message?: Message,
    game?: Game,
    mapState?: MapState,
    tokenState?: TokenState,
    chatState?: ChatState,
    characterState?: CharacterState,
}

interface FormattedWebSocketPayload extends WebSocketPayload {
    fromGuid: string,
    fromUsername: string,
    room: string,
}

const sendData = (webSocket: WebSocket, wsSettings: IWsSettings, data: WebSocketPayload) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN)
        webSocket.send(JSON.stringify(formatPayload(wsSettings, data)))
    else
        console.error('no websocket')
}

const formatPayload = (wsSettings: IWsSettings, data: WebSocketPayload): FormattedWebSocketPayload => {
    return {
        ...data,
        fromGuid: wsSettings.guid,
        fromUsername: wsSettings.username,
        room: wsSettings.room,
    }
}

export const pushCursor = (webSocket: WebSocket, wsSettings: IWsSettings, x: number, y: number) => {
    sendData(webSocket, wsSettings, {
        type: 'pushCursor',
        x: x,
        y: y,
    })
}

export const pushDrawPath = (webSocket: WebSocket, wsSettings: IWsSettings, newDrawPath: Path) => {
    sendData(webSocket, wsSettings, {
        type: 'pushDrawPath',
        drawPath: newDrawPath,
    })
}

export const pushDrawReset = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, wsSettings, {
        type: 'pushDrawReset',
    })
}

export const pushFogPath = (webSocket: WebSocket, wsSettings: IWsSettings, newFogPath: Path) => {
    sendData(webSocket, wsSettings, {
        type: 'pushFogPath',
        fogPath: newFogPath,
    })
}

export const pushFogReset = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, wsSettings, {
        type: 'pushFogReset',
    })
}

export const pushMapState = (webSocket: WebSocket, wsSettings: IWsSettings, maps: Array<Map>, mapId: number) => {
    sendData(webSocket, wsSettings, {
        type: 'pushMapState',
        maps: maps,
    })
}

export const pushMapId = (webSocket: WebSocket, wsSettings: IWsSettings, mapId: number) => {
    sendData(webSocket, wsSettings, {
        type: 'pushMapId',
        mapId: mapId,
    })
}

export const pushCreateMap = (webSocket: WebSocket, wsSettings: IWsSettings, newMap: Map) => {
    sendData(webSocket, wsSettings, {
        type: 'pushCreateMap',
        map: newMap,
    })
}

export const pushFogEnabled = (webSocket: WebSocket, wsSettings: IWsSettings, newFogEnabled: boolean) => {
    sendData(webSocket, wsSettings, {
        type: 'pushFogEnabled',
        fogEnabled: newFogEnabled,
    })
}

export const pushGameRefresh = (webSocket: WebSocket, wsSettings: IWsSettings, newGame: Game, newMapState: MapState, newTokenState: TokenState, newChatState: ChatState, newCharacterState: CharacterState) => {
    sendData(webSocket, wsSettings, {
        type: 'pushGameRefresh',
        game: newGame,
        mapState: newMapState,
        tokenState: newTokenState,
        chatState: newChatState,
        characterState: newCharacterState,
    })
}

export const pushSingleToken = (webSocket: WebSocket, wsSettings: IWsSettings, token: Token) => {
    sendData(webSocket, wsSettings, {
        type: 'pushSingleToken',
        token: token,
    })
}

export const deleteSingleToken = (webSocket: WebSocket, wsSettings: IWsSettings, tokenGuid: string) => {
    sendData(webSocket, wsSettings, {
        type: 'deleteSingleToken',
        entityGuid: tokenGuid,
    })
}

export const pushTokens = (webSocket: WebSocket, wsSettings: IWsSettings, tokens: Array<Token>) => {
    sendData(webSocket, wsSettings, {
        type: 'pushTokens',
        tokens: tokens,
    })
}

export const requestRefresh = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, wsSettings, {
        type: 'requestRefresh',
    })
}

export const sendChatMessage = (webSocket: WebSocket, wsSettings: IWsSettings, newMessage: Message) => {
    sendData(webSocket, wsSettings, {
        type: 'sendChatMessage',
        message: newMessage,
    })
}

export const pushAssignCharacter = (webSocket: WebSocket, wsSettings: IWsSettings, username: string, characterGuid: string) => {
    sendData(webSocket, wsSettings, {
        type: 'pushAssignCharacter',
        targetUsername: username,
        entityGuid: characterGuid,
    })
}

export const pushUpdateCharacter = (webSocket: WebSocket, wsSettings: IWsSettings, updatedCharacter: Character) => {
    sendData(webSocket, wsSettings, {
        type: 'pushUpdateCharacter',
        character: updatedCharacter,
    })
}

export const ping = (webSocket: WebSocket, wsSettings: IWsSettings, username: string) => {
    sendData(webSocket, wsSettings, {
        type: 'ping',
    })
}
