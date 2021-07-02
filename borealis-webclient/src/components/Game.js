import React, { useState } from 'react'
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
			username: this.isHost ? 'DM' : 'PC',
			'toggleOnShare mouse (cursor)': true,
		}
	}
}

const Game = () => {
	const [gameState, setGameState] = useState(initialGameState)
	
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
		return savePromise.then(() => {
			return new Promise((resolve, reject) => {
				this.setState(startStateAttrs, () => {
					/* Load bg first because that resizes the canvases */
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
