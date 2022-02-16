import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { setGameSettings } from '../reducers/metadataReducer.js'
import { overwriteGame, updateMaps, loadMap, addMap, incrementGen, setFogEnabled, updateTokens } from '../reducers/gameReducer.js'
import { pushDrawPath, pushFogPath, pushGameRefresh, useWebSocket } from '../hooks/useSocket.js'
import GameView from '../views/GameView.js'

const Game = ({ metadata, game, settings, setGameSettings, overwriteGame, loadMap, updateMaps, addMap, updateTokens, incrementGen, setFogEnabled }) => {
	const overlayRef = React.useRef()
	const [webSocket, wsSettings, setWsSettings] = useWebSocket()
	const [mousePosition, setMousePosition] = useState({ downX: 0, downY: 0})
	let currentPath = []

	/****************************************************
	 * Map Functions                                    *
	 ****************************************************/
	const getMap = () => {
		if (game.maps.length === 0)
			return undefined
		const currMap = game.maps.filter((map) => map.$id === game.mapId)
		return currMap.length > 0 ? currMap[0] : game.maps[0]
	}

	/****************************************************
	 * Update Functions                                 *
	 ****************************************************/
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

	/****************************************************
	 * Control Functions                                *
	 ****************************************************/
	const dragSelectedTokens = (e) => {
		if (settings.tool !== 'move')
			return

		const newTokens = game.tokens.map((token) => {
			return !token.$selected ? token : {
				...token,
				x: token.$x0 + (e.pageX - mousePosition.downX),
				y: token.$y0 + (e.pageY - mousePosition.downY),
			}
		})
		updateTokens(newTokens)
	}

	/****************************************************
	 * Drawing Functions                                *
	 ****************************************************/
	const setPointerOutline = (x, y, color, radius) => {
		if (color == null)
			return
		const ctx = overlayRef.current.getContext('2d')
		ctx.strokeStyle = color
		ctx.lineWidth = '3'
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2*Math.PI)
		ctx.stroke()
		ctx.closePath()
	}

	const updateCurrentDrawPath = () => {
		const ctx = overlayRef.current.getContext('2d')
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
		const ctx = overlayRef.current.getContext('2d')
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
		const ctx = overlayRef.current.getContext('2d')
		if (!ctx)
			return
		ctx.clearRect(0, 0, game.width, game.height);
	}

	/****************************************************
	 * Event Handlers                                   *
	 ****************************************************/
	/* Callback when the window resizes */
	const onResize = () => {
		//loadMap(null, true, true)
	}

	const onKeyDown = (e) => {
		//TODO: Update onKeyDown function
		/*
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if (x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) // eslint-disable-line eqeqeq
				return e
		
		const moveFactor = e.shiftKey ? 100 : 10
		const moveSelectedTokens = () => {
			updateTokens(token => {
				if (token.$selected) {
					switch (e.keyCode) {
						case 27: // escape
							token.$selected = false
							break
						case 37: // left
							token.x -= moveFactor
							break
						case 38: // up
							token.y -= moveFactor
							break
						case 39: // right
							token.x += moveFactor
							break
						case 40: // down
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
		*/
	}

	/*
	const onKeyPress = (e) => {
		if (!gameState.metadata.isHost)
			return e
		for (let x of [document.activeElement, e.target])
			//TODO: Check if we can use triple equal
			if ((x.tagName == 'INPUT' && (x.type === 'text' || x.type === 'number')) || (x.tagName == 'BUTTON'))
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
	*/

	const onMouseUp = (e) => {
		const currMap = getMap()
		if (currMap && metadata.isHost) {
			const fogPaths = currMap.fogPaths
			const drawPaths = currMap.drawPaths
			switch (settings.tool) {
				case 'fog':
					fogPaths.push(currentPath)
					pushFogPath(webSocket, wsSettings, currentPath)
					break
				case 'draw':
					drawPaths.push(currentPath)
					pushDrawPath(webSocket, wsSettings, currentPath)
					break
				default: break
			}
			currentPath = []
			const updatedMaps = game.maps.map((map) => {
				return map.$id === currMap.$id ? {...currMap, fogPaths: fogPaths, drawPaths: drawPaths, } : map
			})
			
			updateMaps(updatedMaps)
		}
	}

	const onMouseDown = (e) => {
		for (let x of [document.activeElement, e.target])
			if ((x.tagName.toUpperCase() == 'INPUT' && (x.type.toUpperCase() === 'TEXT' || x.type.toUpperCase() === 'NUMBER')) || (x.tagName.toUpperCase() === 'BUTTON')) /* eslint-disable-line eqeqeq */
				return e

		if (metadata.isHost) {
			if (e.buttons & 1) {
				currentPath = []
				currentPath.push({
					x: e.pageX,
					y: e.pageY,
					r: settings.fogRadius,
					r2: undefined,
					tool: currentTool(),
					drawColor: settings.drawColor,
					drawSize: settings.drawSize,
				})
			}
		}

		setMousePosition({ downX: parseInt(e.pageX), downY: parseInt(e.pageY) })
	}

	const onMouseMove = (e) => {
		const overlay = overlayRef
		if (!overlay)
			return

		clearOverlay()
		let x = e.pageX, y = e.pageY
		switch (metadata.isHost ? settings.tool : 'move') {
			case 'fog':
				updateCurrentFogPath()
				setPointerOutline(x, y, 'yellow', settings.fogRadius)
				break
			case 'draw':
				updateCurrentDrawPath()
				setPointerOutline(x, y, settings.drawColor, settings.drawSize)
				break
			case 'move':
				if (e.buttons & 1)
					dragSelectedTokens(e)
				break
			default: break
		}
		if ((settings.tool === 'fog' || settings.tool === 'draw') && (e.buttons & 1)) {
			currentPath.push({
				x: x,
				y: y,
				r: settings.fogRadius,
				r2: undefined,
				tool: currentTool(),
				drawColor: settings.drawColor,
				drawSize: settings.drawSize,
			})
		}
	}

	const currentTool = () => {
		const isEraser = settings.subtool === 'eraser'
		switch (settings.tool) {
			case 'draw':
				if (isEraser) {
					return 'erease'
				} else {
					return 'draw'
				}
			default:
				return settings.tool
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
		//TODO: rewrite toJson
		/*
		const map = getMap()
		incrementGen()
		const tokens = game.tokens.map(token => ({...token}))
		tokens.forEach(token => websocket.scrubObject(token))
		const maps = game.maps
		Object.values(maps).forEach(map => websocket.scrubObject(map))
		const data = Object.assign({
			gen: game.gen,
			maps: maps,
			mapId: map && map.$id,
			tokens: tokens,
		}, additionalAttrs)
		return JSON.stringify(data)
		*/
	}

	const fromJson = (json) => {
		//TODO: rewrite fromJson
		/*
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
		*/
	}

	const saveToLocalStorage = () => {
		//TODO: Reenable after we've fixed toJson
		/*
		if (game.isFirstLoadDone) {
			console.log('Saving game to local storage')
			localStorage.setItem(metadata.room, toJson())
		}
		*/
	}

	const loadFromLocalStorage = () => {
		//TODO: reenable after we've fixed fromJson
		/*
		//TODO: Verify how come this does not work anymore
		console.log('Loading game from local storage')
		return fromJson(localStorage.getItem(metadata.room))
		*/
	}

	function handleError (ex) {
		console.error(ex)
		console.error('Exception in `render`. Clearing localStorage...')
		localStorage.removeItem(metadata.room)
		window.alert('Fatal error. Local storage cleared.')
	}

	/****************************************************
	 * Receiving Data                                   *
	 ****************************************************/
	const receiveData = useCallback((evt) => {
		let data = JSON.parse(evt.data)
		if (data.from === wsSettings.guid) {
			return // ignore messages sent by self
		}
		if (data.to && data.to !== wsSettings.guid) {
			return // ignore messages sent to different recipients
		}

        const getMap = () => {
            if (game.maps.length === 0)
                return undefined
            const currMap = game.maps.filter((map) => map.$id === game.mapId)
            return currMap.length > 0 ? currMap[0] : game.maps[0]
        }

		const currMap = getMap()
		switch (data.type) {
			case 'pushCursor':
				/*
				if (data.u !== this.gameState.settings.username)
					this.gameState.updateCursors(data.x, data.y, data.u, data.from)
				*/
				break
			case 'pushDrawPath':
				const newDrawPath = currMap.drawPaths ? currMap.drawPaths : []
				newDrawPath.push(data.drawPath)
				const updatedMapsWithDraw = game.maps.map((map) => {
					return map.$id === currMap.$id ? { ...currMap, drawPaths: newDrawPath, } : map
				})
				updateMaps(updatedMapsWithDraw)
				break
			case 'pushDrawReset':
				const updatedMapsWithDrawReset = game.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, drawPaths: [], } : map
				})
				updateMaps(updatedMapsWithDrawReset)
				break
			case 'pushFogPath':
				const newFogPath = currMap.fogPaths ? currMap.fogPaths : []
				newFogPath.push(data.fogPath)
				const updatedMapsWithFog = game.maps.map((map) => {
					return map.$id === currMap.$id ? { ...currMap, fogPaths: newFogPath, } : map
				})
				updateMaps(updatedMapsWithFog)
				break
			case 'pushFogReset':
				const updatedMapsWithFogReset = game.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, fogPaths: [], } : map
				})
				updateMaps(updatedMapsWithFogReset)
				break
			case 'pushSingleToken':
				/*
				const local = this.gameState.game.tokens[data.i]
				const token = Object.assign(local, data.a) // Keep and `$` attrs like `$selected`
				this.gameState.updateTokenByIndex(data.i, token, true)
				*/
				break
			case 'pushTokens':
				/*
				const localTokensMap = this.gameState.game.tokens.reduce((out, tok) => {
					out[tok.guid] = tok
					return out
				}, {})
				const tokens = data.tokens.map(tok => Object.assign({}, localTokensMap[tok.guid], tok))
				this.gameState.setState({tokens: tokens})
				*/
				break
			case 'pushMapId':
				loadMap(data.mapId)
				break
			case 'pushMapState':
				updateMaps(data.maps)
				loadMap(data.mapId)
				break
			case 'pushCreateMap':
				addMap(data.mapName, data.width, data.height)
				break
			case 'pushFogEnabled':
				console.log('receiving fog enabled',data)
				setFogEnabled(data.fogEnabled)
				break
			case 'pushGameRefresh': // refresh from host
				overwriteGame(data.game)
				break
			case 'requestRefresh': // refresh request from player
				if (metadata.isHost) {
					pushGameRefresh(webSocket, wsSettings, game, { to: data.from, })
				}
				break
			default:
				console.error(`Unrecognized websocket message type: ${data.type}`)
		}
	},[ game, metadata.isHost, loadMap, overwriteGame, setFogEnabled, updateMaps, addMap, webSocket, wsSettings ])

	/****************************************************
	 * React Hooks                                      *
	 ****************************************************/
	// On Mount
	useEffect(() => {
		window.addEventListener('beforeunload', saveToLocalStorage)
		window.addEventListener('resize', onResize)
		//TODO: reenable keypresses
		//window.addEventListener('keypress', onKeyPress)
		window.addEventListener('keydown', onKeyDown)
		loadFromLocalStorage()
		const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
		setGameSettings(params.get('host'), params.get('room'))

		// On Unmount
		return () => {
			saveToLocalStorage()
			window.removeEventListener('beforeunload', saveToLocalStorage)
			window.removeEventListener('resize', onResize)
			//window.removeEventListener('keypress', onKeyPress)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		document.title = `Borealis D&D, Room: ${metadata.room}`
	}, [ metadata.room ])

	useEffect(() => {
		if (webSocket) {
			webSocket.addEventListener('message', receiveData)
			if (wsSettings.username === '')
				setWsSettings({ ...wsSettings, username: settings.username })
		}

		return () => {
			if (webSocket)
				webSocket.removeEventListener('message', receiveData)
		}
	}, [webSocket, wsSettings, setWsSettings, receiveData, settings.username])
	
	/*
	useEffect(() => {
		if (websocket && gameState.settings.shareMouse)
			websocket.pushCursor(gameState.metadata.lastX, gameState.metadata.lastY)
	}, [gameState.metadata.lastX, gameState.metadata.lastY, gameState.settings.shareMouse])
	*/

	/****************************************************
	 * Component Render                                 *
	 ****************************************************/
	const deadline = new Date() - 30000
	const cursorsCopy = metadata.cursors

	for (let name in cursorsCopy) {
		let time = cursorsCopy[name].time
		if (!time || time < deadline)
			delete cursorsCopy[name]
	}

	try {
		return (
			<GameView 
				isHost={ metadata.isHost } 
				overlayRef={ overlayRef } 
				isFogLoaded={ game.isFogLoaded } 
				cursors={ cursorsCopy } 
				cursorSize={ settings.cursorSize } 
				tokens={ game.tokens } 
				onMouseMove={ onMouseMove } 
				onMouseUp={ onMouseUp } 
				onMouseDown={ onMouseDown } 
				/* TODO: reenable notify={ notify } */
			/>
		)
	} catch (ex) {
		handleError(ex)
	}
}

const mapStateToProps = (state) => {
	return {
		metadata: state.metadata,
		game: state.game,
		settings: state.settings,
	}
}

const mapDispatchToProps = {
	setGameSettings,
	overwriteGame,
	loadMap,
	updateMaps,
	addMap,
	incrementGen,
	setFogEnabled,
	updateTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
