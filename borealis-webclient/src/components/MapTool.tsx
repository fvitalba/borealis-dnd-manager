import React, { useState } from 'react'
import { connect } from 'react-redux'
import Map from '../classes/Map'
import { pushCreateMap, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { addMap, MapState } from '../reducers/mapReducer'
import MapToolView from '../views/MapToolView'

interface MapToolState {
    newMapName: string,
    selectedMapName: string,
    currSelectedMapName: string,
    showSelectedMap: boolean,
}

const initialMapToolState = (): MapToolState => {
    return {
        newMapName: '',
        selectedMapName: '',
        currSelectedMapName: '',
        showSelectedMap: false,
    }
}

interface MapToolProps {
    toggleOnMaps: boolean,
    mapState: MapState,
    addMap: (arg0: Map) => void,
}

const MapTool = ({ toggleOnMaps, mapState, addMap }: MapToolProps) => {
    const [mapToolState, setMapToolState] = useState(initialMapToolState())
    const webSocketContext = useWebSocket()

    const createMap = () => {
        const newMap = new Map(0, mapToolState.newMapName, '', 0, 0, window.innerWidth, window.innerHeight)
        addMap(newMap)
        setMapToolState({
            ...mapToolState,
            newMapName: '',
            currSelectedMapName: newMap.name,
            showSelectedMap: true,
        })
        if (webSocketContext.ws)
            pushCreateMap(webSocketContext.ws, webSocketContext.wsSettings, newMap)
    }

    const onMapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMapToolState({
            ...mapToolState,
            newMapName: e.target.value,
            selectedMapName: '',
        })
    }

    const onMapSelect = (mapIndex: number) => {
        const selectedMap = mapState.maps.filter((map, index) => index === mapIndex)[0]
        setMapToolState({
            ...mapToolState,
            selectedMapName: selectedMap.name,
            newMapName: '',
        })
    }

    const onSubmitSelectMap = () => {
        setMapToolState({
            ...mapToolState,
            selectedMapName: '',
            currSelectedMapName: mapToolState.selectedMapName,
            showSelectedMap: true,
        })
    }

    const isCreateMapEnabled = () => {
        const existingMap = mapState.maps.filter((map) => map.name === mapToolState.newMapName)
        if (existingMap.length > 0)
            return false
        else
            return true
    }
    const isSubmitSelectionEnabled = (mapToolState.selectedMapName !== '')

    return (
        toggleOnMaps ?
            <MapToolView
                maps={ mapState.maps }
                newMapName={ mapToolState.newMapName }
                setNewMapName={ onMapNameChange }
                isCreateMapEnabled={ isCreateMapEnabled() }
                createMap={ createMap }
                selectedMapName={ mapToolState.selectedMapName }
                currSelectedMapName={ mapToolState.currSelectedMapName }
                onMapSelect={ onMapSelect }
                onSubmitSelectMap={ onSubmitSelectMap }
                isSubmitSelectionEnabled={ isSubmitSelectionEnabled }
                showSelectedMap={ mapToolState.showSelectedMap }
            />
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
