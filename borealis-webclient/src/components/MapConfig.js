import React from 'react'
import MapConfigView from '../views/MapConfigView.js'

const MapConfig = ({ game, map, mapId }) => {
	//TODO: Remove comments if not necessary
	const isSelected = game.state.mapId === mapId

	const update = (callback) => {
		return new Promise(resolve => {
			// const game = this.props.game
			const mapsCopy = JSON.parse(JSON.stringify(game.state.maps))
			callback(mapsCopy[mapId])
			game.setState({ maps: mapsCopy }, resolve)
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
			// const game = this.props.game;
			//TODO: Check if it's possible to use triple equal
			if (game.backgroundRef.current && mapId == game.state.mapId) { /* eslint-disable-line eqeqeq */
				return game.loadMap()
			} else
				return Promise.resolve()
		})
	}

	const load = () => {
		game.loadMap(map)
	}
	
	const deleteMap = () => {
		if (window.confirm('Delete map?')) {
			// const game = this.props.game;
			const mapsCopy = JSON.parse(JSON.stringify(game.state.maps))
			delete mapsCopy[mapId]
			const newState = { maps: mapsCopy }
			if (game.state.mapId === mapId)
				newState.mapId = Object.keys(newState.maps)[0]
			game.setState(newState)
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
