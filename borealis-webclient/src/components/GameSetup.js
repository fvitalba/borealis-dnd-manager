import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setGameSettings } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import { overwriteGame } from '../reducers/gameReducer'
import { setCharacters } from '../reducers/characterReducer'
import { useLoading } from '../hooks/useLoading'
import { getRoomFromDatabase, getCharactersFromDatabase } from '../controllers/apiHandler'
import GameSetupView from '../views/GameSetupView'
import { useWebSocket } from '../hooks/useSocket'

const initialGameSetupState = () => {
    return {
        roomName: '',
        userName: '',
        isHost: undefined,
    }
}

const GameSetup = ({ setGameSettings, setUsername, overwriteGame, setCharacters }) => {
    const [gameSetupState, setGameSetupState] = useState(initialGameSetupState)
    const [roomLookupState, setRoomLookupState] = useState({
        roomFound: false,
        searchingRoom: false,
    })
    // eslint-disable-next-line no-unused-vars
    const [_webSocket, wsSettings, setWsSettings] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

    const onRoomNameChange = (e) => {
        const newRoomName = e.target.value
        setGameSetupState({
            ...gameSetupState,
            roomName: newRoomName,
        })
        setRoomLookupState({
            roomFound: false,
            searchingRoom: true,
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
        setWsSettings({
            ...wsSettings,
            username: gameSetupState.userName,
        })
        saveSettingsToLocalStorage()
        if (gameSetupState.isHost) {
            setIsLoading(true)
            const tempWsSettings = {
                guid: '',
                username: gameSetupState.userName,
                room: gameSetupState.roomName,
            }
            getRoomFromDatabase(tempWsSettings)
                .then((result) => {
                    if (result.data) {
                        const loadedGame = {
                            ...result.data.game,
                            gen: result.data.game.gen + 1,
                        }
                        overwriteGame(loadedGame)
                    }
                    getCharactersFromDatabase(tempWsSettings)
                        .then((result) => {
                            setCharacters(result)
                            setIsLoading(false)
                        })
                        .catch((error) => {
                            setIsLoading(false)
                            console.error(error)
                        })
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error(error)
                })
        }
    }

    const readSettingsFromLocalStorage = (roomName) => {
        const lastRoomNameText = (!roomName || (roomName === '')) ? localStorage.getItem('borealis-room') : roomName
        const lastRoomName = lastRoomNameText ? lastRoomNameText : ''

        const roomUsernameText = localStorage.getItem(`borealis-${lastRoomName}-username`)
        const roomUsername = roomUsernameText ? roomUsernameText : ''

        const isHostText = localStorage.getItem(`borealis-${lastRoomName}-${roomUsername}`)
        const isHost = isHostText ? (isHostText === 'true') : undefined
        return [lastRoomName, roomUsername, isHost]
    }

    const saveSettingsToLocalStorage = () => {
        localStorage.setItem('borealis-room',`${gameSetupState.roomName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomName}-username`,`${gameSetupState.userName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomName}-${gameSetupState.userName}`,`${gameSetupState.isHost}`)
    }

    const updateSettingsFromLocalStorage = (skipRoomUpdate) => {
        let [lastRoomName, roomUsername, isHost] = readSettingsFromLocalStorage(gameSetupState.roomName)
        if (skipRoomUpdate)
            lastRoomName = gameSetupState.roomName
        if ((lastRoomName !== gameSetupState.roomName) || (roomUsername !== gameSetupState.userName))
            setGameSetupState({
                ...gameSetupState,
                roomName: lastRoomName,
                userName: roomUsername,
                isHost: isHost,
            })
    }

    const searchRoom = useCallback(() => {
        if ((gameSetupState.roomName !== '') && (!roomLookupState.roomFound)) {
            const tempWsSettings = {
                guid: '',
                username: gameSetupState.userName,
                room: gameSetupState.roomName,
            }
            if (!roomLookupState.searchingRoom)
                setRoomLookupState({
                    roomFound: false,
                    searchingRoom: true,
                })
            getRoomFromDatabase(tempWsSettings)
                .then((result) => {
                    if (result.data) {
                        setRoomLookupState({
                            roomFound: true,
                            searchingRoom: false,
                        })
                    } else {
                        setRoomLookupState({
                            roomFound: false,
                            searchingRoom: false,
                        })
                    }
                })
                .catch(() => {
                    setRoomLookupState({
                        roomFound: false,
                        searchingRoom: false,
                    })
                })
        }
    }, [ gameSetupState, roomLookupState, setRoomLookupState ])

    useEffect(() => {
        const interval = setInterval(() => searchRoom(), 3000)
        return () => {
            clearInterval(interval)
        }
    }, [ searchRoom ])

    useEffect(() => {
        updateSettingsFromLocalStorage(false)
    }, [])

    const isHost = (gameSetupState.isHost === true)
    const isPlayer = (gameSetupState.isHost === false)
    const isSubmitEnabled = ((gameSetupState.isHost !== undefined) && (gameSetupState.roomName !== ''))

    return (
        <GameSetupView
            roomName={ gameSetupState.roomName }
            onRoomNameChange={ onRoomNameChange }
            searchingRoom={ roomLookupState.searchingRoom }
            roomFound={ roomLookupState.roomFound }
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
    setCharacters,
}

export default connect(undefined, mapDispatchToProps)(GameSetup)
