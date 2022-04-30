import React, { useEffect, useState, createContext, ReactNode } from 'react'
import UserType from '../enums/UserType'
import { useLoading } from '../hooks/useLoading'
import guid from '../utils/guid'
import { WEBSOCKET_OPEN_CONNECTION } from '../utils/loadingTasks'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const SOCKET_RECONNECTION_TIMEOUT = 2500
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const generateWebSocketUrl = (roomId: string, socketGuid: string, userGuid: string, userType?: UserType) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'

    const webSocketUrl = DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/?roomId=${roomId}&socketGuid=${socketGuid}`
        : `${protocol}://${host}/?roomId=${roomId}&socketGuid=${socketGuid}`

    const userParam = userGuid ? `&userGuid=${userGuid}` : ''
    const hostParam = (userType !== undefined) ? `&userType=${userType}` : ''

    return webSocketUrl + userParam + hostParam
}

export const createWebSocket = (roomId: string, socketGuid: string, userGuid?: string, userType?: UserType) : WebSocket | null => {
    if (roomId && userGuid) {
        const webSocketUrl = generateWebSocketUrl(roomId, socketGuid, userGuid, userType)
        return new WebSocket(webSocketUrl)
    } else {
        return null
    }
}

export interface IWsSettings {
    socketGuid: string,
    userGuid: string,
    roomId: string,
    userType: UserType,
    sessionToken: string,
}

export interface IWebSocketContext {
    ws: WebSocket | null,
    wsSettings: IWsSettings,
    setWs: (arg0: WebSocket) => void,
    setWsSettings: (arg0: IWsSettings) => void,
}

export const WebSocketContext = createContext<IWebSocketContext>({
    ws: null,
    wsSettings: {
        socketGuid: guid(),
        userGuid: '',
        roomId: '',
        userType: UserType.player,
        sessionToken: '',
    },
    setWs: () => null,
    setWsSettings: () => null,
})

const WebSocketProvider = ({ children } : { children: ReactNode }) => {
    const [wsSettings, setWsSettings] = useState<IWsSettings>({
        socketGuid: guid(),
        userGuid: '',
        roomId: '',
        userType: UserType.player,
        sessionToken: '',
    })
    const [ws, setWs] = useState<WebSocket | null>(null)
    const loadingContext = useLoading()

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                loadingContext.startLoadingTask(WEBSOCKET_OPEN_CONNECTION)
                console.debug('Socket Timeout, recreating WebSocket')
                setWs(createWebSocket(wsSettings.roomId, wsSettings.socketGuid, wsSettings.userGuid, wsSettings.userType))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            // When the WebSocket is open, close the loading screen
            loadingContext.stopLoadingTask(WEBSOCKET_OPEN_CONNECTION)
        }

        const onError = (err: Event) => {
            loadingContext.stopLoadingTask(WEBSOCKET_OPEN_CONNECTION)
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
