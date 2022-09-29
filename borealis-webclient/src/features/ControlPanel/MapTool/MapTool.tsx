import React, { useState } from 'react'
import { connect } from 'react-redux'
import Map from '@/classes/Map'
import { pushCreateMap, useWebSocket } from '@/hooks/useSocket'
import StateInterface from '@/interfaces/StateInterface'
import { addMap } from '@/reducers/mapReducer'
import MapToolView from './MapToolView'
import { MapToolState, MapToolProps } from './types'

const initialMapToolState = (): MapToolState => {
    return {
        newMapName: '',
        selectedMapName: '',
        currSelectedMapName: '',
        showSelectedMap: false,
    }
}

const MapTool = ({ toggleOnMaps, mapState, gameState, addMap }: MapToolProps) => {
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

    const isCreateMapEnabled = (): boolean => {
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
                activeMapId={ gameState.currentMapId }
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
        gameState: state.game,
    }
}

const mapDispatchToProps = {
    addMap,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTool)
