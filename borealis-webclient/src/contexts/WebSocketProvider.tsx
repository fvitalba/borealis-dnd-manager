import React, { useEffect, useState, createContext } from 'react'
import { useLoading } from '../hooks/useLoading'
import guid from '../controllers/guid'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const SOCKET_RECONNECTION_TIMEOUT = 2500
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const generateWebSocketUrl = (room, guid, username, isHost) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'

    const webSocketUrl = DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/${room}?guid=${guid}`
        : `${protocol}://${host}/${room}?guid=${guid}`

    const userParam = username ? `&username=${username}` : ''
    const hostParam = (isHost !== undefined) ? `&isHost=${isHost}` : ''

    return webSocketUrl + userParam + hostParam
}

export const createWebSocket = (room, guid, username, isHost) => {
    if (room && username) {
        const webSocketUrl = generateWebSocketUrl(room, guid, username, isHost)
        return new WebSocket(webSocketUrl)
    } else {
        return undefined
    }
}

export const WebSocketContext = createContext(createWebSocket('',''))

const WebSocketProvider = ({ children }) => {
    const [wsSettings, setWsSettings] = useState({
        guid: guid(),
        username: '',
        room: '',
        isHost: false,
    })
    const [ws, setWs] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setIsLoading(true)
                console.debug('Socket Timeout, recreating WebSocket')
                setWs(createWebSocket(wsSettings.room, wsSettings.guid, wsSettings.username, wsSettings.isHost))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            // When the WebSocket is open, close the loading screen
            setIsLoading(false)
        }

        const onError = (err) => {
            setIsLoading(false)
            console.error('WebSocket could not be created. Error: ', err)
        }

        if (ws) {
            ws.addEventListener('close', onClose)
            ws.addEventListener('open', onOpen)
            ws.addEventListener('error', onError)
        }

        return () => {
            if (ws) {
                ws.removeEventListener('close', onClose)
                ws.removeEventListener('open', onOpen)
                ws.removeEventListener('error', onError)
            }
        }
    }, [ ws, setWs, wsSettings ])

    return (
        <WebSocketContext.Provider value={ [ws, wsSettings, setWsSettings, setWs] }>{ children }</WebSocketContext.Provider>
    )
}

export default WebSocketProvider
