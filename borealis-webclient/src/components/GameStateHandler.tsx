import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DataReceiver from './DataReceiver'
import Game from './Game'
import GameSetup from './GameSetup'
import { createWebSocket } from '../contexts/WebSocketProvider'
import UserType from '../enums/UserType'
import { useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState, setGameSettings } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { WEBSOCKET_OPEN_CONNECTION } from '../utils/loadingTasks'

interface GameStateHandlerProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
    setGameSettings: (arg0: UserType, arg1: string, arg2: string) => void,
}

const GameStateHandler = ({ metadataState, settingsState, setGameSettings }: GameStateHandlerProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    useEffect(() => {
        const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
        if (webSocketContext.wsSettings)
            setGameSettings(params.get('host') ? UserType.host : UserType.player, params.get('room') || '', webSocketContext.wsSettings.guid)
        /*
        setWsSettings({
            ...wsSettings,
            room: params.get('room'),
            isHost: params.get('host') ? true : false,
        })
        */
    }, [])

    useEffect(() => {
        if (metadataState.room)
            document.title = `Borealis D&D, Room: ${metadataState.room}`
        else
            document.title = 'Borealis D&D'

        if (!webSocketContext.setWsSettings || !webSocketContext.wsSettings || !webSocketContext.setWs)
            return

        if ((metadataState.room !== '') && (settingsState.username !== '')) {
            webSocketContext.setWsSettings({
                ...webSocketContext.wsSettings,
                room: metadataState.room,
                username: settingsState.username,
                isHost: metadataState.userType === UserType.host,
            })

            loadingContext.startLoadingTask(WEBSOCKET_OPEN_CONNECTION)
            const newWebSocket = createWebSocket(metadataState.room, metadataState.userGuid, settingsState.username, metadataState.userType === UserType.host)
            if (newWebSocket) {
                const stopLoading = () => {
                    loadingContext.stopLoadingTask(WEBSOCKET_OPEN_CONNECTION)
                }
                newWebSocket.addEventListener('close', stopLoading)
                newWebSocket.addEventListener('open', stopLoading)
                newWebSocket.addEventListener('error', stopLoading)
                webSocketContext.setWs(newWebSocket)
            } else {
                loadingContext.stopLoadingTask(WEBSOCKET_OPEN_CONNECTION)
            }
        }
    }, [ metadataState.room, settingsState.username, metadataState.userType ])

    return(
        <>
            <DataReceiver />
            { (webSocketContext.ws && (webSocketContext.ws.readyState === 1))
                ? <Game />
                : <GameSetup />
            }
        </>
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStateHandler)
