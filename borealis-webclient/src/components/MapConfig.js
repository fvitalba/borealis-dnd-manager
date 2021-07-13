import React, { useState } from 'react'
import MapConfigView from '../views/MapConfigView.js'

const initialMapConfigState = (gameState, map) => {
	const maps = JSON.parse(JSON.stringify(gameState.state.maps || {}))
	const existingMap = Array.isArray(maps) ? maps.filter((mapElement) => mapElement.$id === map.$id) : undefined
	const currentMap = existingMap ? existingMap : { name: undefined, url: undefined, w: undefined, h: undefined, }

	return {
		$id: map.$id,
		name: currentMap.name ? currentMap.name : map.name,
		imageUrl: currentMap.url ? currentMap.url : '',
		width: currentMap.w ? currentMap.w : 0,
		height: currentMap.h ? currentMap.h : 0,
		x: 0,
		y: 0,	
	}
}

const MapConfig = ({ gameState, setGameState, map, mapId, loadMap }) => {
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
		const maps = JSON.parse(JSON.stringify(gameState.state.maps))
		if (!maps || Array.isArray(maps))	//TODO: Check if we need to remove the array-check
			return
		const newMap = {
			$id: mapConfigState.$id,
			name: mapConfigState.name,
			url: mapConfigState.imageUrl,
			w: mapConfigState.width,
			h: mapConfigState.height,
			x: mapConfigState.x,
			y: mapConfigState.y,
		}
		const newMaps = maps.map((map) => map.$id === newMap.$id ? newMap : map)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				maps : newMaps,
			}
		}, () => loadMap(gameState.state.maps[mapId],false))
	}

	const deleteMap = () => {
		if (window.confirm('Delete map?')) {
			const maps = JSON.parse(JSON.stringify(gameState.state.maps))
			const newMaps = maps.filter((map) => map.$id !== mapId)
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
