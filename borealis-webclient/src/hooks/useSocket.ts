import React, { useContext } from 'react'
import { WebSocketContext, IWsSettings, IWebSocketContext } from '../contexts/WebSocketProvider'

export const useWebSocket = (): IWebSocketContext => {
    const webSocket = useContext(WebSocketContext)
    if (!webSocket) {
        throw new Error('useSocket must be used with WebSocketContext')
    }
    return webSocket
}

const sendData = (webSocket: WebSocket, data: any) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN)
        webSocket.send(JSON.stringify(data))
    else
        console.error('no websocket')
}

export const pushCursor = (webSocket: WebSocket, wsSettings: IWsSettings, x: number, y: number) => {
    sendData(webSocket, {
        type: 'pushCursor',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        x: x,
        y: y,
    })
}

export const pushDrawPath = (webSocket: WebSocket, wsSettings: IWsSettings, newDrawPath) => {
    sendData(webSocket, {
        type: 'pushDrawPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        drawPath: newDrawPath,
    })
}

export const pushDrawReset = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, {
        type: 'pushDrawReset',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const pushFogPath = (webSocket: WebSocket, wsSettings: IWsSettings, newFogPath) => {
    sendData(webSocket, {
        type: 'pushFogPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        fogPath: newFogPath,
    })
}

export const pushFogReset = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, {
        type: 'pushFogReset',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const pushMapState = (webSocket: WebSocket, wsSettings: IWsSettings, maps, mapId: number) => {
    sendData(webSocket, {
        type: 'pushMapState',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        maps: maps,
        mapId: mapId,
    })
}

export const pushMapId = (webSocket: WebSocket, wsSettings: IWsSettings, mapId: number) => {
    sendData(webSocket, {
        type: 'pushMapId',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        mapId: mapId,
    })
}

export const pushCreateMap = (webSocket: WebSocket, wsSettings: IWsSettings, newMapName: string, newWidth: number, newHeight: number) => {
    sendData(webSocket, {
        type: 'pushCreateMap',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        mapName: newMapName,
        width: newWidth,
        height: newHeight,
    })
}

export const pushFogEnabled = (webSocket: WebSocket, wsSettings: IWsSettings, newFogEnabled: boolean) => {
    sendData(webSocket, {
        type: 'pushFogEnabled',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        fogEnabled: newFogEnabled,
    })
}

export const pushGameRefresh = (webSocket: WebSocket, wsSettings: IWsSettings, game, chat, characters, additionalAttributes) => {
    sendData(webSocket, {
        type: 'pushGameRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        game: game,
        chat: chat,
        characters: characters,
        ...additionalAttributes,
    })
}

export const pushSingleToken = (webSocket: WebSocket, wsSettings: IWsSettings, token) => {
    sendData(webSocket, {
        type: 'pushSingleToken',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        token: token,
    })
}

export const deleteSingleToken = (webSocket: WebSocket, wsSettings: IWsSettings, tokenGuid: string) => {
    sendData(webSocket, {
        type: 'deleteSingleToken',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        tokenGuid: tokenGuid,
    })
}

export const pushTokens = (webSocket: WebSocket, wsSettings: IWsSettings, tokens) => {
    sendData(webSocket, {
        type: 'pushTokens',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        tokens: tokens,
    })
}

export const requestRefresh = (webSocket: WebSocket, wsSettings: IWsSettings) => {
    sendData(webSocket, {
        type: 'requestRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const sendChatMessage = (webSocket: WebSocket, wsSettings: IWsSettings, username: string, playerInfo, publicMessageText, privateMessageText, targetUsername, timestamp, typeOfMessage) => {
    sendData(webSocket, {
        type: 'sendChatMessage',
        from: wsSettings.guid,
        username: username,
        targetUsername: targetUsername,
        room: wsSettings.room,
        playerInfo: playerInfo,
        publicMessageText: publicMessageText,
        privateMessageText: privateMessageText,
        typeOfMessage: typeOfMessage,
        timestamp: timestamp,
    })
}

export const pushAssignCharacter = (webSocket: WebSocket, wsSettings: IWsSettings, username: string, characterGuid: string) => {
    sendData(webSocket, {
        type: 'pushAssignCharacter',
        from: wsSettings.guid,
        username: username,
        characterGuid: characterGuid,
    })
}

export const pushUpdateCharacter = (webSocket: WebSocket, wsSettings: IWsSettings, updatedCharacter) => {
    sendData(webSocket, {
        type: 'pushUpdateCharacter',
        from: wsSettings.guid,
        updateCharacter: updatedCharacter,
    })
}

export const ping = (webSocket: WebSocket, wsSettings: IWsSettings, username: string) => {
    sendData(webSocket, {
        type: 'ping',
        from: wsSettings.guid,
        username: username,
    })
}
