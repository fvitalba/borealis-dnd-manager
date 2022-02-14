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

export const pushCursor = (webSocket, webSocketGuid, x, y, username) => {
    sendData(webSocket, {
        type: 'pushCursor',
        from: webSocketGuid,
        username: username,
        x: x,
        y: y,
    })
}

export const pushDrawPath = (webSocket, webSocketGuid, newDrawPath) => {
    sendData(webSocket, {
        type: 'pushDrawPath',
        from: webSocketGuid,
        drawPath: newDrawPath,
    })
}

export const pushDrawReset = (webSocket, webSocketGuid) => {
    sendData(webSocket, {
        type: 'pushDrawReset',
        from: webSocketGuid,
    })
}

export const pushFogPath = (webSocket, webSocketGuid, newFogPath) => {
    sendData(webSocket, {
        type: 'pushFogPath',
        from: webSocketGuid,
        fogPath: newFogPath,
    })
}

export const pushFogReset = (webSocket, webSocketGuid) => {
    sendData(webSocket, {
        type: 'pushFogReset',
        from: webSocketGuid,
    })
}

export const pushMapState = (webSocket, webSocketGuid, maps, mapId) => {
    sendData(webSocket, {
        type: 'pushMapState',
        from: webSocketGuid,
        maps: maps,
        mapId: mapId,
    })
}

export const pushMapId = (webSocket, webSocketGuid, mapId) => {
    sendData(webSocket, {
        type: 'pushMapId',
        from: webSocketGuid,
        mapId: mapId,
    })
}

export const pushGameRefresh = (webSocket, webSocketGuid, game, additionalAttributes) => {
    sendData(webSocket, {
        type: 'pushGameRefresh',
        from: webSocketGuid,
        game: game,
        ...additionalAttributes,
    })
}

export const pushSingleToken = (webSocket, webSocketGuid, token) => {
    //TODO: pushSingleToken
    /*
    const tokenCopy = Object.assign({}, token)
    this.scrubObject(tokenCopy)
    const data = {type: 'pushSingleToken', i: index, a: tokenCopy}
    this.send(data)
    */
}

export const pushTokens = (webSocket, webSocketGuid, tokens) => {
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

export const requestRefresh = (webSocket, webSocketGuid) => {
    sendData(webSocket, {
        type: 'requestRefresh',
        from: webSocketGuid,
    })
}
