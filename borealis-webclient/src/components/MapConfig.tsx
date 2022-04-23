import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Map from '../classes/Map'
import Game from '../classes/Game'
import { pushMapState, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { loadMap } from '../reducers/gameReducer'
import { MapState, updateMaps, deleteMap } from '../reducers/mapReducer'
import MapConfigView from '../views/MapConfigView'

export interface MapConfigState {
    id: number,
    name: string,
    imageUrl: string,
    x: number,
    y: number,
}

const initialMapConfigState = (map: Map): MapConfigState => {
    return {
        id: map.id,
        name: map.name,
        imageUrl: map.backgroundUrl,
        x: map.x,
        y: map.y,
    }
}

interface MapConfigProps {
    map: Map,
    gameState: Game,
    mapState: MapState,
    loadMap: (arg0: number) => void,
    updateMaps: (arg0: Array<Map>) => void,
    deleteMap: (arg0: number) => void,
}

const MapConfig = ({ map, gameState, mapState, loadMap, updateMaps, deleteMap }: MapConfigProps) => {
    const [mapConfigState, setMapConfigState] = useState(initialMapConfigState(map))
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()
    const isSelected = gameState.currentMapId === map.id

    const onTextChange = (key: string, evt: ChangeEvent<HTMLInputElement>) => {
        setMapConfigState({
            ...mapConfigState,
            [key]: evt.target.value,
        })
    }

    const load = () => {
        if (loadingContext.setIsLoading)
            loadingContext.setIsLoading(true)
        retrieveImageSize(mapConfigState.imageUrl)
            .then((dimensions) => {
                const updatedMaps = mapState.maps.map((currMap) => {
                    const newMap = new Map(currMap.id, currMap.name, mapConfigState.imageUrl, currMap.x, currMap.y, dimensions.width, dimensions.height, currMap.drawPaths, currMap.fogPaths)
                    return map.id === currMap.id ? newMap : currMap
                })
                if (loadingContext.setIsLoading)
                    loadingContext.setIsLoading(false)
                updateMaps(updatedMaps)
                loadMap(map.id)
                if (webSocketContext.ws && webSocketContext.wsSettings)
                    pushMapState(webSocketContext.ws, webSocketContext.wsSettings, updatedMaps, map.id)
            })
            .catch((error) => {
                console.error(error)
                if (loadingContext.setIsLoading)
                    loadingContext.setIsLoading(false)
            })
    }

    const retrieveImageSize = (imageUrl: string): Promise<{ width: number, height: number }> => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = imageUrl
            image.onload = () => {
                resolve({ width: image.width, height: image.height })
            }
            image.onerror = () => {
                reject()
            }
        })
    }

    const deleteCurrentMap = () => {
        if (window.confirm('Delete map?')) {
            deleteMap(map.id)
        }
    }

    return (
        map ?
            <MapConfigView
                isSelected={ isSelected }
                mapConfigState={ mapConfigState }
                load={ load }
                onTextChange={ onTextChange }
                deleteMap={ deleteCurrentMap }
            />
            : null
    )
}


const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
    }
}

const mapDispatchToProps = {
    loadMap,
    updateMaps,
    deleteMap,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapConfig)
