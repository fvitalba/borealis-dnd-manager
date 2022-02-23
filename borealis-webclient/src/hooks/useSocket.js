import { useContext } from 'react'
import { WebSocketContext } from '../contexts/WebSocketProvider'

export const useWebSocket = () => {
    const webSocket = useContext(WebSocketContext)
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
        x: x,
        y: y,
    })
}

export const pushDrawPath = (webSocket, wsSettings, newDrawPath) => {
    sendData(webSocket, {
        type: 'pushDrawPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        drawPath: newDrawPath,
    })
}

export const pushDrawReset = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'pushDrawReset',
        from: wsSettings.guid,
        username: wsSettings.username,
    })
}

export const pushFogPath = (webSocket, wsSettings, newFogPath) => {
    sendData(webSocket, {
        type: 'pushFogPath',
        from: wsSettings.guid,
        username: wsSettings.username,
        fogPath: newFogPath,
    })
}

export const pushFogReset = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'pushFogReset',
        from: wsSettings.guid,
        username: wsSettings.username,
    })
}

export const pushMapState = (webSocket, wsSettings, maps, mapId) => {
    sendData(webSocket, {
        type: 'pushMapState',
        from: wsSettings.guid,
        username: wsSettings.username,
        maps: maps,
        mapId: mapId,
    })
}

export const pushMapId = (webSocket, wsSettings, mapId) => {
    sendData(webSocket, {
        type: 'pushMapId',
        from: wsSettings.guid,
        username: wsSettings.username,
        mapId: mapId,
    })
}

export const pushCreateMap = (webSocket, wsSettings, newMapName, newWidth, newHeight) => {
    sendData(webSocket, {
        type: 'pushCreateMap',
        from: wsSettings.guid,
        mapName: newMapName,
        width: newWidth,
        height: newHeight,
    })
}

export const pushFogEnabled = (webSocket, wsSettings, newFogEnabled) => {
    sendData(webSocket, {
        type: 'pushFogEnabled',
        from: wsSettings.guid,
        fogEnabled: newFogEnabled,
    })
}

export const pushGameRefresh = (webSocket, wsSettings, game, additionalAttributes) => {
    sendData(webSocket, {
        type: 'pushGameRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
        game: game,
        ...additionalAttributes,
    })
}

export const pushSingleToken = (webSocket, wsSettings, token) => {
    sendData(webSocket, {
        type: 'pushSingleToken',
        from: wsSettings.guid,
        token: token,
    })
}

export const pushTokens = (webSocket, wsSettings, tokens) => {
    sendData(webSocket, {
        type: 'pushTokens',
        from: wsSettings.guid,
        tokens: tokens,
    })
}

export const requestRefresh = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'requestRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
    })
}

export const saveGame = (webSocket, wsSettings, json) => {
    sendData(webSocket, {
        type: 'saveGame',
        from: wsSettings.guid,
        room: wsSettings.room,
        payload: json,
    })
}

export const requestLoadGame = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'requestLoadGame',
        from: wsSettings.guid,
        room: wsSettings.room,
    })
}

export const saveGameToDatabase = (webSocket, wsSettings, json) => {
    sendData(webSocket, {
        type: 'saveGameToDatabase',
        from: wsSettings.guid,
        room: wsSettings.room,
        payload: json,
    })
}

export const requestLoadGameFromDatabase = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'requestLoadGameFromDatabase',
        from: wsSettings.guid,
        room: wsSettings.room,
    })
}
