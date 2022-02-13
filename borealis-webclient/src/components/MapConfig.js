import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loadMap, updateMaps, deleteMap, setIsFogLoaded, setIsFirstLoadDone } from '../reducers/gameReducer.js'
import MapConfigView from '../views/MapConfigView.js'

const initialMapConfigState = (map, game) => {
	const maps = game.maps
	const existingMap = maps.filter((mapElement) => mapElement.$id === map.$id)
	const currentMap = existingMap ? existingMap : { name: undefined, url: undefined, w: undefined, h: undefined, }

	return {
		$id: parseInt(map.$id),
		name: currentMap.name ? currentMap.name : map.name,
		imageUrl: currentMap.imageUrl ? currentMap.imageUrl : '',
		width: currentMap.width ? currentMap.width : window.innerWidth,
		height: currentMap.height ? currentMap.height : window.innerHeight,
		x: 0,
		y: 0,	
	}
}

const MapConfig = ({ websocket, map, game, loadMap, updateMaps, deleteMap, setIsFogLoaded, setIsFirstLoadDone }) => {
	const [mapConfigState, setMapConfigState] = useState(initialMapConfigState(map, game))
	const isSelected = game.mapId === map.$id

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
		const updatedMaps = game.maps.map((currMap) => {
			return map.$id === currMap.$id ? { ...currMap, imageUrl: mapConfigState.imageUrl, width: mapConfigState.width, height: mapConfigState.height, } : currMap
		})
		updateMaps(updatedMaps)
		loadMap(map.$id)
		setIsFogLoaded(true)
		setIsFirstLoadDone(true)
		websocket.pushMapId(map.$id)
	}

	const deleteCurrentMap = () => {
		if (window.confirm('Delete map?')) {
			deleteMap(map.$id)
		}
	}

	return (
		map ?
			<MapConfigView 
				isSelected={ isSelected } 
				mapConfigState={ mapConfigState }  
				load={ load } 
				onTextChange={ onTextChange } 
				onIntegerChange={ onIntegerChange } 
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
	setIsFogLoaded,
	setIsFirstLoadDone,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapConfig)
