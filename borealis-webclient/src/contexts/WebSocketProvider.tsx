import React, { useEffect, useState, createContext } from 'react'
import { useLoading } from '../hooks/useLoading'
import guid from '../controllers/guid'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const SOCKET_RECONNECTION_TIMEOUT = 2500
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const generateWebSocketUrl = (room: string, guid: string, username: string, isHost?: boolean) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'

    const webSocketUrl = DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/${room}?guid=${guid}`
        : `${protocol}://${host}/${room}?guid=${guid}`

    const userParam = username ? `&username=${username}` : ''
    const hostParam = (isHost !== undefined) ? `&isHost=${isHost}` : ''

    return webSocketUrl + userParam + hostParam
}

export const createWebSocket = (room: string, guid: string, username?: string, isHost?: boolean) : WebSocket | null => {
    if (room && username) {
        const webSocketUrl = generateWebSocketUrl(room, guid, username, isHost)
        return new WebSocket(webSocketUrl)
    } else {
        return null
    }
}

export interface IWsSettings {
    guid: string,
    username: string,
    room: string,
    isHost: boolean,
}

export interface IWebSocketContext {
    ws: WebSocket | null,
    wsSettings?: IWsSettings,
    setWs?: (arg0: WebSocket) => void,
    setWsSettings?: (arg0: IWsSettings) => void,
}

export const WebSocketContext = createContext<IWebSocketContext>({ ws: null })

const WebSocketProvider = ({ children } : { children: JSX.Element }) => {
    const [wsSettings, setWsSettings] = useState<IWsSettings>({
        guid: guid(),
        username: '',
        room: '',
        isHost: false,
    })
    const [ws, setWs] = useState<WebSocket | null>(null)
    // eslint-disable-next-line no-unused-vars
    const { isLoading, setIsLoading } = useLoading()

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                if (setIsLoading)
                    setIsLoading(true)
                console.debug('Socket Timeout, recreating WebSocket')
                setWs(createWebSocket(wsSettings.room, wsSettings.guid, wsSettings.username, wsSettings.isHost))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            // When the WebSocket is open, close the loading screen
            if (setIsLoading)
                setIsLoading(false)
        }

        const onError = (err: Event) => {
            if (setIsLoading)
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
        <WebSocketContext.Provider value={{ ws, wsSettings, setWs, setWsSettings }}>{ children }</WebSocketContext.Provider>
    )
}

export default WebSocketProvider
