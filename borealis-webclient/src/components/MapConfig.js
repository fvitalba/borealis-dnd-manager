import React, { useState } from 'react'
import MapConfigView from '../views/MapConfigView.js'

const initialMapConfigState = (gameState, map) => {
	const maps = gameState.state.maps
	const existingMap = maps.filter((mapElement) => mapElement.$id === map.$id)
	const currentMap = existingMap ? existingMap : { name: undefined, url: undefined, w: undefined, h: undefined, }

	return {
		$id: map.$id,
		name: currentMap.name ? currentMap.name : map.name,
		imageUrl: currentMap.url ? currentMap.url : '',
		width: currentMap.width ? currentMap.width : window.innerWidth,
		height: currentMap.height ? currentMap.height : window.innerHeight,
		x: 0,
		y: 0,	
	}
}

const MapConfig = ({ gameState, setGameState, map, mapId, websocket }) => {
	const [mapConfigState, setMapConfigState] = useState(initialMapConfigState(gameState, map))
	const isSelected = gameState.state.mapId === mapId

	const onTextChange = (key, evt) => {
		setMapConfigState({
			...mapConfigState,
			[key]: evt.target.value,
		})
	}

	const onIntegerChange = (key, evt) => {
		const value = parseInt(evt.target.value) || undefined
		setMapConfigState({
			...mapConfigState,
			[key]: value,
		})
	}

	const load = () => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				mapId: mapId,
				isFirstLoadDone: true,
				isFogLoaded: true,
			}
		})
		websocket.pushMapId(mapId)
	}

	const deleteMap = () => {
		if (window.confirm('Delete map?')) {
			const maps = gameState.state.maps
			const newMaps = maps.filter((map) => parseInt(map.$id) !== parseInt(mapId))
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: newMaps,
					mapId: mapId === gameState.state.mapId ? undefined : gameState.state.mapId,
				},
			})
		}
	}

	return (
		map ?
			<MapConfigView 
				isSelected={ isSelected } 
				mapConfigState={ mapConfigState } 
				mapId={ mapId } 
				load={ load } 
				onTextChange={ onTextChange } 
				onIntegerChange={ onIntegerChange } 
				deleteMap={ deleteMap }
			/>
		: null
	)
}

export default MapConfig
