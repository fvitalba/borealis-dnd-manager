import React, { useEffect, useState } from 'react'
import Gamesocket from './GameSocket.js'
import GameView from '../views/GameView.js'
import guid from '../controllers/guid.js'
import GameSocket from './GameSocket.js'

const initialGameState = () => {
	const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))

	return {
		websocket: null,
		isHost: params.get('host'),
		room: params.get('room'),
		controlPanelRef: React.createRef(),
		backgroundRef: React.createRef(),
		fogRef: React.createRef(),
		drawingRef: React.createRef(),
		overlayRef: React.createRef(),
		tokens: React.createRef(),
		state: {
			maps: [],
			tokens: [],
			cursors: [],
			cursorSize: 50,
			fogOpacity: 0.5,
			fogUrl: undefined, /* data url */
			fogRadius: 33,
			isFogLoaded: false,
			isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
			drawColor: 'purple',
			drawSize: 8,
			tool: 'move',
			subtool: undefined,
			username: params.get('host') ? 'DM' : 'PC',
			'toggleOnShare mouse (cursor)': true,
			downX: undefined,
			downY: undefined,
			mapId: undefined,
			gen: 0,
			map: undefined,	//TODO: maybe {} instead of undefined
			width: undefined,
			height: undefined,
		}
	}
}

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

const Game = () => {
	const [gameState, setGameState] = useState(initialGameState)
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)
	const websocket = gameState.websocket ? gameState.websocket : new GameSocket(gameState)
	
	// On Mount
	useEffect(() => {
		if (gameState.websocket !== websocket)
			setGameState({
				...gameState,
				websocket: websocket,
			})
		window.addEventListener('beforeunload', saveToLocalStorage.bind(this))
		window.addEventListener('resize', onResize.bind(this))
		window.addEventListener('keypress', onKeyPress.bind(this))
		window.addEventListener('keydown', onKeyDown.bind(this))
		loadFromLocalStorage()

		// On Unmount
		return () => {
			saveToLocalStorage()
			window.removeEventListener('beforeunload', saveToLocalStorage.bind(this))
			window.removeEventListener('resize', onResize.bind(this))
			window.removeEventListener('keypress', onKeyPress.bind(this))
			window.removeEventListener('keydown', onKeyDown.bind(this))
		}
	},[])

	useEffect(() => {
		if (getMap())
			loadMap(getMap(), false)
	}, [gameState.state.mapId])

	/****************************************************
	 * Map Functions                                    *
	 ****************************************************/
	const getMap = () => {
		const map = gameState.state.maps[gameState.state.mapId]
		return map || Object.values(gameState.state.maps)[0]
	}

	const dumpCanvas = (which) => {
		//TODO: This function is simply a mess. This surely needs to be revisited
		const map = getMap()
		const changedAt = map[`$${which}ChangedAt`]
		const dumpedAt = map[`$${which}DumpedAt`]
		if (gameState.isHost && changedAt && (!dumpedAt || dumpedAt < changedAt)) {
			const at = new Date()
			const url = gameState[`${which}Ref`].current.buildDataUrl()
			console.log('dumped', which, url)
			return [url, at]
		}
		else
			return [map[`${which}Url`], dumpedAt]
	}

	/* Copy maps and dump current data urls, suitable for save to state or localStorage */
	const dumpMaps = () => {
		console.log('dumpMaps')
		let mapId = gameState.state.mapId

		/* Infer map id if it's not set */
		if (undefined === mapId)
			mapId = 
				Object
					.keys(gameState.state.maps)
					.find(key => gameState.state.maps[key] === gameState.map)
		
		const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps))
		const map = mapsCopy[mapId]
		if (map && gameState.state.isFirstLoadDone) { /* Map may have been deleted */
			notify('Building data urls...', undefined, 'dumpMaps')
			[map.fogUrl, map.$fogDumpedAt] = dumpCanvas('fog')
			[map.drawUrl, map.$drawDumpedAt] = dumpCanvas('draw')
			notify('Data urls readied', undefined, 'dumpMaps')
		}
		return mapsCopy
	}

	/* From playarea to state */
	const saveMap = () => {
		return new Promise((resolve, reject) => {
			//TODO: Verify if ,resolve is really needed or working
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: dumpMaps(),
				},
			}, resolve)
		})
	}

	const loadMap = (map, skipSave, noEmit) => {
		if (!map)
			map = getMap()
		if (!map)
			return Promise.reject('no map')
		const note = notify(`loading map ${map.$id}...`, 6000, 'loadMap')
		if (undefined === map.$id)
			map.$id = Object.keys(gameState.state.maps).find(key => gameState.state.maps[key] === getMap())
		const needsSave = gameState.isHost && gameState.state.isFirstLoadDone && !skipSave
		const savePromise = needsSave ? saveMap() : Promise.resolve()
		if (!noEmit && gameState.isHost && websocket)
			websocket.pushMapId(map.$id)
		const newStateAttributes = {
			mapId: map.$id,
			isFirstLoadDone: true,
			isFogLoaded: true,
		}
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				...newStateAttributes,
			}
		})
		note && note.close()
		notify('map loaded', undefined, 'loadMap')
	}

	const initAsDev = () => {
		if (!window.confirm('Reset?'))
			return null
		let tokens = [
			{ name: 'bar', pc: 0 },
			{ name: 'foo', url: '/dev/belmont.jpg' },
			{ name: 'arr', pc: 1 },
			{ name: 'win', pc: 1, url: '/dev/redhead.jpg', y: 50, x: 90, w: 64, h:64 },
		]
		let defaultMap = {
			url: '/dev/FFtri9T.png',
			spawnX: 40,
			spawnY: 80,
			$id: 2,
		}
		let kiwiMap = {
			name: 'kiwi',
			url: '/dev/kiwi.jpeg',
			$id: 1,
			w: 500,
			h: 500,
		}
		return new Promise(resolve => {
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: Object.fromEntries([defaultMap, kiwiMap].map(m => [m.$id, m])),
					tokens: tokens,
					mapId: kiwiMap.$id,
				},
			})
			loadMap()
			resolve()
		})
	}

	/****************************************************
	 * Update Functions                                 *
	 ****************************************************/
	const updateTokens = (callback, noEmit) => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens))
		if (!tokensCopy || !Array.isArray(tokensCopy))
			return
		tokensCopy.forEach(callback)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			},
		})
		if (!noEmit && websocket)
			websocket.pushTokens(tokensCopy)
	}

	const updateToken = (token, callback, noEmit) => {
		const tokenIdx = gameState.state.tokens.indexOf(token)
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens))
		const tokenCopy = tokensCopy[tokenIdx]
		callback(tokenCopy, tokenIdx, tokensCopy)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			},
		})
		if (!noEmit && websocket)
			websocket.pushToken(tokenIdx, tokenCopy)
	}

	const updateTokenByIndex = (index, attrs, noEmit) => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens))
		const tokenCopy = Object.assign(tokensCopy[index], attrs)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			},
		})
		if (!noEmit && websocket)
			websocket.pushToken(index, tokenCopy)
	}

	const updateCursors = (x, y, name, guid) => {
		const cursors = Object.assign({}, gameState.state.cursors)
		cursors[guid] = { x: x, y: y, time: new Date(), u: name }
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				cursors: cursors,
			},
		})
	}

	const updateMap = (callback) => {
		return new Promise(resolve => {
			const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps))
			callback(mapsCopy[gameState.state.mapId])
			//TODO: Verify if ,resolve is really needed or working
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: mapsCopy,
				},
			}, resolve)
		})
	}

	/****************************************************
	 * Control Functions                                *
	 ****************************************************/
	const selectToken = (token, trueFalse, multiSelect) => {
		if (!token.pc && !gameState.isHost)
			return
		const tokenIdx = gameState.state.tokens.indexOf(token)
		updateTokens((copy, $i) => {
			if (tokenIdx === $i) {
				if (trueFalse === undefined || trueFalse === null)
					trueFalse = !copy.$selected
				copy.$selected = trueFalse
			} else if (!multiSelect)
				copy.$selected = false
			
			if (copy.$selected) { /* set initial coords (for drag) */
				copy.$x0 = copy.x
				copy.$y0 = copy.y
			}
		}, true)
	}

	const dragSelectedTokens = (evt) => {
		if (gameState.state.tool !== 'move')
			return
		const downX = gameState.state.downX, downY = gameState.state.downY
		updateTokens(token => {
			if (token.$selected) {
				token.x = token.$x0 + evt.pageX - downX
				token.y = token.$y0 + evt.pageY - downY
			}
		})
	}

	const resetFog = () => {
		//TODO: How do I update the game's State?
		//game.fogRef.current.fill()
	}

	/****************************************************
	 * Event Handlers                                   *
	 ****************************************************/
	/* Callback when the window resizes */
	const onResize = () => {
		loadMap(null, true, true)
	}

	const onKeyDown = (e) => {
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if (x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) /* eslint-disable-line eqeqeq */
				return e
		
		const moveFactor = e.shiftKey ? 100 : 10
		const moveSelectedTokens = () => {
			updateTokens(token => {
				if (token.$selected) {
					switch (e.keyCode) {
						case 27: /* escape */
							token.$selected = false
							break
						case 37: /* left */
							token.x -= moveFactor
							break
						case 38: /* up */
							token.y -= moveFactor
							break
						case 39: /* right */
							token.x += moveFactor
							break
						case 40: /* down */
							token.y += moveFactor
							break
						default: return
					}
					e.preventDefault()
				}
			})
		}
		switch (e.keyCode) {
			case 27:
			case 37:
			case 38:
			case 39:
			case 40:
				moveSelectedTokens(e)
				break
			default: return
		}
	}

	const onKeyPress = (e) => {
		if (!gameState.isHost)
			return e
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if (x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) /* eslint-disable-line eqeqeq */
				return e
		
		/*
		const toggle = (key, location) => {
			(location||this).setState({[key]: !(location||this).state[key]})
		}
		*/
		const cp = gameState.cpRef.current
		switch(e.code) {
			case 'KeyC':
				if (e.shiftKey)
					cp.copyJson() /* dump json to clipboard */
				break
			case 'KeyH':
				//TODO: toggle hidden property on Control Panel State
				//toggle('hidden', cp)
				break
			case 'KeyG':
				setGameState({
					...gameState,
					state: {
						...gameState.state,
						tool: 'fog',
					},
				})
				break
			case 'KeyL':
				if (e.shiftKey)
					loadFromLocalStorage()
				else
					saveToLocalStorage()
				break
			case 'KeyM':
				//TODO: toggle toggleOnMaps property on Control Panel State
				//toggle('toggleOnMaps', cp)
				break
			case 'KeyP':
				setGameState({
					...gameState,
					state: {
						...gameState.state,
						tool: 'draw',
					},
				})
				break
			case 'KeyT':
				//TODO: toggle toggleOnTokens property on Control Panel State
				//toggle('toggleOnTokens', cp)
				break
			case 'KeyV':
				if (e.shiftKey)
					cp.pasteJson() /* load json from clipboard */
				else
				setGameState({
					...gameState,
					state: {
						...gameState.state,
						tool: 'move',
					},
				})
				break
			default: return
		}
	}

	const onMouseUp = (e) => {
		updateTokens(tok => {
			tok.$x0 = tok.x
			tok.$y0 = tok.y
		}, true)
		//TODO: Verify where we have to update this state
		/*
		this.setState({
			lastX: undefined, lastY: undefined,
		})
		this.overlayRef.current.setState({
			lastX: undefined, lastY: undefined,
		})
		*/
	}

	const onMouseDown = (e) => {
		if (e.buttons & 1) {
			if (!/(\s|^)token(\s|$)/.test(e.target.getAttribute('class')))
				updateTokens(tok => {delete tok.$selected})
			//TODO: Verify where we have to update this state
			/*
			this.setState({
				lastX: e.pageX, lastY: e.pageY,
				downX: e.pageX, downY: e.pageY,
			})
			*/
		}
	}

	const onMouseMove = (e) => {
		const overlay = gameState.overlayRef.current
		if (!overlay)
			return
		if (overlay.canvasRef && overlay.canvasRef.current)
			overlay.clear()
		let x = e.pageX, y = e.pageY
		switch (gameState.isHost ? gameState.state.tool : 'move') {
			case 'fog':
				if (e.buttons & 1)
					overlay.fogErase(x, y)
				overlay.setPointerOutline(x, y, 'yellow', gameState.state.fogRadius)
				break
			case 'draw':
				if (e.buttons & 1)
					overlay.drawOrErase(x, y)
				overlay.setPointerOutline(x, y, gameState.state.drawColor, gameState.state.drawSize)
				break
			case 'move':
				if (e.buttons & 1)
					dragSelectedTokens(e)
				break
			default: break
		}
		//TODO: Verify where we have to update this state
		/*
		this.setState({lastX: e.pageX, lastY: e.pageY})
		*/
		if (websocket && gameState.state['toggleOnShare mouse (cursor)'])
			websocket.pushCursor(e.pageX, e.pageY)
	}

	/****************************************************
	 * Helper Functions                                 *
	 ****************************************************/
	const scrubObject = (object) => {
		for (let key in object) if (/^\$/.test(key) && key !== '$id') delete object[key]
	}

	const notify = (msg, ttl, tag) => {
		console.log(msg)
		if (window.Notification) {
			if (window.Notification.permission !== 'granted')
				window.Notification.requestPermission()
			else {
				const note = new window.Notification(msg, {tag: tag})
				setTimeout(() => note.close(), ttl || 1000)
				return note
			}
		}
	}

	const toJson = (additionalAttrs) => {
		const map = getMap()
		const newGeneration = 1 + (gameState.state.gen || 0)
		/* Generation is tracked so that we don't get refresh loops when multiple DMs exist. */
		if (gameState.isHost)
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					gen: newGeneration,
				},
			})
		const tokens = gameState.state.tokens.map(token => ({...token}))
		tokens.forEach(token => scrubObject(token))
		const maps = dumpMaps()
		Object.values(maps).forEach(map => scrubObject(map))
		const data = Object.assign({
			gen: newGeneration,
			maps: maps,
			mapId: map && map.$id,
			tokens: tokens,
		}, additionalAttrs)
		return JSON.stringify(data)
	}

	const fromJson = (json) => {
		const data = Object.assign(JSON.parse(json)||{})
		if (data.tokens) {
			data.tokens.forEach(token => {
				if (!token.guid) token.guid = guid()
			})
		}
		return new Promise(resolve => {
			//TODO: Verify how we can use this correctly
			/*
			this.setState(data, () => loadMap().then(resolve))
			*/
		})
	}

	const saveToLocalStorage = () => {
		if (gameState.state.isFirstLoadDone) {
			console.log('Saving game to local storage')
			localStorage.setItem(gameState.room, toJson())
		}
	}

	const loadFromLocalStorage = () => {
		console.log('Loading game from local storage')
		return fromJson(localStorage.getItem(gameState.room))
	}

	function handleError (ex) {
		console.error(ex)
		console.error('Exception in `render`. Clearing localStorage...')
		localStorage.removeItem(gameState.room)
		window.alert('Fatal error. Local storage cleared.')
	}

	/****************************************************
	 * Component Render                                 *
	 ****************************************************/
	try {
		return (
			<GameView 
				gameState={ gameState } 
				setGameState={ setGameState } 
				controlPanelState={ controlPanelState } 
				setControlPanelState={ setControlPanelState } 
				websocket={ websocket }
				onMouseMove={ onMouseMove } 
				onMouseUp={ onMouseUp } 
				onMouseDown={ onMouseDown } 
				fromJson={ fromJson } 
				notify={ notify } 
				token={ undefined } /* TODO: Verify what this is */
				initAsDev={ initAsDev } 
				loadMap={ loadMap } 
				updateTokens={ updateTokens } 
				updateGameToken={ updateToken } 
				selectGameToken={ selectToken } 
				updateMap={ updateMap } 
				resetFog={ resetFog }
			/>
		)
	} catch (ex) {
		handleError(ex)
	}
}

export default Game
