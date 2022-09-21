import React from 'react'
import { GameSetupLogin } from './GameSetupLogin'
import { GameSetupRoomSelection } from './GameSetupRoomSelection'
import { GameSetupViewProps } from './types'

const GameSetupView = ({ showLogin, showRoomSelection }: GameSetupViewProps) => {
    return (
        <div className='game-setup-container'>
            { showLogin
                ? <GameSetupLogin />
                : null
            }
            { showRoomSelection
                ? <GameSetupRoomSelection />
                : null
            }
        </div>
    )
}

export default GameSetupView
