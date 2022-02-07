import React, { useState } from 'react'
import MapConfigView from '../views/MapConfigView.js'

const initialMapConfigState = (gameState, map) => {
	const maps = gameState.game.maps
	const existingMap = maps.filter((mapElement) => mapElement.$id === map.$id)
	const currentMap = existingMap ? existingMap : { name: undefined, url: undefined, w: undefined, h: undefined, }

	return {
		$id: map.$id,
		name: currentMap.name ? currentMap.name : map.name,
		imageUrl: currentMap.imageUrl ? currentMap.imageUrl : '',
		width: currentMap.width ? currentMap.width : window.innerWidth,
		height: currentMap.height ? currentMap.height : window.innerHeight,
		x: 0,
		y: 0,	
	}
}

const MapConfig = ({ gameState, setGameState, map, mapId, websocket }) => {
	const [mapConfigState, setMapConfigState] = useState(initialMapConfigState(gameState, map))
	const isSelected = gameState.game.mapId === mapId

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
		const updatedMaps = gameState.game.maps.map((map) => {
			return parseInt(mapId) === map.$id ? { ...map, imageUrl: mapConfigState.imageUrl, width: mapConfigState.width, height: mapConfigState.height, } : map
		})
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				maps: updatedMaps,
				mapId: parseInt(mapId),
				isFirstLoadDone: true,
				isFogLoaded: true,
			}
		})
	}

	const deleteMap = () => {
		if (window.confirm('Delete map?')) {
			const maps = gameState.game.maps
			const newMaps = maps.filter((map) => parseInt(map.$id) !== parseInt(mapId))
			setGameState({
				...gameState,
				game: {
					...gameState.game,
					maps: newMaps,
					mapId: parseInt(mapId) === gameState.game.mapId ? undefined : gameState.game.mapId,
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
