import React, { useEffect, useState } from 'react'
import Background from './Background.js'
import Drawing from './Drawing.js'
import Fog from './Fog.js'
import Overlay from './Overlay.jsx'
import ControlPanel from './ControlPanel.js'
import Token from './Token.js'
import Gamesocket from './Gamesocket.jsx'
import GameView from '../views/GameView.js'
import Cursor from '../views/Cursor.js'
import guid from '../controllers/guid.js'

const initialGameState = () => {
	const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))

	return {
		isHost: params.get('host'),
		room: params.get('room'),
		websocket: new Gamesocket(),
		controlPanelRef: React.createRef(),
		backgroundRef: React.createRef(),
		fogRef: React.createRef(),
		drawingRef: React.createRef(),
		overlayRef: React.createRef(),
		tokens: React.createRef(),
		state: {
			maps: {},
			tokens: [],
			cursors: {},
			cursorSize: 50,
			fogOpacity: 0.5,
			fogUrl: undefined, /* data url */
			fogRadius: 33,
			isFogLoaded: false,
			isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
			drawColor: 'purple',
			drawSize: 8,
			tool: 'move',
			username: params.get('host') ? 'DM' : 'PC',
			'toggleOnShare mouse (cursor)': true,
		}
	}
}

const Game = () => {
	const [gameState, setGameState] = useState(initialGameState)
	
	// On Mount
	useEffect(() => {
		window.addEventListener('beforeunload', saveToLocalStorage.bind(this))
		window.addEventListener('resize', onResize.bind(this))
		window.addEventListener('keypress', onKeyPress.bind(this))
		window.addEventListener('keydown', onKeyDown.bind(this))
		loadFromLocalStorage()

		// On Unmount
		return () => {
			saveToLocalStorage();
			window.removeEventListener('beforeunload', saveToLocalStorage.bind(this));
			window.removeEventListener('resize', onResize.bind(this));
			window.removeEventListener('keypress', onKeyPress.bind(this));
			window.removeEventListener('keydown', onKeyDown.bind(this));
		}
	},[])

	const getMap = () => {
		const map = gameState.state.maps[gameState.state.mapId]
		return map || Object.values(gameState.state.maps)[0]
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
		if (!noEmit && gameState.isHost && gameState.websocket)
			gameState.websocket.pushMapId(map.$id)
		const startStateAttrs = { mapId: map.$id, isFogLoaded: false }
		const finishStateAttrs = { isFirstLoadDone: true, isFogLoaded: true }
		//TODO: refactor new state update
		/*
		return savePromise.then(() => {
			return new Promise((resolve, reject) => {
				this.setState(startStateAttrs, () => {
					// Load bg first because that resizes the canvases
					this.bgRef.current.load().then(() => {
					Promise.all([
						this.fogRef.current.load(),
						this.drawRef.current.load(),
					]).then(() => {
						this.setState(finishStateAttrs, () => {
						resolve();
						note && note.close();
						this.notify('map loaded', undefined, 'loadMap');
						});
					}).catch(arg => {
						console.error('fail loads:', arg);
						this.setState(finishStateAttrs);
					});
					}).catch(arg => {
					console.error('fail load bgRef:', arg);
					this.setState(finishStateAttrs);
					});
				});
			});
		}).catch(arg => {
			console.error('fail savePromise:', arg);
			this.setState(finishStateAttrs);
		});
		*/
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
			spawnX: 40, spawnY: 80, $id: 2,
		}
		let kiwiMap = {
			name: 'kiwi', url: '/dev/kiwi.jpeg', $id: 1,
		}
		return new Promise(resolve => {
			setGameState({
				...gameState,
				state: {
					...gameState.state,
					maps: Object.fromEntries([defaultMap, kiwiMap].map(m => [m.$id, m])),
					tokens: tokens,
					mapId: kiwiMap.$id,
				}
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
		tokensCopy.forEach(callback)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			}
		})
		if (!noEmit && gameState.websocket)
			gameState.websocket.pushTokens(tokensCopy)
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
			}
		})
		if (!noEmit && gameState.websocket)
			gameState.websocket.pushToken(tokenIdx, tokenCopy)
	}

	const updateTokenByIndex = (index, attrs, noEmit) => {
		const tokensCopy = JSON.parse(JSON.stringify(gameState.state.tokens))
		const tokenCopy = Object.assign(tokensCopy[index], attrs)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokensCopy,
			}
		})
		if (!noEmit && gameState.websocket)
			gameState.websocket.pushToken(index, tokenCopy)
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
		const downX = gameState.state.downX, downY = gameState.state.downY;
		updateTokens(token => {
			if (token.$selected) {
				token.x = token.$x0 + evt.pageX - downX
				token.y = token.$y0 + evt.pageY - downY
			}
		})
	}

	/****************************************************
	 * Render Functions                                 *
	 ****************************************************/
	const renderCursors = () => {
		const deadline = new Date() - 30000
		const cursors = Object.assign({}, gameState.state.cursors)
		for (let name in cursors) {
			let time = cursors[name].time
			if (!time || time < deadline)
				delete cursors[name]
		}
		return (
			<div id='cursors'>
				{ Object.keys(cursors).map((key, $i) => (
					<Cursor key={ `cursor${$i}` } name={ key } cursor={ gameState.state.cursors[key] } size={ gameState.state.cursorSize } />
				)) }
			</div>
		)
	}

	const renderTokens = () => {
		try {
			return <div id='tokens'>
			{ gameState.state.tokens.map((token, $i) => (
				<Token key={ `Token${$i}` } token={ token } game={ gameState } />
			)) }
			</div>
		} catch (ex) {
			handleError(ex)
		}
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
		
		const moveFactor = evt.shiftKey ? 100 : 10
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
			(location||this).setState({[key]: !(location||this).state[key]});
		}
		*/
		const cp = gameState.cpRef.current;
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
					}
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
					}
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
					}
				})
				break
			default: return
		}
	}

	const onMouseUp = (e) => {
		updateTokens(tok => {
			tok.$x0 = tok.x;
			tok.$y0 = tok.y;
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
		if (gameState.websocket && gameState.state['toggleOnShare mouse (cursor)'])
			gameState.websocket.pushCursor(e.pageX, e.pageY)
	}

	/****************************************************
	 * Helper Functions                                 *
	 ****************************************************/
	const scrubObject = (object) => {
		for (let key in object) if (/^\$/.test(key) && key !== '$id') delete object[key];
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

	/****************************************************
	 * Component Render                                 *
	 ****************************************************/
	return (
		<GameView 
			game={ gameState } 
			state={ gameState.state } 
			onMouseMove={ onMouseMove } 
			onMouseUp={ onMouseUp } 
			onMouseDown={ onMouseDown } 
			renderTokens={ renderTokens } 
			renderCursors={ renderCursors } 
			backgroundRef={ gameState.backgroundRef } 
			drawingRef={ gameState.drawingRef } 
			fogRef={ gameState.fogRef } 
			overlayRef={ gameState.overlayRef } 
			controlPanelRef={ gameState.controlPanelRef } 
			handleError={ handleError } 
		/>
	)
}

export default Game
