import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setGameSettings } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import GameSetupView from '../views/GameSetupView'

const initialGameSetupState = () => {
    return {
        roomName: '',
        userName: '',
        isHost: undefined,
    }
}

const GameSetup = ({ setGameSettings, setUsername }) => {
    const [gameSetupState, setGameSetupState] = useState(initialGameSetupState)

    const onRoomNameChange = (e) => {
        const newRoomName = e.target.value
        setGameSetupState({
            ...gameSetupState,
            roomName: newRoomName,
        })
    }

    const onUserNameChange = (e) => {
        const newUserName = e.target.value
        setGameSetupState({
            ...gameSetupState,
            userName: newUserName,
        })
    }

    const onToggleUserButton = (e) => {
        const isHost = e.target.innerText === 'DM'
        const defaultUserName = isHost ? 'DM' : 'PC'
        if (isHost !== gameSetupState.isHost) {
            setGameSetupState({
                ...gameSetupState,
                isHost: isHost,
                userName: gameSetupState.userName !== '' ? gameSetupState.userName : defaultUserName,
            })
        }
    }

    const onSubmitSetup = () => {
        setGameSettings(gameSetupState.isHost, gameSetupState.roomName)
        setUsername(gameSetupState.userName)
    }

    const isHost = (gameSetupState.isHost === true)
    const isPlayer = (gameSetupState.isHost === false)
    const isSubmitEnabled = ((gameSetupState.isHost !== undefined) && (gameSetupState.roomName !== ''))

    return (
        <GameSetupView
            roomName={ gameSetupState.roomName }
            onRoomNameChange={ onRoomNameChange }
            userName={ gameSetupState.userName }
            onUserNameChange={ onUserNameChange }
            onToggleUserButton={ onToggleUserButton }
            onSubmitSetup={ onSubmitSetup }
            isHost={ isHost }
            isPlayer={ isPlayer }
            isSubmitEnabled={ isSubmitEnabled }
        />
    )
}

const mapDispatchToProps = {
    setGameSettings,
    setUsername,
}

export default connect(undefined, mapDispatchToProps)(GameSetup)
