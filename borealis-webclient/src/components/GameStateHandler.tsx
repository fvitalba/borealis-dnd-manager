import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { createWebSocket } from '../contexts/WebSocketProvider'
import { MetadataState, setGameSettings } from '../reducers/metadataReducer'
import Game from './Game'
import GameSetup from './GameSetup'
import StateInterface from '../interfaces/StateInterface'
import { SettingsState } from '../reducers/settingsReducer'
import DataReceiver from './DataReceiver'

interface GameStateHandlerProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
    setGameSettings: () => void,
}

const GameStateHandler = ({ metadataState, settingsState, setGameSettings }: GameStateHandlerProps) => {
    // eslint-disable-next-line no-unused-vars
    const [webSocket, wsSettings, setWsSettings, setWs] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

    useEffect(() => {
        const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
        setGameSettings(params.get('host') ? true : false, params.get('room'), wsSettings.guid)
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

        if ((metadataState.room !== '') && (settingsState.username !== '')) {
            setWsSettings({
                ...wsSettings,
                room: metadataState.room,
                username: settingsState.username,
                isHost: metadataState.isHost,
            })

            setIsLoading(true)
            const newWebSocket = createWebSocket(metadataState.room, metadataState.guid, settingsState.username, metadataState.isHost)
            if (newWebSocket) {
                newWebSocket.addEventListener('close', () => setIsLoading(false))
                newWebSocket.addEventListener('open', () => setIsLoading(false))
                newWebSocket.addEventListener('error', () => setIsLoading(false))
                setWs(newWebSocket)
            } else {
                setIsLoading(false)
            }
        }
    }, [ metadataState.room, settingsState.username, metadataState.isHost ])

    return(
        <DataReceiver>
            { (webSocket && (webSocket.readyState === 1))
                ? <Game />
                : <GameSetup />
            }
        </DataReceiver>
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadata: state.metadata,
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStateHandler)
