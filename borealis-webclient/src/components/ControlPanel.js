import React from 'react'
import guid from '../controllers/guid.js'
import ControlPanelView from '../views/ControlPanelView.js'

const ControlPanel = ({ gameState, setGameState, controlPanelState, setControlPanelState, websocket, notify, fromJson, initAsDev, updateGameToken, selectGameToken, resetFog, resetDrawing }) => {
	const toggleHidden = () => {
		setControlPanelState({
			...controlPanelState,
			hidden: !controlPanelState.hidden,
		})
	}

	const setGameSettingsInt = (key, e) => {
		setGameState({
			...gameState,
			settings: {
				...gameState.settings,
				[key]: parseInt(e.target.value) || undefined,	
			}
		})
	}

	const setGameSettingsText = (key, e) => {
		setGameState({
			...gameState,
			settings: {
				...gameState.settings,
				[key]: e.target.value,
			}
		})
	}

	const onTextChange = (key, e) => {
		setControlPanelState({
			...controlPanelState,
			[key]: e.target.value,
		})
	}

	const createMap = () => {
		const maps = gameState.game.maps
		const mapId = parseInt(maps.length)
		const newMap = {
			name: controlPanelState.newMapName,
			$id: mapId,
			imageUrl: '',
			x: 0,
			y: 0,
			width: window.innerWidth,
			height: window.innerHeight,
			drawPaths: [],
			fogPaths: [],
		}
		maps[mapId] = newMap
		const newMaps = maps.filter(map => map)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				maps: newMaps,
				mapId: gameState.game.mapId ? gameState.game.mapId : mapId
			}
		})
		setControlPanelState({
			...controlPanelState,
			newMapName: '',
		})
	}

	const createToken = () => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.game.tokens || []))
		if (!controlPanelState.newTokenUrl)
			return
		tokensCopy.push({
			url: controlPanelState.newTokenUrl,
			guid: guid(),
			mapId: gameState.game.mapId,
			$selected: undefined,
			name: undefined,
			$x0: 0,
			$y0: 0,
			x: 0,
			y: 0,
			ko: undefined,
			pc: undefined,
			w: 0,
			h: 0,
		})
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				tokens: tokensCopy,
			}
		})
		setControlPanelState({
			...controlPanelState,
			newTokenUrl: undefined,
		})
	}

	const copyJson = () => {
		const json = gameState.toJson()
		window.navigator.clipboard.writeText(json).then(() => {
			notify('copied to clipboard')
		}).catch(err => {
			console.error('failed to write to clipboard: ', err)
			notify(`failed to write to clipboard: ${err}`, 2000)
		})
	}

	const pasteJson = () => {
		const note1 = notify('reading clipboard...')
		window.navigator.clipboard.readText().then(json => {
			if (window.confirm(`Do you really want to overwrite this game with what's in your clipboard? ${json.slice(0,99)}...`)) {
				fromJson(json)
				notify('pasted from clipboard')
			}
			note1 && note1.close()
		}).catch(err => {
			console.error('failed to read clipboard: ', err)
			notify(`failed to read clipboard: ${err}`, 2000)
		})
	}

	const socketRequestRefresh = () => {
		websocket.requestRefresh()
	}

	return (
		<ControlPanelView 
			gameState={ gameState } 
			setGameState={ setGameState } 
			controlPanelState={ controlPanelState } 
			setControlPanelState={ setControlPanelState } 
			websocket={ websocket } 
			hidden={ controlPanelState.hidden } 
			toggleHidden={ toggleHidden } 
			setGameSettingsInt={ setGameSettingsInt } 
			setGameSettingsText={ setGameSettingsText } 
			socketRequestRefresh={ socketRequestRefresh } 
			initAsDev={ initAsDev } 
			toggleOnUser={ controlPanelState.toggleOnUser } 
			toggleOnTokens={ controlPanelState.toggleOnTokens }
			copyJson={ copyJson } 
			pasteJson={ pasteJson } 
			onTextChange={ onTextChange } 
			createMap={ createMap } 
			updateGameToken={ updateGameToken } 
			selectGameToken={ selectGameToken } 
			newTokenUrl={ controlPanelState.newTokenUrl } 
			createToken={ createToken } 
			resetFog={ resetFog } 
			resetDrawing={ resetDrawing } />
	)
}

export default ControlPanel
