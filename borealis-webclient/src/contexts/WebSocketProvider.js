import React, { useEffect, useState, createContext } from 'react'
import { connect } from 'react-redux'
import { requestRefresh } from '../hooks/useSocket.js'
import guid from '../controllers/guid.js'
require('dotenv').config()

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
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
    if (room) {
        const webSocketUrl = generateWebSocketUrl(room, guid)
        return new WebSocket(webSocketUrl)
    } else {
        return undefined
    }
}

export const WebSocketContext = createContext(createWebSocket('',''))

const WebSocketProvider = ({ children, metadata }) => {
    const [wsSettings, setWsSettings] = useState({
        guid: guid(),
        username: '',
    })
    const [ws, setWs] = useState(createWebSocket(metadata.room, wsSettings.guid))

    useEffect(() => {
        setWs(createWebSocket(metadata.room, wsSettings.guid))
    }, [metadata.room, wsSettings.guid])

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                console.log('Socket Timeout, recreating WebSocket')
                setWs(createWebSocket(metadata.room, wsSettings.guid))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            if (!metadata.isHost) {
                requestRefresh(ws, wsSettings)
            }
        }

        const onError = (err) => {
            console.error('WebSocket could not be created. Error: ',err)
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
