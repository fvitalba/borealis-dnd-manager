import Background from '../components/Background.js'
import Drawing from '../components/Drawing.js'
import Fog from '../components/Fog.js'
import Overlay from '../components/Overlay.js'
import Token from '../components/Token.js'
import Cursor from './Cursor.js'
import ControlPanel from '../components/ControlPanel.js'

const GameView = ({ gameState, setGameState, controlPanelState, setControlPanelState, websocket, onMouseMove, onMouseUp, onMouseDown, fromJson, notify, initAsDev, loadMap, updateTokens, updateGameToken, selectGameToken, updateMap, resetFog }) => {
	const goneClass = gameState.state.isFogLoaded ? null : 'gone'
	const deadline = new Date() - 30000
	const cursors = Object.assign({}, gameState.state.cursors)
	const tokens = gameState.state.tokens.map(t => t)
	const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined

	for (let name in cursors) {
		let time = cursors[name].time
		if (!time || time < deadline)
			delete cursors[name]
	}

	return (
		<div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
			<div className={ goneClass }>
				<Background
					gameState={ gameState } 
					setGameState={ setGameState } 
					controlPanelState={ controlPanelState } 
					setControlPanelState={ setControlPanelState } 
					updateTokens={ updateTokens } 
					className={ goneClass } />
				<Drawing gameState={ gameState } canvasRef={ gameState.drawingRef } />
				{ tokens ? 
					<div id='tokens'>
						{ tokens.map((token, $i) => (
							<Token key={ `Token${$i}` } token={ token } gameState={ gameState } selectGameToken={ selectGameToken } />
						)) }
					</div>
					: null
				}
				<Fog gameState={ gameState } canvasRef={ gameState.fogRef } />
				{ cursors ?
					<div id='cursors'>
						{ Object.keys(cursors).map((key, $i) => (
							<Cursor key={ `cursor${$i}` } name={ key } cursor={ gameState.state.cursors[key] } size={ gameState.state.cursorSize } />
						)) }
					</div>
					: null
				}
				{/* Overlay: Holds outline for fog & draw tools */ }
				<Overlay gameState={ gameState } /> 
			</div>
			<ControlPanel 
				gameState={ gameState } 
				setGameState={ setGameState } 
				controlPanelState={ controlPanelState } 
				setControlPanelState={ setControlPanelState }
				websocket={ websocket } 
				notify={ notify } 
				fromJson={ fromJson } 
				initAsDev={ initAsDev } 
				loadMap={ loadMap } 
				updateGameToken={ updateGameToken } 
				selectGameToken={ selectGameToken } 
				resetFog={ resetFog } />
		</div>
	)
}

export default GameView
