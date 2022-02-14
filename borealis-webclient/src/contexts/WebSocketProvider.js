import React, { useEffect, useState, createContext } from 'react'
import guid from '../controllers/guid.js'
require('dotenv').config()

const DEBUG_MODE = process.env.REACT_APP_DEBUG ? process.env.REACT_APP_DEBUG : false
const SOCKET_RECONNECTION_TIMEOUT = 2500
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const generateWebSocketUrl = (room, guid) => {
    let host = window.location.host.replace(/:\d+$/, '')
	const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/${room}?guid=${guid}`
        : `${protocol}://${host}/${room}?guid=${guid}`
}

const createWebSocket = (room, guid) => {
    console.log('creating websocket, room:',room,'guid:',guid)
    const webSocketUrl = generateWebSocketUrl(room, guid)
    console.log('connecting to: ',webSocketUrl)
    return new WebSocket(webSocketUrl)
}

export const WebSocketContext = createContext(createWebSocket('',''))

export const WebSocketProvider = ({ children, room }) => {
    const [wsSettings, setWsSettings] = useState({
        room: room, 
        guid: guid(),
    })
    const [ws, setWs] = useState(createWebSocket(wsSettings.room, wsSettings.guid))

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setWs(createWebSocket(room, guid))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        ws.addEventListener('close', onClose)

        return () => {
            ws.removeEventListener('close', onClose)
        }
    }, [ws, setWs])

    return (
        <WebSocketContext.Provider value={ [ws, wsSettings] }>{ children }</WebSocketContext.Provider>
    )
}
