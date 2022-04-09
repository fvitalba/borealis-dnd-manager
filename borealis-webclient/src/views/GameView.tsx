import Background from '../components/Background'
import Drawing from '../components/Drawing'
import Fog from '../components/Fog'
import Overlay from '../components/Overlay'
import Token from '../components/Token'
import LoadingOverlay from '../components/LoadingOverlay'
import ControlPanel from '../components/ControlPanel'
import ChatPanel from '../components/ChatPanel'
import Cursor from './Cursor'
import Banner from '../components/Banner'

const GameView = ({ isHost, overlayRef, cursors, tokens, onMouseMove, onMouseUp, onMouseDown }) => {
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
                    <div className='cursors'>
                        { cursors.map((cursor) => (
                            <Cursor key={ `cursor${cursor.username}` } cursor={ cursor } />
                        )) }
                    </div>
                    : null
                }
                <Overlay overlayRef={ overlayRef } />
            </div>
            <ControlPanel />
            <ChatPanel />
            <Banner bannerContent={'Liking the tool? Want to support me? Buy me a coffee ☕!'} linkToAction={ 'https://www.buymeacoffee.com/fabio.vitalba' } />
            <LoadingOverlay />
        </div>
    )
}

export default GameView
