import { useState } from 'react'
import { connect } from 'react-redux'
import { pushCreateMap, useWebSocket } from '../hooks/useSocket.js'
import { addMap } from '../reducers/gameReducer.js'
import MapToolView from '../views/MapToolView.js'

const MapTool = ({ toggleOnMaps, game, addMap }) => {
    const [newMapName, setNewMapName] = useState('')
    const [webSocket, wsSettings, _setWsSettings] = useWebSocket()

    const maps = game.maps

    const createMap = () => {
        addMap(newMapName, window.innerWidth, window.innerHeight)
        setNewMapName('')
        pushCreateMap(webSocket, wsSettings, newMapName, window.innerWidth, window.innerHeight)
    }

    return (
        toggleOnMaps ?
            <MapToolView maps={ maps } newMapName={ newMapName } setNewMapName={ setNewMapName } createMap={ createMap } />
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    addMap,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTool)
