import React, { useEffect, useState } from 'react'
import GameView from '../views/GameView.js'
import guid from '../controllers/guid.js'
import GameSocket from './Gamesocket'

const initialGameState = (overlayRef, fogRef, drawingRef) => {
	const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))

	return {
		websocket: null,
		isHost: params.get('host'),
		room: params.get('room'),
		overlayRef: overlayRef,
		fogRef: fogRef,
		drawingRef: drawingRef,
		state: {
			maps: [],
			tokens: [],
			cursors: [],
			cursorSize: 50,
			fogOpacity: 0.5,
			fogRadius: 33,
			isFogLoaded: false,
			isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
			drawColor: 'purple',
			drawSize: 8,
			tool: 'move',
			subtool: undefined,
			username: params.get('host') ? 'DM' : 'PC',
			'toggleOnShare mouse (cursor)': true,
			lastX: undefined,
			lastY: undefined,
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
	const overlayRef = React.useRef()
	const fogRef = React.useRef()
	const drawingRef = React.useRef()
	const [gameState, setGameState] = useState(initialGameState(overlayRef, fogRef, drawingRef))
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
		if (gameState.state.maps.length === 0)
			return undefined
		const map = gameState.state.maps.filter(map => map.$id === gameState.state.mapId)
		return map.length > 0 ? map[0] : gameState.state.maps[0]
	}

	const dumpCanvas = (which) => {
		const map = getMap()
		const changedAt = map[`$${which}ChangedAt`]
		const dumpedAt = map[`$${which}DumpedAt`]
		
		//if (gameState.isHost && changedAt && (!dumpedAt || dumpedAt < changedAt)) {
		if (gameState.isHost) {
			const at = new Date()
			let url
			switch(which) {
				case 'fog':
					url = gameState.fogRef.current.toDataURL()
					break
				case 'draw':
					url = gameState.drawingRef.current.toDataURL()
					break
				default:
					url = undefined
					break
			}
			return [url, at]
		}
		else
			return [map[`${which}Url`], dumpedAt]
	}

	/* Copy maps and dump current data urls, suitable for save to state or localStorage */
	const dumpMaps = () => {
		let newMap = getMap()
		if (newMap && gameState.state.isFirstLoadDone) {
			//TODO: Reenable notification for dumping of canvases
			//notify('Building data urls...', undefined, 'dumpMaps')
			let [url,dumpedAt] = dumpCanvas('draw')
			newMap.fogUrl = url
			newMap.$fogDumpedAt = dumpedAt
			[url,dumpedAt] = dumpCanvas('draw')
			newMap.drawUrl = url
			newMap.$drawDumpedAt = dumpedAt
			//notify('Data urls readied', undefined, 'dumpMaps')
		}
		const mapsCopy = gameState.state.maps.map(map => {
			return map.$id === newMap.$id ? newMap : map
		})
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
		const needsSave = gameState.isHost && gameState.state.isFirstLoadDone && !skipSave
		const savePromise = needsSave ? saveMap() : Promise.resolve()
		if (!noEmit && gameState.isHost && websocket)
			websocket.pushMapId(map.$id)
		updateFogAndDraw(map)
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
		let maps = [
			{
				name: 'kiwi',
				url: '/dev/kiwi.jpeg',
				$id: 0,
				width: 500,
				height: 500,
			},
			{
				name: 'default',
				url: '/dev/FFtri9T.png',
				spawnX: 40,
				spawnY: 80,
				$id: 1,
			}
		]
		return new Promise(resolve => {
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: maps,
					tokens: tokens,
					mapId: 0,
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
		const tokensCopy = tokens.map(callback)
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
			const mapsCopy = gameState.state.maps
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

	const updatedMapCanvasChangedAt = (canvasName) => {
		let newMap = getMap()
		if (!newMap)
			return []
		if (canvasName === 'move')
			return gameState.state.maps
		newMap[`$${canvasName}ChangedAt`] = new Date()
		const mapsCopy = gameState.state.maps.map(map => {
			return map.mapId === gameState.state.mapId ? newMap : map
		})
		return mapsCopy
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
	const selectToken = (token, tokenSelected, multiSelect) => {
		if (!token.pc && !gameState.isHost)
			return
		const tokenIdx = gameState.state.tokens.indexOf(token)
		updateTokens((copy, $i) => {
			if (tokenIdx === $i) {
				if (tokenSelected === undefined || tokenSelected === null)
					tokenSelected = !copy.$selected
				copy.$selected = tokenSelected
			} else if (!multiSelect)
				copy.$selected = false
			
			// set initial coords (for drag)
			//TODO: fix initial records, tokens jump on selection through mousekey
			if (copy.$selected) {
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
		}, false, undefined)
	}

	/****************************************************
	 * Drawing Functions                                *
	 ****************************************************/
	const getFogContext = () => {
		if (!gameState.fogRef)
			return undefined
		if (!gameState.fogRef.current)
			return undefined
		return gameState.fogRef.current.getContext('2d')
	}

	const getDrawingContext = () => {
		if (!gameState.drawingRef)
			return undefined
		if (!gameState.drawingRef.current)
			return undefined
		return gameState.drawingRef.current.getContext('2d')
	}

	 const drawFog = () => {
		const ctx = getFogContext()
		if (!ctx)
			return
		ctx.globalCompositeOperation = 'destination-over'
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, gameState.state.width, gameState.state.height)
	}

	const resetFog = () => {
		drawFog()
	}

	const fogErase = (x, y, r, r2, noEmit) => {
		const ctx = getFogContext()
		if (!ctx)
			return
		if (!r)
			r = gameState.state.fogRadius
		ctx.globalCompositeOperation = 'destination-out'
		let gradient = ctx.createRadialGradient(x, y, r2||1, x, y, r*0.75)
		gradient.addColorStop(0, 'rgba(0,0,0,255)')
		gradient.addColorStop(1, 'rgba(0,0,0,0)')
		ctx.fillStyle = gradient
		ctx.fillRect(x-r, y-r, x+r, y+r)
		ctx.globalCompositeOperation = 'destination-over'
		if (!noEmit)
			websocket.pushFogErase(x, y, r, r2)
	}

	const draw = (x, y, opts, noEmit) => {
		const ctx = getDrawingContext()
		if (!ctx)
			return
		
		ctx.beginPath()
		ctx.arc(x, y, gameState.state.drawSize, 0, 2 * Math.PI, false)
		ctx.fillStyle = gameState.state.drawColor
		ctx.fill()
		ctx.lineWidth = 5
		ctx.strokeStyle = gameState.state.drawColor
		ctx.stroke()
		if (!noEmit) {			
			websocket.pushDraw(opts)
		}
	}

	const erase = (x, y, r, noEmit) => {
		const ctx = getDrawingContext()
		if (!ctx)
			return
		const radius = r || gameState.state.drawSize
		ctx.save()
		ctx.globalCompositeOperation = 'destination-out'
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, Math.PI*2, true)
		ctx.fill()
		ctx.restore()
		if (!noEmit)
			websocket.pushErase(x, y, radius)
	}

	const drawOrErase = (x, y) => {
		const isEraser = gameState.state.subtool === 'eraser'
		if (isEraser)
			erase(x, y)
		else
			draw(x, y)
	}

	const updateFogAndDraw = (map) => {
		const fogCtx = getFogContext()
		const drawCtx = getDrawingContext()

		drawFog()
		if (map.fogUrl) {
			let img = new Image()
			img.onload = function(){
				fogCtx.drawImage(img, 0, 0, gameState.state.width, gameState.state.height)
			}
			img.src = map.fogUrl
		}

		drawCtx.clearRect(0, 0, gameState.state.width, gameState.state.height)
		if (map.drawUrl) {
			let img = new Image()
			img.onload = function(){
				drawCtx.drawImage(img, 0, 0, gameState.state.width, gameState.state.height)
			}
			img.src = map.drawUrl
		}
	}

	const setPointerOutline = (x, y, color, radius) => {
		if (color == null)
			return
		const ctx = gameState.overlayRef.current.getContext('2d')
		ctx.strokeStyle = color
		ctx.lineWidth = '3'
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2*Math.PI)
		ctx.stroke()
		ctx.closePath()
	}

	const clearOverlay = () => {
		const ctx = gameState.overlayRef.current.getContext('2d')
		if (!ctx)
			return
		ctx.clearRect(0, 0, gameState.state.width, gameState.state.height);
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
		const updatedTokens = gameState.state.tokens.map(token => {
			token.$x0 = token.x
			token.$y0 = token.y
			return token
		})
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: updatedTokens,
				maps: updatedMapCanvasChangedAt(gameState.state.tool),
				lastX: e.pageX,
				lastY: e.pageY,
				downX: undefined,
				downY: undefined,
			}
		})
	}

	const onMouseDown = (e) => {
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if ((x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) || (x.tagName == 'BUTTON')) /* eslint-disable-line eqeqeq */
				return e

		if (e.buttons & 1) {
			if (!/(\s|^)token(\s|$)/.test(e.target.getAttribute('class')))
				//TODO: Update to map function
				updateTokens(tok => { delete tok.$selected })
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					lastX: undefined,
					lastY: undefined,
					downX: e.pageX,
					downY: e.pageY,
				}
			})
		}
	}

	const onMouseMove = (e) => {
		const overlay = gameState.overlayRef
		if (!overlay)
			return
		clearOverlay()
		let x = e.pageX, y = e.pageY
		switch (gameState.isHost ? gameState.state.tool : 'move') {
			case 'fog':
				if (e.buttons & 1)
					fogErase(x, y)
				setPointerOutline(x, y, 'yellow', gameState.state.fogRadius)
				break
			case 'draw':
				if (e.buttons & 1)
					drawOrErase(x, y)
				setPointerOutline(x, y, gameState.state.drawColor, gameState.state.drawSize)
				break
			case 'move':
				if (e.buttons & 1)
					dragSelectedTokens(e)
				break
			default: break
		}
		if ((gameState.state.tool === 'fog' || gameState.state.tool === 'draw') && (e.buttons & 1)) {
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					lastX: x,
					lastY: y,
				}
			})
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
		//TODO: Verify how come this does not work anymore
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
