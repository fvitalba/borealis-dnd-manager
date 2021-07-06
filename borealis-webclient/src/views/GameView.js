import Background from '../components/Background.js'
import Drawing from '../components/Drawing.js'
import Fog from '../components/Fog.js'
import Overlay from '../components/Overlay.js'
import ControlPanel from '../components/ControlPanel.js'

const GameView = ({ gameState, setGameState, controlPanelState, setControlPanelState, websocket, onMouseMove, onMouseUp, onMouseDown, renderTokens, renderCursors, notify, token, initAsDev, loadMap, updateGameToken, selectGameToken, updateMap, resetFog }) => {
	const goneClass = gameState.state.isFogLoaded ? null : 'gone'
	return (
		<div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
			<div className={ goneClass }>
				<Background gameState={ gameState } className={ goneClass } />
				<Drawing gameState={ gameState } />
				{ renderTokens() }
				<Fog 
					gameState={ gameState } 
					width={ undefined } 
					height={ undefined } 
					updateMap={ updateMap } />
				{ renderCursors() }
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
