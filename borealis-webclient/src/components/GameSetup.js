import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setGameSettings } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import { overwriteGame } from '../reducers/gameReducer'
import { useLoading } from '../hooks/useLoading'
import { loadRoomFromDatabase } from '../controllers/apiHandler'
import GameSetupView from '../views/GameSetupView'

const initialGameSetupState = () => {
    return {
        roomName: '',
        userName: '',
        isHost: undefined,
    }
}

const GameSetup = ({ setGameSettings, setUsername, overwriteGame }) => {
    const [gameSetupState, setGameSetupState] = useState(initialGameSetupState)
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

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
        if (gameSetupState.isHost) {
            setIsLoading(true)
            const tempWsSettings = {
                guid: '',
                username: gameSetupState.userName,
                room: gameSetupState.roomName,
            }
            loadRoomFromDatabase(tempWsSettings)
                .then((result) => {
                    const loadedGame = {
                        ...result.data.game,
                        gen: result.data.game.gen + 1,
                    }
                    overwriteGame(loadedGame)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error(error)
                })
        }
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
    overwriteGame,
}

export default connect(undefined, mapDispatchToProps)(GameSetup)
