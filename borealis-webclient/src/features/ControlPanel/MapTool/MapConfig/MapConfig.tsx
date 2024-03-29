import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Map from '@/classes/Map'
import { pushMapState, useWebSocket } from '@/hooks/useSocket'
import { useLoading } from '@/hooks/useLoading'
import StateInterface from '@/interfaces/StateInterface'
import { loadMap } from '@/reducers/gameReducer'
import { updateMaps, deleteMap } from '@/reducers/mapReducer'
import MapConfigView from './MapConfigView'
import { GAME_LOAD_MAP } from '@/utils/loadingTasks'
import { MapConfigState, MapConfigProps } from './types'

const initialMapConfigState = (map: Map): MapConfigState => {
    return {
        id: map.id,
        name: map.name,
        imageUrl: map.backgroundUrl,
        x: map.x,
        y: map.y,
    }
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
        loadingContext.startLoadingTask(GAME_LOAD_MAP)
        retrieveImageSize(mapConfigState.imageUrl)
            .then((dimensions) => {
                const updatedMaps = mapState.maps.map((currMap) => {
                    const newMap = new Map(currMap.id, currMap.name, mapConfigState.imageUrl, currMap.x, currMap.y, dimensions.width, dimensions.height, currMap.drawPaths, currMap.fogPaths)
                    return map.id === currMap.id ? newMap : currMap
                })
                loadingContext.stopLoadingTask(GAME_LOAD_MAP)
                updateMaps(updatedMaps)
                loadMap(map.id)
                if (webSocketContext.ws)
                    pushMapState(webSocketContext.ws, webSocketContext.wsSettings, updatedMaps, map.id)
            })
            .catch((error) => {
                console.error(error)
                loadingContext.stopLoadingTask(GAME_LOAD_MAP)
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
