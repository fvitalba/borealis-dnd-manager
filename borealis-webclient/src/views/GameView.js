import Background from './Background.js'
import Drawing from './Drawing.js'
import Fog from './Fog.js'
import Overlay from './Overlay.jsx'
import ControlPanel from './ControlPanel.js'

const GameView = ({ game, state, onMouseMove, onMouseUp, onMouseDown, renderTokens, renderCursors, backgroundRef, drawingRef, fogRef, overlayRef, controlPanelRef, handleError }) => {
	const goneClass = state.isFogLoaded ? null : 'gone'
	try {
		return (
		<div id='game' onMouseMove={ onMouseMove } onMouseDown={ onMouseDown } onMouseUp={ onMouseUp }>
			<div className={ goneClass }>
			<Background game={ game } ref={ backgroundRef } className={ goneClass } />
			<Drawing game={ game } ref={ drawingRef } />
			{ renderTokens() }
			<Fog game={ game } ref={ fogRef } />
			{ renderCursors() }
			<Overlay game={ game } ref={ overlayRef } /> {/* Holds outline for fog & draw tools */}
			</div>
			<ControlPanel game={ game } ref={ controlPanelRef } />
		</div>
		)
	} catch (ex) {
		handleError(ex)
	}
}

export default GameView
