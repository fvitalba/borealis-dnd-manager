import Background from '../components/Background.js'
import Drawing from '../components/Drawing.js'
import Fog from '../components/Fog.js'
import Overlay from '../components/Overlay.js'
import Token from '../components/Token.js'
import Cursor from './Cursor.js'
import ControlPanel from '../components/ControlPanel.js'

const GameView = ({ gameState, setGameState, controlPanelState, setControlPanelState, websocket, onMouseMove, onMouseUp, onMouseDown, renderTokens, renderCursors, notify, token, initAsDev, loadMap, updateGameToken, selectGameToken, updateMap, resetFog }) => {
	const goneClass = gameState.state.isFogLoaded ? null : 'gone'
	const deadline = new Date() - 30000
	const cursors = Object.assign({}, gameState.state.cursors)
	for (let name in cursors) {
		let time = cursors[name].time
		if (!time || time < deadline)
			delete cursors[name]
	}

	return (
		<div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
			<div className={ goneClass }>
				<Background gameState={ gameState } className={ goneClass } />
				<Drawing gameState={ gameState } />
				{ /* gameState.state.tokens ? 
					<div id='tokens'>
						{ gameState.state.tokens.map((token, $i) => (
							<Token key={ `Token${$i}` } token={ token } game={ gameState } />
						)) }
					</div>
					: null
				*/ }
				<Fog 
					gameState={ gameState } 
					width={ undefined } 
					height={ undefined } 
					updateMap={ updateMap } />
				{ cursors ?
					<div id='cursors'>
						{ Object.keys(cursors).map((key, $i) => (
							<Cursor key={ `cursor${$i}` } name={ key } cursor={ gameState.state.cursors[key] } size={ gameState.state.cursorSize } />
						)) }
					</div>
					: null
				}
				{/* Holds outline for fog & draw tools */}
				<Overlay 
					gameState={ gameState } 
					updateMap={ updateMap } 
					websocket={ websocket } /> 
			</div>
			<ControlPanel 
				gameState={ gameState } 
				setGameState={ setGameState } 
				controlPanelState={ controlPanelState } 
				setControlPanelState={ setControlPanelState }
				websocket={ websocket } 
				notify={ notify } 
				token={ token } 
				initAsDev={ initAsDev } 
				loadMap={ loadMap } 
				updateGameToken={ updateGameToken } 
				selectGameToken={ selectGameToken } 
				resetFog={ resetFog } />
		</div>
	)
}

export default GameView
