import React from 'react'
import { Background } from '@/components/Background'
import { Drawing } from '@/components/Drawing'
import { Fog } from '@/components/Fog'
import { Overlay } from '@/components/Overlay'
import { Token } from '@/features/Token'
import { ControlPanel } from '@/features/ControlPanel'
import { ToolPanel } from '@/features/ToolPanel'
import { ChatPanel } from '@/features/ChatPanel'
import { Banner } from '@/components/Banner'
import { Cursor } from '@/components/Cursor'
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
                            <Token key={ `Token${index}` } token={ token } userType={ userType } />
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
