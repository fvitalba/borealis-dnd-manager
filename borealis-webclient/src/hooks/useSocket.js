import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketProvider";

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

export const pushCursor = (webSocket, wsSettings, x, y, username) => {
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
    //TODO: pushSingleToken
    /*
    const tokenCopy = Object.assign({}, token)
    this.scrubObject(tokenCopy)
    const data = {type: 'pushSingleToken', i: index, a: tokenCopy}
    this.send(data)
    */
}

export const pushTokens = (webSocket, wsSettings, tokens) => {
    //TODO: pushTokens
    /*
    if (!tokens)
        return
    const tokensCopy = JSON.parse(JSON.stringify(tokens))
    const data = { type: 'pushTokens', tokens: tokensCopy }
    data.tokens.forEach(token => this.scrubObject(token))
    this.send(data)
    */
}

export const requestRefresh = (webSocket, wsSettings) => {
    sendData(webSocket, {
        type: 'requestRefresh',
        from: wsSettings.guid,
        username: wsSettings.username,
    })
}
