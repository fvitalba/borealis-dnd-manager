import React from 'react'
import GameSetupLogin from '../../components/GameSetupLogin'
import GameSetupRoomSelection from '../../components/GameSetupRoomSelection'

interface GameSetupViewProps {
    showLogin: boolean,
    showRoomSelection: boolean,
}

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
