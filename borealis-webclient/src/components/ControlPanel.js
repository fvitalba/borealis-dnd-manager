import React, { useState } from 'react'
import guid from '../controllers/guid.js'
import ControlPanelView from '../views/ControlPanelView.js'

const initialControlPanelState = () => {
	return {
		name: undefined,
		url: undefined,
		newTokenUrl: undefined,
		newMapName: undefined,
		hidden: false,
		toggleOnMaps: false,
		toggleOnUser: false,
		toggleOnTokens: false,
		fogDiameter: 33,
	}
}

const ControlPanel = ({ gameState, setGameState, notify, fromJson, token, initAsDev, loadMap, updateGameToken, selectGameToken, resetFog }) => {
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)

	const toggleHidden = () => {
		setControlPanelState({
			...controlPanelState,
			hidden: !controlPanelState.hidden,
		})
	}

	const setGameInt = (key, e) => {
		//TODO: What does debugger do here?
		debugger
		setGameState({
			...gameState,
			state: {
				...gameState,
				[key]: parseInt(e.target.value) || undefined,	
			}
		})
	}

	const setGameText = (key, e) => {
		setGameState({
			...gameState,
			state: {
				...gameState,
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
		const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps || {}))
		const mapId = 1 + Object.keys(mapsCopy).reduce((m, x) => Math.max(m, x), 0)
		const newMap = {
			name: controlPanelState.newMapName,
			$id: mapId
		}
		mapsCopy[mapId] = newMap
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				maps: mapsCopy,
			}
		})
		setControlPanelState({
			...controlPanelState,
			newMapName: undefined,
		})
	}

	const createToken = () => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens || []))
		tokensCopy.push({url: this.state.newTokenUrl, guid: guid()})
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			}
		})
		setControlPanelState({
			...controlPanelState,
			newTokenUrl: undefined,
		})
		gameState.websocket.pushTokens(tokensCopy)
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
		gameState.websocket.requestRefresh()
	}

	/*
	// TODO: Check where the Token comes from
	const token = this.props.token;
    if (!token) return null;
	*/

	return (
		<ControlPanelView 
			gameState={ gameState } 
			setGameState={ setGameState } 
			controlPanelState={ controlPanelState } 
			token={ token } 
			hidden={ controlPanelState.hidden } 
			toggleHidden={ toggleHidden } 
			setGameInt={ setGameInt } 
			setGameText={ setGameText } 
			socketRequestRefresh={ socketRequestRefresh } 
			initAsDev={ initAsDev } 
			toggleOnUser={ controlPanelState.toggleOnUser } 
			copyJson={ copyJson } 
			pasteJson={ pasteJson } 
			resetFog={ resetFog } 
			onTextChange={ onTextChange } 
			createMap={ createMap } 
			loadMap={ loadMap } 
			updateGameToken={ updateGameToken } 
			selectGameToken={ selectGameToken } 
			newTokenUrl={ controlPanelState.newTokenUrl } 
			createToken={ createToken } />
	)
}

export default ControlPanel
