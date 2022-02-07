import React, { useEffect, useState } from 'react'
import GameView from '../views/GameView.js'
import guid from '../controllers/guid.js'

const initialGameState = (overlayRef) => {
	const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))

	return {
		websocket: null,
		overlayRef: overlayRef,
		settings: {
			cursorSize: 50,
			fogOpacity: 0.5,
			fogRadius: 33,
			drawColor: 'purple',
			drawSize: 8,
			tool: 'move',
			subtool: undefined,
			username: params.get('host') ? 'DM' : 'PC',
			shareMouse: true,
		},
		metadata: {
			isHost: params.get('host'),
			room: params.get('room'),
			cursors: [],
			lastX: undefined,
			lastY: undefined,
			downX: undefined,
			downY: undefined,
		},
		game: {
			mapId: undefined,
			gen: 0,
			width: window.innerWidth,
			height: window.innerHeight,
			isFogLoaded: false,
			isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
			maps: [],
			tokens: [],
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

const Game = ({ websocket }) => {
	const overlayRef = React.useRef()
	const [gameState, setGameState] = useState(initialGameState(overlayRef))
	const [controlPanelState, setControlPanelState] = useState(initialControlPanelState)
	let currentPath = []

	// On Mount
	useEffect(() => {
		window.addEventListener('beforeunload', saveToLocalStorage)
		window.addEventListener('resize', onResize)
		window.addEventListener('keypress', onKeyPress)
		window.addEventListener('keydown', onKeyDown)
		websocket.addCallbacks( gameState.metadata.isHost, receiveData )
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

	/*
	useEffect(() => {
		if (websocket && gameState.settings.shareMouse)
			websocket.pushCursor(gameState.metadata.lastX, gameState.metadata.lastY)
	}, [gameState.metadata.lastX, gameState.metadata.lastY, gameState.settings.shareMouse])
	*/

	useEffect(() => {
		//TODO: reenable websocket push
		//if (websocket)
		//	websocket.pushTokens(gameState.game.tokens)
	}, [gameState.game.tokens])

	/****************************************************
	 * Map Functions                                    *
	 ****************************************************/
	const getMap = () => {
		if (gameState.game.maps.length === 0)
			return undefined
		const currMap = gameState.game.maps.filter((map) => parseInt(map.$id) === parseInt(gameState.game.mapId))
		return currMap.length > 0 ? currMap[0] : gameState.game.maps[0]
	}

	/* Copy maps and dump current data urls, suitable for save to state or localStorage */
	const dumpMaps = () => {
		let newMap = getMap()
		const mapsCopy = gameState.game.maps.map(map => {
			return map.$id === newMap.$id ? newMap : map
		})
		return mapsCopy
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
				imageUrl: '/dev/kiwi.jpeg',
				$id: 0,
				width: 500,
				height: 500,
				x: 0,
				y: 0,
				drawPaths: [],
				fogPaths: [],
			},
			{
				name: 'default',
				imageUrl: '/dev/FFtri9T.png',
				spawnX: 40,
				spawnY: 80,
				$id: 1,
				x: 0,
				y: 0,
				drawPaths: [],
				fogPaths: [],
			}
		]
		return new Promise(resolve => {
			setGameState({
				...gameState,
				game: {
					...gameState.game,
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
		const tokens = JSON.parse(JSON.stringify(gameState.game.tokens || []))
		if (!tokens || !Array.isArray(tokens))
			return
		const tokensCopy = tokens.map(callback)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				...additionalStateProperties,	//TODO: Verify these state properties are put in the correct place
				tokens: tokensCopy,
			},
		})
	}

	const updateToken = (token, callback, noEmit) => {
		const tokenIdx = gameState.game.tokens.indexOf(token)
		const tokensCopy = JSON.parse(JSON.stringify(gameState.game.tokens || []))
		const tokenCopy = tokensCopy[tokenIdx]
		callback(tokenCopy, tokenIdx, tokensCopy)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				tokens: tokensCopy,
			},
		})
	}

	const updateTokenByIndex = (index, attrs, noEmit) => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.game.tokens || []))
		const tokenCopy = Object.assign(tokensCopy[index], attrs)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				tokens: tokensCopy,
			},
		})
	}

	/*
	const updateCursors = (x, y, name, guid) => {
		const cursors = Object.assign({}, gameState.metadata.cursors)
		cursors[guid] = { x: x, y: y, time: new Date(), u: name }
		setGameState({
			...gameState,
			metadata: {
				...gameState.metadata,
				cursors: cursors,
			},
		})
	}
	*/

	const updateMap = (callback) => {
		return new Promise(resolve => {
			const mapsCopy = gameState.game.maps
			callback(mapsCopy[gameState.game.mapId])
			//TODO: Verify if ,resolve is really needed or working
			setGameState({
				...gameState,
				game: {
					...gameState.game,
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
	const selectToken = (token, tokenSelected, multiSelect) => {
		if (!token.pc && !gameState.metadata.isHost)
			return
		const tokenIdx = gameState.game.tokens.indexOf(token)
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
		if (gameState.settings.tool !== 'move')
			return
		const downX = gameState.metadata.downX, downY = gameState.metadata.downY
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

	const updateCurrentDrawPath = () => {
		const ctx = gameState.overlayRef.current.getContext('2d')
		ctx.beginPath()
		for (let pointId = 0; pointId < currentPath.length; pointId++) {
			ctx.lineCap = 'round'
			ctx.fillStyle = currentPath[pointId].drawColor
			ctx.lineWidth = currentPath[pointId].drawSize
			ctx.strokeStyle = currentPath[pointId].drawColor
			if (pointId === 0) {
				ctx.moveTo(currentPath[pointId].x, currentPath[pointId].y)
			} else {
				ctx.lineTo(currentPath[pointId].x, currentPath[pointId].y)
			}
		}
		ctx.stroke()
	}

	const updateCurrentFogPath = () => {
		const ctx = gameState.overlayRef.current.getContext('2d')
		ctx.beginPath()
		let gradient
		for (let pointId = 0; pointId < currentPath.length; pointId++) {
			gradient = ctx.createRadialGradient(currentPath[pointId].x, currentPath[pointId].y, currentPath[pointId].r2 || 1, currentPath[pointId].x, currentPath[pointId].y, currentPath[pointId].r*0.75)
			ctx.lineCap = 'round'
			gradient.addColorStop(0, 'rgba(255,255,255,255)')
			gradient.addColorStop(1, 'rgba(255,255,255,0)')
			ctx.fillStyle = gradient
			ctx.fillRect(currentPath[pointId].x-currentPath[pointId].r, currentPath[pointId].y-currentPath[pointId].r, currentPath[pointId].x+currentPath[pointId].r, currentPath[pointId].y+currentPath[pointId].r)
		}
		ctx.stroke()
	}

	const clearOverlay = () => {
		const ctx = gameState.overlayRef.current.getContext('2d')
		if (!ctx)
			return
		ctx.clearRect(0, 0, gameState.game.width, gameState.game.height);
	}

	const resetFog = () => {
		const currMap = getMap()
		if (currMap && gameState.metadata.isHost) {
			currentPath = []
			const updatedMaps = gameState.game.maps.map((map) => {
				return map.$id === currMap.$id ? {...currMap, fogPaths: [], } : map
			})
			
			setGameState({
				...gameState,
				game: {
					...gameState.game,
					maps: updatedMaps,
				}
			})
		}
	}

	const resetDrawing = () => {
		const currMap = getMap()
		if (currMap && gameState.metadata.isHost) {
			currentPath = []
			const updatedMaps = gameState.game.maps.map((map) => {
				return map.$id === currMap.$id ? {...currMap, drawPaths: [], } : map
			})
			
			setGameState({
				...gameState,
				game: {
					...gameState.game,
					maps: updatedMaps,
				}
			})
		}
	}

	/****************************************************
	 * Event Handlers                                   *
	 ****************************************************/
	/* Callback when the window resizes */
	const onResize = () => {
		//loadMap(null, true, true)
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
		if (!gameState.metadata.isHost)
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
					settings: {
						...gameState.settings,
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
					settings: {
						...gameState.settings,
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
					settings: {
						...gameState.settings,
						tool: 'move',
					},
				})
				break
			default: return
		}
	}

	const onMouseUp = (e) => {
		const currMap = getMap()
		if (currMap && gameState.metadata.isHost) {
			const fogPaths = currMap.fogPaths
			const drawPaths = currMap.drawPaths
			switch (gameState.settings.tool) {
				case 'fog':
					fogPaths.push(currentPath)
					websocket.pushFog(currentPath)
					break
				case 'draw':
					drawPaths.push(currentPath)
					websocket.pushDraw(currentPath)
					break
				default: break
			}
			currentPath = []
			const updatedMaps = gameState.game.maps.map((map) => {
				return map.$id === currMap.$id ? {...currMap, fogPaths: fogPaths, drawPaths: drawPaths, } : map
			})
			
			setGameState({
				...gameState,
				settings: {
					...gameState.settings,
					maps: updatedMaps,
				}
			})
		}
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
			currentPath = []
			currentPath.push({
				x: e.pageX,
				y: e.pageY,
				r: gameState.settings.fogRadius,
				r2: undefined,
				tool: currentTool(),
				drawColor: gameState.settings.drawColor,
				drawSize: gameState.settings.drawSize,
			})
		}
	}

	const onMouseMove = (e) => {
		const overlay = gameState.overlayRef
		if (!overlay)
			return
		clearOverlay()
		let x = e.pageX, y = e.pageY
		switch (gameState.metadata.isHost ? gameState.settings.tool : 'move') {
			case 'fog':
				updateCurrentFogPath()
				setPointerOutline(x, y, 'yellow', gameState.settings.fogRadius)
				break
			case 'draw':
				updateCurrentDrawPath()
				setPointerOutline(x, y, gameState.settings.drawColor, gameState.settings.drawSize)
				break
			case 'move':
				if (e.buttons & 1)
					dragSelectedTokens(e)
				break
			default: break
		}
		if ((gameState.settings.tool === 'fog' || gameState.settings.tool === 'draw') && (e.buttons & 1)) {
			currentPath.push({
				x: x,
				y: y,
				r: gameState.settings.fogRadius,
				r2: undefined,
				tool: currentTool(),
				drawColor: gameState.settings.drawColor,
				drawSize: gameState.settings.drawSize,
			})
		}
	}

	const currentTool = () => {
		const isEraser = gameState.settings.subtool === 'eraser'
		switch (gameState.settings.tool) {
			case 'draw':
				if (isEraser) {
					return 'erease'
				} else {
					return 'draw'
				}
			default:
				return gameState.settings.tool
		}
	}

	/****************************************************
	 * Receiving Data                                   *
	 ****************************************************/
	const receiveData = (evt) => {
		let data = JSON.parse(evt.data)
		if (data.from === websocket.guid) {
			return // ignore messages sent by self
		}
		if (data.to && (data.to !== websocket.guid)) {
			return	// ignore dedicated messages not directed to self
		}
		switch (data.messageType) {
			case 'cursor':
				/*
				if (data.u !== this.gameState.settings.username)
					this.gameState.updateCursors(data.x, data.y, data.u, data.from)
				*/
				break
			case 'draw':
				const currMap = getMap()
				const updatedMaps = gameState.game.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, drawPaths: data.drawPath, } : map
				})
				setGameState({
					...gameState,
					settings: {
						...gameState.settings,
						maps: updatedMaps,
					}
				})
				break
			case 'fog': /* fog erasure */
				//this.gameState.overlayRef.current.fogErase(data.x, data.y, data.r, data.r2, true)
				break
			case 'fogReset': /* fog reset */
				//this.gameState.fogRef.current.fill()
				break
			case 'drawReset':
				break
			case 't': /* token */
				/*
				const local = this.gameState.game.tokens[data.i]
				const token = Object.assign(local, data.a) // Keep and `$` attrs like `$selected`
				this.gameState.updateTokenByIndex(data.i, token, true)
				*/
				break
			case 'ts': /* all tokens */
				/*
				const localTokensMap = this.gameState.game.tokens.reduce((out, tok) => {
					out[tok.guid] = tok
					return out
				}, {})
				const tokens = data.tokens.map(tok => Object.assign({}, localTokensMap[tok.guid], tok))
				this.gameState.setState({tokens: tokens})
				*/
				break
			case 'map': /* map id */
				console.log('loading map with id:',data.id)
				setGameState({
					...gameState,
					game: {
						...gameState.game,
						mapId: parseInt(data.id),
					}
				})
				break
			case 'refresh': /* refresh from host */
				if (data.to && data.to !== websocket.guid) {
					console.log(`Will not apply refresh from ${data.to} (self)`)
					return
				}
				console.log('starting refresh & updating state')
				console.log('current gameState',gameState)
				console.log('received data: ',data)
				const newGameState = {
					...gameState,
					game: {
						...gameState.game,
						...data.game,
					},
				}
				console.log('new GameState', newGameState)
				setGameState(newGameState)
				break
			case 'refreshRequest': /* refresh request from player */
				if (gameState.metadata.isHost) {
					console.log('pushing requested refresh. curr gamestate:', gameState)
					websocket.pushRefresh(gameState, { to: data.from, })
				}
				break
			default:
				console.error(`Unrecognized websocket message type: ${data.t}`)
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
		const newGeneration = 1 + (gameState.game.gen || 0)
		/* Generation is tracked so that we don't get refresh loops when multiple DMs exist. */
		if (gameState.metadata.isHost)
			setGameState({
				...gameState,
				game: {
					...gameState.game,
					gen: newGeneration,
				},
			})
		const tokens = gameState.game.tokens.map(token => ({...token}))
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
				game: {
					...gameState.game,
					data,
				}
			})
			resolve()
		})
	}

	const saveToLocalStorage = () => {
		if (gameState.game.isFirstLoadDone) {
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
				updateTokens={ updateTokens } 
				updateGameToken={ updateToken } 
				selectGameToken={ selectToken } 
				updateMap={ updateMap } 
				resetFog={ resetFog } 
				resetDrawing={ resetDrawing } 
			/>
		)
	} catch (ex) {
		handleError(ex)
	}
}

export default Game
