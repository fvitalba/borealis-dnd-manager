import Background from '../components/Background'
import Drawing from '../components/Drawing'
import Fog from '../components/Fog'
import Overlay from '../components/Overlay'
import Token from '../components/Token'
import LoadingOverlay from '../components/LoadingOverlay'
import ControlPanel from '../components/ControlPanel'
import ChatPanel from '../components/ChatPanel'
import Cursor from './Cursor'

const GameView = ({ isHost, overlayRef, cursors, cursorSize, tokens, onMouseMove, onMouseUp, onMouseDown }) => {
    return (
        <div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
            <div>
                <Background />
                <Drawing />
                { tokens ?
                    <div className='tokens-container'>
                        { tokens.map((token, index) => (
                            <Token key={ `Token${index}` } token={ token } isHost={ isHost } />
                        )) }
                    </div>
                    : null
                }
                <Fog />
                { cursors ?
                    <div id='cursors'>
                        { cursors.map((cursor) => (
                            <Cursor key={ `cursor${cursor.id}` } name={ cursor.username } cursor={ cursor } size={ cursorSize } />
                        )) }
                    </div>
                    : null
                }
                {/* Overlay: Holds outline for fog & draw tools */ }
                <Overlay overlayRef={ overlayRef } />
            </div>
            <ControlPanel />
            <ChatPanel />
            <LoadingOverlay />
        </div>
    )
}

export default GameView
