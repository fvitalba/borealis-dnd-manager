import Background from '../components/Background.js'
import Drawing from '../components/Drawing.js'
import Fog from '../components/Fog.js'
import Overlay from '../components/Overlay.js'
import Token from '../components/Token.js'
import Cursor from './Cursor.js'
import ControlPanel from '../components/ControlPanel.js'

const GameView = ({ isHost, overlayRef, isFogLoaded, cursors, cursorSize, tokens, onMouseMove, onMouseUp, onMouseDown }) => {
	const goneClass = isFogLoaded ? null : 'gone'

	return (
		<div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
			<div className={ goneClass }>
				<Background />
				<Drawing />
				{ tokens ? 
					<div id='tokens'>
						{ tokens.map((token, $i) => (
							<Token key={ `Token${$i}` } token={ token } isHost={ isHost } />
						)) }
					</div>
					: null
				}
				<Fog />
				{ cursors ?
					<div id='cursors'>
						{ cursors.map((cursor) => (
							<Cursor key={ `cursor${cursor.$id}` } name={ cursor.username } cursor={ cursor } size={ cursorSize } />
						)) }
					</div>
					: null
				}
				{/* Overlay: Holds outline for fog & draw tools */ }
				<Overlay overlayRef={ overlayRef } /> 
			</div>
			<ControlPanel />
		</div>
	)
}

export default GameView
