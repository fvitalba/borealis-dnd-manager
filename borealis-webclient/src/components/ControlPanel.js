import React, { useState } from 'react'
import guid from '../controllers/guid.js'
import ControlPanelView from '../views/ControlPanelView.js'

const initialControlPanelState = () => {
	return {
		newTokenUrl: undefined,
		newMapName: undefined,
		hidden: false,
		toggleOnMaps: false,
		toggleOnUser: false,
		toggleOnTokens: false,
		fogDiameter: 33,
	}
}

const ControlPanel = ({ game }) => {
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)

	const getTool = () => {
		return game.state.tool
	}

	const toggleHidden = () => {
		setControlPanelState({
			...controlPanelState,
			hidden: !controlPanelState.hidden,
		})
	}

	const setGameState = (key, value) => {
		setControlPanelState({
			...controlPanelState,
			[key]: value,
		})
	}

	const setGameInt = (key, e) => {
		//TODO: What does debugger do here?
		debugger
		setControlPanelState({
			...controlPanelState,
			[key]: parseInt(e.target.value) || undefined,
		})
	}

	const setGameText = (key, e) => {
		setControlPanelState({
			...controlPanelState,
			[key]: e.target.value,
		})
	}

	const onTextChange = (key, e) => {
		setControlPanelState({
			...controlPanelState,
			[key]: e.target.value,
		})
	}

	const createMap = () => {
		const mapsCopy = JSON.parse(JSON.stringify(game.state.maps || {}))
		const mapId = 1 + Object.keys(mapsCopy).reduce((m, x) => Math.max(m, x), 0)
		const newMap = { name: controlPanelState.newMapName, $id: mapId }
		mapsCopy[mapId] = newMap
		//TODO: How do I update the game's State?
		//game.setState({maps: mapsCopy})	
		setControlPanelState({
			...controlPanelState,
			newMapName: undefined,
		})
	}

	const createToken = () => {
		const tokensCopy = JSON.parse(JSON.stringify(game.state.tokens || []))
		tokensCopy.push({url: this.state.newTokenUrl, guid: guid()})
		//TODO: How do I update the game's State?
		//game.setState({tokens: tokensCopy})
		setControlPanelState({
			...controlPanelState,
			newTokenUrl: undefined,
		})
		//TODO: How do I update the game's State?
		//game.websocket.pushTokens(tokensCopy)
	}

	const resetFog = () => {
		//TODO: How do I update the game's State?
		//game.fogRef.current.fill()
	}

	const setFogOpacity = (e) => {
		const newOpacity = e.target.value
		if (!isNaN(newOpacity))
			setControlPanelState({
				...controlPanelState,
				fogOpacity: newOpacity,
			})
	}

	const copyJson = () => {
		//TODO: Verify if we can access these functions
		const json = game.toJson()
		window.navigator.clipboard.writeText(json).then(() => {
			game.notify('copied to clipboard')
		}).catch(err => {
			console.error('failed to write to clipboard: ', err)
			game.notify(`failed to write to clipboard: ${err}`, 2000)
		})
	}

	const pasteJson = () => {
		//TODO: Verify if we can access these functions
		const note1 = game.notify('reading clipboard...')
		window.navigator.clipboard.readText().then(json => {
			if (window.confirm(`Do you really want to overwrite this game with what's in your clipboard? ${json.slice(0,99)}...`)) {
				game.fromJson(json)
				game.notify('pasted from clipboard')
			}
			note1 && note1.close()
		}).catch(err => {
			console.error('failed to read clipboard: ', err)
			game.notify(`failed to read clipboard: ${err}`, 2000)
		})
	}

	const socketRequestRefresh = () => {
		//TODO: How do I update the game's State?
		//game.websocket.requestRefresh()
	}

	//TODO: Pass parameters to View
	return (
		<ControlPanelView />
	)
}

export default ControlPanel
