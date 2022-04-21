import React, { Ref, MouseEvent } from 'react'
import Background from '../components/Background'
import Drawing from '../components/Drawing'
import Fog from '../components/Fog'
import Overlay from '../components/Overlay'
import TokenComponent from '../components/Token'
import LoadingOverlay from '../components/LoadingOverlay'
import ControlPanel from '../components/ControlPanel'
import ChatPanel from '../components/ChatPanel'
import Banner from '../components/Banner'
import CursorComponent from './Cursor'
import Cursor from '../classes/Cursor'
import Token from '../classes/Token'
import UserType from '../enums/UserType'

interface GameViewProps {
    userType: UserType,
    overlayRef: Ref<HTMLCanvasElement>,
    cursors: Array<Cursor>,
    tokens: Array<Token>,
    onMouseMove: (arg0: MouseEvent) => void,
    onMouseUp: (arg0: MouseEvent) => void,
    onMouseDown: (arg0: MouseEvent) => void,
}

const GameView = ({ userType, overlayRef, cursors, tokens, onMouseMove, onMouseUp, onMouseDown }: GameViewProps) => {
    return (
        <div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
            <div>
                <Background />
                <Drawing />
                { tokens ?
                    <div className='tokens-container'>
                        { tokens.map((token, index) => (
                            <TokenComponent key={ `Token${index}` } token={ token } userType={ userType } />
                        )) }
                    </div>
                    : null
                }
                <Fog />
                { cursors ?
                    <div className='cursors'>
                        { cursors.map((cursor) => (
                            <CursorComponent key={ `cursor${cursor.username}` } cursor={ cursor } />
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
