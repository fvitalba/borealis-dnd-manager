import React, { useEffect, useState, createContext } from 'react'
import { connect } from 'react-redux'
import { requestRefresh } from '../hooks/useSocket'
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

const createWebSocket = (room, guid, username, isHost) => {
    if (room) {
        const webSocketUrl = generateWebSocketUrl(room, guid, username, isHost)
        return new WebSocket(webSocketUrl)
    } else {
        return undefined
    }
}

export const WebSocketContext = createContext(createWebSocket('',''))

const saveIdToLocalStorage = (roomName, localGuid) => {
    localStorage.setItem(`borealis-${roomName}`, localGuid)
}

const readIdFromLocalStorage = (roomName) => {
    const localGuid = localStorage.getItem(`borealis-${roomName}`)
    return localGuid ? localGuid : guid()
}

const WebSocketProvider = ({ children, metadata }) => {
    const [wsSettings, setWsSettings] = useState({
        guid: readIdFromLocalStorage(metadata.room),
        username: '',
        room: metadata.room,
        isHost: metadata.isHost,
    })
    const [ws, setWs] = useState(createWebSocket(metadata.room, wsSettings.guid, wsSettings.username, wsSettings.isHost))
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

    useEffect(() => {
        const localGuid = readIdFromLocalStorage(metadata.room)
        if (localGuid !== wsSettings.guid)
            setWsSettings({
                ...wsSettings,
                guid: localGuid,
            })
    }, [ metadata.room ])

    useEffect(() => {
        setWs(createWebSocket(metadata.room, wsSettings.guid, wsSettings.username, wsSettings.isHost))
    }, [ metadata.room, wsSettings.guid, wsSettings.username, wsSettings.isHost ])

    useEffect(() => {
        const onClose = () => {
            setIsLoading(true)
            setTimeout(() => {
                console.debug('Socket Timeout, recreating WebSocket')
                setWs(createWebSocket(metadata.room, wsSettings.guid, wsSettings.username, wsSettings.isHost))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            saveIdToLocalStorage(wsSettings.room, wsSettings.guid)
            if (!metadata.isHost) {
                setIsLoading(true)
                requestRefresh(ws, wsSettings)
            }
            if ((metadata.room && !wsSettings.room) || ((metadata.isHost !== undefined) && (wsSettings.isHost === undefined)))
                setWsSettings({
                    ...wsSettings,
                    room: metadata.room,
                    isHost: metadata.isHost,
                })
            setIsLoading(false)
        }

        const onError = (err) => {
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
    }, [ ws, setWs, wsSettings, metadata ])

    return (
        <WebSocketContext.Provider value={ [ws, wsSettings, setWsSettings] }>{ children }</WebSocketContext.Provider>
    )
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata,
    }
}

export default connect(mapStateToProps, undefined)(WebSocketProvider)
