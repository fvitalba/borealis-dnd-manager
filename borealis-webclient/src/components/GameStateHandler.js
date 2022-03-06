import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useWebSocket } from '../hooks/useSocket'
import { setGameSettings } from '../reducers/metadataReducer'
import Game from './Game'
import GameSetup from './GameSetup'

const GameStateHandler = ({ metadata, setGameSettings }) => {
    // eslint-disable-next-line no-unused-vars
    const [_webSocket, wsSettings, setWsSettings] = useWebSocket()

    useEffect(() => {
        const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
        setGameSettings(params.get('host'), params.get('room'))
        setWsSettings(params.get('room'))
    }, [])

    useEffect(() => {
        document.title = `Borealis D&D, Room: ${metadata.room}`
        setWsSettings({
            ...wsSettings,
            room: metadata.room,
        })
    }, [ metadata.room ])

    if ((metadata.room !== undefined) && (metadata.room !== '') && (metadata.room !== null)) {
        return (<Game />)
    } else {
        return (<GameSetup />)
    }
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata,
    }
}

const mapDispatchToProps = {
    setGameSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStateHandler)
