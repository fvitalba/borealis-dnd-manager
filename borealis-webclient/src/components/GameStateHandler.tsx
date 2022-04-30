import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DataReceiver from './DataReceiver'
import Game from './Game'
import GameSetup from './GameSetup'
import LoadingOverlay from './LoadingOverlay'
import UserManager from './UserManager'
import { createWebSocket } from '../contexts/WebSocketProvider'
import UserType from '../enums/UserType'
import { useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState, setGameSettings } from '../reducers/metadataReducer'
import { WEBSOCKET_OPEN_CONNECTION } from '../utils/loadingTasks'
import guid from '../utils/guid'

interface GameStateHandlerProps {
    metadataState: MetadataState,
    setGameSettings: (userType: UserType, userGuid: string, isGuest: boolean, roomName: string, roomGuid: string) => void,
}

const GameStateHandler = ({ metadataState, setGameSettings }: GameStateHandlerProps) => {
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    useEffect(() => {
        const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
        const userTypeParam = params.get('userType')
        let userType : UserType | null
        switch (userTypeParam?.toUpperCase()) {
        case 'HOST':
            userType = UserType.host
            break
        case 'PLAYER':
            userType = UserType.player
            break
        default:
            userType = null
        }

        //TODO: fix connection from url for guest users
        const roomId = params.get('roomId') || ''
        const roomName = params.get('roomName') || ''
        if (roomId !== '') {
            setGameSettings(userType !== null ? userType : UserType.player, guid(), true, roomName, roomId)
            const newWsSettings = webSocketContext.wsSettings
            newWsSettings.roomId = roomId
            if (userType !== null)
                newWsSettings.userType = userType
            webSocketContext.setWsSettings(newWsSettings)
        }
    }, [])

    useEffect(() => {
        if (metadataState.roomName)
            document.title = `Borealis D&D, Room: ${metadataState.roomName}`
        else
            document.title = 'Borealis D&D'

        if ((metadataState.roomGuid !== '') && (metadataState.userGuid !== '')) {
            webSocketContext.setWsSettings({
                ...webSocketContext.wsSettings,
                roomId: metadataState.roomGuid,
                userGuid: metadataState.userGuid,
                userType: metadataState.userType,
            })

            loadingContext.startLoadingTask(WEBSOCKET_OPEN_CONNECTION)
            const newWebSocket = createWebSocket(metadataState.roomGuid, guid(), metadataState.userGuid, metadataState.userType)
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
    }, [ metadataState.roomGuid, metadataState.userGuid, metadataState.roomName, metadataState.userType ])

    const gameIsSetUp = (webSocketContext.ws && (webSocketContext.ws.readyState === 1)) && ((metadataState.roomGuid !== '') && (metadataState.userGuid !== ''))
    return(
        <>
            <DataReceiver />
            <UserManager />
            { gameIsSetUp
                ? <Game />
                : <GameSetup />
            }
            <LoadingOverlay />
        </>
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStateHandler)
