import React, { useState } from 'react'
import guid from '../controllers/guid.js'
import Button from '../views/button.js'
import ToolButton from './ToolButton.js'
import ToggleButton from './ToggleButton.js'
import MapConfig from './MapConfig.js'
import TokenConfig from './TokenConfig.js'

const initialControlPanelState = () => {
	return {
		newTokenUrl: undefined,
		newMapName: undefined,
		hidden: false,
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
}

//TODO: Complete refactoring
/*
	render () {
    const toggleHiddenButton = <Button value='&#x1f441;' onClick={this.toggleHidden.bind(this)} title='show/hide control panel' />;
    if (this.state.hidden)
      return <div id='control-panel'>{toggleHiddenButton}</div>
    const game = this.props.game;
    if (game.isHost)
      return <div id='control-panel'>
        {toggleHiddenButton}
        |||
        <ToggleButton title='User' value='&#x1f9d9;&#x200d;&#x2642;&#xfe0f;' controlPanel={this} />
        <ToggleButton title='Maps' value='&#x1f5fa;' controlPanel={this} />
        <ToggleButton title='Tokens' value='&#x265f;' controlPanel={this} />
        <Button title='Push refresh to players' value='&#x1f4ab;' onClick={game.websocket.pushRefresh.bind(game.websocket, {})} />
        |||
        {this.renderToolSelect()}
        |||
        {this.renderToolControls()}
        {this.renderMaps()}
        {this.renderTokens()}
        {this.renderUser()}
      </div>;
    else
      return <div id='control-panel'>
        {toggleHiddenButton}
        <input title='User name' placeholder='User name' value={game.state.username||''} onChange={this.setGameText.bind(this, 'username')} />
        <ToggleButton title='Share mouse (cursor)' value='&#x1f401;' controlPanel={game} />
        <input title='Cursor size' value={game.state.cursorSize||''} onChange={this.setGameInt.bind(this, 'cursorSize')} type='number' min='0' />
        <Button title='Request gameboard refresh from host' onClick={this.socketRequestRefresh.bind(this)} value='&#x1f4ab;' />
        {this.renderSelectedTokensControls()}
      </div>
  }
}
*/

export default ControlPanel
