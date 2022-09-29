import React from 'react'
import { Background } from '../Background'
import { Drawing } from '../Drawing'
import { Fog } from '../Fog'
import { Overlay } from '../Overlay'
import { Token as TokenComponent } from '../Token'
import { ControlPanel } from '../ControlPanel'
import { ToolPanel } from '../ToolPanel'
import { ChatPanel } from '../ChatPanel'
import { Banner } from '../Banner'
import { Cursor } from '../Cursor'
import { GameViewProps } from './types'

const GameView = ({ userType, overlayRef, cursors, tokens, onMouseMove, onMouseUp, onMouseDown }: GameViewProps) => {
    return (
        <div id='game' onMouseMove={ (e) => onMouseMove(e) } onMouseDown={ (e) => onMouseDown(e) } onMouseUp={ (e) => onMouseUp(e) }>
            <div>
                <Background />
                <Drawing />
                { tokens ?
                    <div className='borealis-token-layer'>
                        { tokens.map((token, index) => (
                            <TokenComponent key={ `Token${index}` } token={ token } userType={ userType } />
                        )) }
                    </div>
                    : null
                }
                <Fog />
                { cursors ?
                    <div className='borealis-cursor-layer'>
                        { cursors.map((cursor) => (
                            <Cursor key={ `cursor${cursor.username}` } cursor={ cursor } />
                        )) }
                    </div>
                    : null
                }
                <Overlay overlayRef={ overlayRef } />
            </div>
            <>
                <ControlPanel />
                <ToolPanel />
            </>
            <ChatPanel />
            <Banner bannerContent={ 'Liking the tool? Want to support me? Buy me a coffee ☕!' } linkToAction={ 'https://www.buymeacoffee.com/fabio.vitalba' } />
        </div>
    )
}

export default GameView
