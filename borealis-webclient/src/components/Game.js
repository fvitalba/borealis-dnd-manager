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
			width: window.innerWidth,
			height: window.innerHeight,
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
		window.addEventListener('beforeunload', saveToLocalStorage)
		window.addEventListener('resize', onResize)
		window.addEventListener('keypress', onKeyPress)
		window.addEventListener('keydown', onKeyDown)
		loadFromLocalStorage()

		// On Unmount
		return () => {
			saveToLocalStorage()
			window.removeEventListener('beforeunload', saveToLocalStorage)
			window.removeEventListener('resize', onResize)
			window.removeEventListener('keypress', onKeyPress)
			window.removeEventListener('keydown', onKeyDown)
		}
	},[])

	useEffect(() => {
		if (websocket && gameState.state['toggleOnShare mouse (cursor)'])
			websocket.pushCursor(gameState.state.lastX, gameState.state.lastY)
	}, [gameState.state.lastX, gameState.state.lastY, gameState.state['toggleOnShare mouse (cursor)']])

	useEffect(() => {
		if (getMap())
			loadMap(getMap(), false)
	}, [gameState.state.mapId])

	useEffect(() => {
		//TODO: reenable websocket push
		//if (websocket)
		//	websocket.pushTokens(gameState.state.tokens)
	}, [gameState.state.tokens])

	/****************************************************
	 * Map Functions                                    *
	 ****************************************************/
	const getMap = () => {
		const maps = JSON.parse(JSON.stringify(gameState.state.maps || []))
		const map = maps[gameState.state.mapId] || undefined
		return map || Object.values(maps)[0]
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
		let mapId = gameState.state.mapId

		/* Infer map id if it's not set */
		if (undefined === mapId)
			mapId = 
				Object
					.keys(gameState.state.maps)
					.find(key => gameState.state.maps[key] === gameState.map)
		
		const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps || []))
		/*
		//TODO: generate dumping functions
		const map = mapsCopy[mapId]
		if (map && gameState.state.isFirstLoadDone) { // Map may have been deleted
			notify('Building data urls...', undefined, 'dumpMaps')
			[map.fogUrl, map.$fogDumpedAt] = dumpCanvas('fog')
			[map.drawUrl, map.$drawDumpedAt] = dumpCanvas('draw')
			notify('Data urls readied', undefined, 'dumpMaps')
		}
		*/
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
			resolve()
		})
	}

	/****************************************************
	 * Update Functions                                 *
	 ****************************************************/
	const updateTokens = (callback, noEmit, additionalStateProperties) => {
		const tokens = JSON.parse(JSON.stringify(gameState.state.tokens || []))
		if (!tokens || !Array.isArray(tokens))
			return
		console.info('tokens', tokens)
		const tokensCopy = tokens.map(callback)
		console.info('tokens Copy',tokensCopy)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				...additionalStateProperties,
				tokens: tokensCopy,
			},
		})
	}

	const updateToken = (token, callback, noEmit) => {
		const tokenIdx = gameState.state.tokens.indexOf(token)
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens || []))
		const tokenCopy = tokensCopy[tokenIdx]
		callback(tokenCopy, tokenIdx, tokensCopy)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			},
		})
	}

	const updateTokenByIndex = (index, attrs, noEmit) => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens || []))
		const tokenCopy = Object.assign(tokensCopy[index], attrs)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			},
		})
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
			const mapsCopy = JSON.parse(JSON.stringify(gameState.state.maps || []))
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

	const toggleControlPanelVisibility = (key) => {
		setControlPanelState({
			...controlPanelState,
			[key]: !controlPanelState[key],
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
			return copy
		}, true)
	}

	const dragSelectedTokens = (e) => {
		if (gameState.state.tool !== 'move')
			return
		const downX = gameState.state.downX, downY = gameState.state.downY
		updateTokens((token) => {
			if (token.$selected) {
				token.x = token.$x0 + e.pageX - downX
				token.y = token.$y0 + e.pageY - downY
			}
			return token
		}, false, { lastX: e.pageX, lastY: e.pageY, })
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
		console.info('onKeyDown triggered')
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
				return token
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
			if ((x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) || (x.tagName == 'BUTTON')) /* eslint-disable-line eqeqeq */
				return e

		const cp = gameState.cpRef.current
		switch(e.code) {
			case 'KeyC':
				if (e.shiftKey)
					cp.copyJson() // dump json to clipboard
				break
			case 'KeyH':
				toggleControlPanelVisibility('hidden')
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
				toggleControlPanelVisibility('toggleOnMaps')
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
				toggleControlPanelVisibility('toggleOnTokens')
				break
			case 'KeyV':
				if (e.shiftKey)
					cp.pasteJson() // load json from clipboard
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
		console.info('mouse released')
		updateTokens(token => {
			token.$x0 = token.x
			token.$y0 = token.y
			return token
		}, true, { lastX: undefined, lastY: undefined, })
		//TODO: Verify where we have to update this state
		/*
		this.overlayRef.current.setState({
			lastX: undefined, lastY: undefined,
		})
		*/
	}

	const onMouseDown = (e) => {
		console.info('mouse selected')
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if ((x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) || (x.tagName == 'BUTTON')) /* eslint-disable-line eqeqeq */
				return e

		if (e.buttons & 1) {
			if (!/(\s|^)token(\s|$)/.test(e.target.getAttribute('class')))
				//TOOD: Update to map function
				updateTokens(tok => {delete tok.$selected})
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					lastX: e.pageX,
					lastY: e.pageY,
					downX: e.pageX,
					downY: e.pageY,
				}
			})
		}
	}

	const onMouseMove = (e) => {
		/*
		const overlay = gameState.overlayRef.current
		if (!overlay)
			return
		if (overlay.canvasRef && overlay.canvasRef.current)
			overlay.clear()
		*/
		let x = e.pageX, y = e.pageY
		switch (gameState.isHost ? gameState.state.tool : 'move') {
			case 'fog':
				/*
				if (e.buttons & 1)
					overlay.fogErase(x, y)
				overlay.setPointerOutline(x, y, 'yellow', gameState.state.fogRadius)
				*/
				break
			case 'draw':
				/*
				if (e.buttons & 1)
					overlay.drawOrErase(x, y)
				overlay.setPointerOutline(x, y, gameState.state.drawColor, gameState.state.drawSize)
				*/
				break
			case 'move':
				if (e.buttons & 1)
					dragSelectedTokens(e)
				break
			default: break
		}
	}

	/****************************************************
	 * Helper Functions                                 *
	 ****************************************************/
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
		tokens.forEach(token => websocket.scrubObject(token))
		const maps = dumpMaps()
		Object.values(maps).forEach(map => websocket.scrubObject(map))
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
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					data,
				}
			})
			resolve()
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
