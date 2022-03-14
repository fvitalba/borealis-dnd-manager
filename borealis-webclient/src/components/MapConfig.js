import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loadMap, updateMaps, deleteMap } from '../reducers/gameReducer'
import { pushMapState, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import MapConfigView from '../views/MapConfigView'

const initialMapConfigState = (map, game) => {
    const existingMap = game.maps.filter((mapElement) => mapElement.id === map.id)
    const currentMap = existingMap.length > 0 ? existingMap[0] : { name: undefined, imageUrl: undefined, w: undefined, h: undefined, }

    return {
        id: parseInt(map.id),
        name: currentMap.name ? currentMap.name : map.name,
        imageUrl: currentMap.imageUrl ? currentMap.imageUrl : '',
        x: 0,
        y: 0,
    }
}

const MapConfig = ({ map, game, loadMap, updateMaps, deleteMap }) => {
    const [mapConfigState, setMapConfigState] = useState(initialMapConfigState(map, game))
    const [webSocket, wsSettings] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()
    const isSelected = game.mapId === map.id

    const onTextChange = (key, evt) => {
        setMapConfigState({
            ...mapConfigState,
            [key]: evt.target.value,
        })
    }

    const load = () => {
        setIsLoading(true)
        retrieveImageSize(mapConfigState.imageUrl)
            .then((dimensions) => {
                console.log(dimensions)
                const updatedMaps = game.maps.map((currMap) => {
                    return map.id === currMap.id ? { ...currMap, imageUrl: mapConfigState.imageUrl, width: dimensions.width, height: dimensions.height, } : currMap
                })
                setIsLoading(false)
                updateMaps(updatedMaps)
                loadMap(map.id)
                pushMapState(webSocket, wsSettings, updatedMaps, map.id)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }

    const retrieveImageSize = (imageUrl) => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            console.log(image)
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


const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

const mapDispatchToProps = {
    loadMap,
    updateMaps,
    deleteMap,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapConfig)
