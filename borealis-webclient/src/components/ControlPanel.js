import React from 'react'
import guid from '../controllers/guid.js'
import ControlPanelView from '../views/ControlPanelView.js'

const ControlPanel = ({ gameState, setGameState, controlPanelState, setControlPanelState, websocket, notify, fromJson, token, initAsDev, loadMap, updateGameToken, selectGameToken, resetFog }) => {
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
				...gameState.state,
				[key]: parseInt(e.target.value) || undefined,	
			}
		})
	}

	const setGameText = (key, e) => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
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
		const maps = JSON.parse(JSON.stringify(gameState.state.maps || []))
		const mapId = maps.length
		const newMap = {
			name: controlPanelState.newMapName,
			$id: mapId,
			url: '',
			w: window.innerWidth,
			h: window.innerHeight,
			x: 0,
			y: 0,
		}
		maps[mapId] = newMap
		const newMaps = maps.filter(map => map)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				maps: newMaps,
			}
		})
		setControlPanelState({
			...controlPanelState,
			newMapName: undefined,
		})
	}

	const createToken = () => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens || []))
		tokensCopy.push({url: controlPanelState.newTokenUrl, guid: guid()})
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
		websocket.pushTokens(tokensCopy)
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
			setControlPanelState={ setControlPanelState } 
			websocket={ websocket } 
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
