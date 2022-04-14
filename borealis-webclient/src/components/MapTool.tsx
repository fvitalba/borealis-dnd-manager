import { useState } from 'react'
import { connect } from 'react-redux'
import Map from '../classes/Map'
import { pushCreateMap, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { addMap, MapState } from '../reducers/mapReducer'
import MapToolView from '../views/MapToolView'

interface MapToolProps {
    toggleOnMaps: boolean,
    mapState: MapState,
    addMap: (arg0: Map) => void,
}

const MapTool = ({ toggleOnMaps, mapState, addMap }: MapToolProps) => {
    const [newMapName, setNewMapName] = useState('')
    const webSocketContext = useWebSocket()

    const createMap = () => {
        const newMap = new Map(0, newMapName, '', 0, 0, window.innerWidth, window.innerHeight)
        addMap(newMap)
        setNewMapName('')
        if (webSocketContext.ws && webSocketContext.wsSettings)
            pushCreateMap(webSocketContext.ws, webSocketContext.wsSettings, newMap)
    }

    return (
        toggleOnMaps ?
            <MapToolView maps={ mapState.maps } newMapName={ newMapName } setNewMapName={ setNewMapName } createMap={ createMap } />
            : null
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        mapState: state.map,
    }
}

const mapDispatchToProps = {
    addMap,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTool)
