import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { createWebSocket } from '../contexts/WebSocketProvider'
import { setGameSettings } from '../reducers/metadataReducer'
import Game from './Game'
import GameSetup from './GameSetup'

const GameStateHandler = ({ metadata, settings, setGameSettings }) => {
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
        if (metadata.room)
            document.title = `Borealis D&D, Room: ${metadata.room}`
        else
            document.title = 'Borealis D&D'

        if ((metadata.room !== '') && (settings.username !== '')) {
            setWsSettings({
                ...wsSettings,
                room: metadata.room,
                username: settings.username,
                isHost: metadata.isHost,
            })

            setIsLoading(true)
            const newWebSocket = createWebSocket(metadata.room, metadata.guid, settings.username, metadata.isHost)
            if (newWebSocket) {
                newWebSocket.addEventListener('close', () => setIsLoading(false))
                newWebSocket.addEventListener('open', () => setIsLoading(false))
                newWebSocket.addEventListener('error', () => setIsLoading(false))
                setWs(newWebSocket)
            } else {
                setIsLoading(false)
            }
        }
    }, [ metadata.room, settings.username, metadata.isHost ])

    if (webSocket && (webSocket.readyState === 1)) {
        return (<Game />)
    } else {
        return (<GameSetup />)
    }
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata,
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStateHandler)
