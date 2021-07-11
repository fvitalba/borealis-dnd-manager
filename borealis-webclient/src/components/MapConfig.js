import React from 'react'
import MapConfigView from '../views/MapConfigView.js'

const MapConfig = ({ gameState, setGameState, map, mapId, loadMap }) => {
	//TODO: Remove comments if not necessary
	const isSelected = gameState.state.mapId === mapId

	const update = (callback) => {
		return new Promise(resolve => {
			const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps))
			callback(mapsCopy[mapId])
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: mapsCopy
				}
			}, resolve)
		})
	}

	const onTextChange = (key, evt) => {
		return update(map => map[key] = evt.target.value)
	}

	const onIntegerChange = (key, evt) => {
		const value = parseInt(evt.target.value) || undefined
		return update(map => map[key] = value)
	}

	const resize = (key, evt) => {
		return onIntegerChange(key, evt).then(() => {
			//TODO: Check if it's possible to use triple equal
			if (gameState.backgroundRef.current && mapId == gameState.state.mapId) { /* eslint-disable-line eqeqeq */
				return loadMap()
			} else
				return Promise.resolve()
		})
	}

	const load = () => {
		loadMap(map)
	}
	
	const deleteMap = () => {
		if (window.confirm('Delete map?')) {
			const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps))
			delete mapsCopy[mapId]
			const newState = {
				...gameState.state,
				maps: mapsCopy
			}
			if (gameState.state.mapId === mapId)
				newState.mapId = Object.keys(newState.maps)[0]
			setGameState({
				...gameState,
				state: newState,
			})
		}
	}

	return (
		map ?
			<MapConfigView 
				isSelected={ isSelected } 
				map={ map } 
				load={ load } 
				onTextChange={ onTextChange } 
				resize={ resize } 
				deleteMap={ deleteMap }
			/>
		: null
	)
}

export default MapConfig
