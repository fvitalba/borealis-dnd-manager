import { useContext } from 'react'
import { WebSocketContext } from '../contexts/WebSocketProvider'

export const useWebSocket = () => {
    const webSocket = useContext(WebSocketContext)
    if (!webSocket) {
        throw new Error('useSocket must be used with WebSocketContext')
    }
    return webSocket
}

const sendData = (webSocket, data) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN)
        webSocket.send(JSON.stringify(data))
    else
        console.error('no websocket')
}

export const pushCursor = (webSocket, wsSettings, x, y) => {
    sendData(webSocket, {
        type: 'pushCursor',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        x: x,
        y: y,
    })
}

export const pushDrawPath = (webSocket, wsSettings, newDrawPath) => {
    sendData(webSocket, {
        type: 'pushDrawPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        drawPath: newDrawPath,
    })
}

export const pushDrawReset = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'pushDrawReset',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const pushFogPath = (webSocket, wsSettings, newFogPath) => {
    sendData(webSocket, {
        type: 'pushFogPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        fogPath: newFogPath,
    })
}

export const pushFogReset = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'pushFogReset',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const pushMapState = (webSocket, wsSettings, maps, mapId) => {
    sendData(webSocket, {
        type: 'pushMapState',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        maps: maps,
        mapId: mapId,
    })
}

export const pushMapId = (webSocket, wsSettings, mapId) => {
    sendData(webSocket, {
        type: 'pushMapId',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        mapId: mapId,
    })
}

export const pushCreateMap = (webSocket, wsSettings, newMapName, newWidth, newHeight) => {
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

export const pushFogEnabled = (webSocket, wsSettings, newFogEnabled) => {
    sendData(webSocket, {
        type: 'pushFogEnabled',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        fogEnabled: newFogEnabled,
    })
}

export const pushGameRefresh = (webSocket, wsSettings, game, chat, additionalAttributes) => {
    sendData(webSocket, {
        type: 'pushGameRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        game: game,
        chat: chat,
        ...additionalAttributes,
    })
}

export const pushSingleToken = (webSocket, wsSettings, token) => {
    sendData(webSocket, {
        type: 'pushSingleToken',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        token: token,
    })
}

export const deleteSingleToken = (webSocket, wsSettings, tokenGuid) => {
    sendData(webSocket, {
        type: 'deleteSingleToken',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        tokenGuid: tokenGuid,
    })
}

export const pushTokens = (webSocket, wsSettings, tokens) => {
    sendData(webSocket, {
        type: 'pushTokens',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
        tokens: tokens,
    })
}

export const requestRefresh = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'requestRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
        room: wsSettings.room,
    })
}

export const sendChatMessage = (webSocket, wsSettings, username, playerInfo, publicMessageText, privateMessageText, targetUsername, timestamp, typeOfMessage) => {
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

export const assignCharacter = (webSocket, wsSettings, username, characterGuid) => {
    sendData(webSocket, {
        type: 'assignCharacter',
        from: wsSettings.guid,
        username: username,
        characterGuid: characterGuid,
    })
}
