import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MetadataState, setGameSettings } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import { getRoomFromDatabase } from '../utils/apiHandler'
import GameSetupView from '../views/GameSetupView'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { IWsSettings } from '../contexts/WebSocketProvider'

interface GameSetupState {
    roomName: string,
    userName: string,
    userType: UserType | undefined,
}

const initialGameSetupState = (): GameSetupState => {
    return {
        roomName: '',
        userName: '',
        userType: undefined,
    }
}

interface GameSetupProps {
    metadataState: MetadataState,
    setGameSettings: (arg0: UserType, arg1: string, arg2: string) => void,
    setUsername: (arg0: string) => void,
}

const GameSetup = ({ metadataState, setGameSettings, setUsername }: GameSetupProps) => {
    const [gameSetupState, setGameSetupState] = useState(initialGameSetupState())
    const [roomLookupState, setRoomLookupState] = useState({
        roomFound: false,
        searchingRoom: false,
    })

    const onRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUserName = e.target.value
        setGameSetupState({
            ...gameSetupState,
            userName: newUserName,
        })
    }

    const onToggleUserButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const userType = e.target.innerText === 'DM' ? UserType.host : UserType.player
        const defaultUserName = userType === UserType.host ? 'DM' : 'PC'
        if (userType !== gameSetupState.userType) {
            setGameSetupState({
                ...gameSetupState,
                userType: userType,
                userName: gameSetupState.userName !== '' ? gameSetupState.userName : defaultUserName,
            })
        }
    }

    const onSubmitSetup = () => {
        // TODO: Handle loading from database
        // check gameLoadHandler.ts
    }

    const readSettingsFromLocalStorage = (roomName: string) => {
        const lastRoomNameText = (!roomName || (roomName === '')) ? localStorage.getItem('borealis-room') : roomName
        const lastRoomName = lastRoomNameText ? lastRoomNameText : ''

        const roomUsernameText = localStorage.getItem(`borealis-${lastRoomName}-username`)
        const roomUsername = roomUsernameText ? roomUsernameText : ''

        const userTypeText = localStorage.getItem(`borealis-${lastRoomName}-${roomUsername}`)
        const userType = userTypeText === 'host' ? UserType.host : UserType.player
        return { lastRoomName, roomUsername, userType }
    }

    const saveSettingsToLocalStorage = () => {
        localStorage.setItem('borealis-room',`${gameSetupState.roomName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomName}-username`,`${gameSetupState.userName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomName}-${gameSetupState.userName}`,`${gameSetupState.userType}`)
    }

    const updateSettingsFromLocalStorage = (skipRoomUpdate: boolean) => {
        const localSettings = readSettingsFromLocalStorage(gameSetupState.roomName)
        if (skipRoomUpdate)
            localSettings.lastRoomName = metadataState.room ? metadataState.room : gameSetupState.roomName
        if ((localSettings.lastRoomName !== gameSetupState.roomName) || (localSettings.roomUsername !== gameSetupState.userName))
            setGameSetupState({
                ...gameSetupState,
                roomName: localSettings.lastRoomName,
                userName: localSettings.roomUsername,
                userType: localSettings.userType,
            })
    }

    const searchRoom = useCallback(() => {
        if ((gameSetupState.roomName !== '') && (!roomLookupState.roomFound)) {
            const tempWsSettings: IWsSettings = {
                guid: '',
                username: gameSetupState.userName,
                room: gameSetupState.roomName,
                isHost: gameSetupState.userType === UserType.host
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
        if (metadataState.room !== '') {
            updateSettingsFromLocalStorage(true)
        } else {
            updateSettingsFromLocalStorage(false)
        }
    }, [ metadataState.room ])

    const isHost = (gameSetupState.userType === UserType.host)
    const isPlayer = (gameSetupState.userType === UserType.player)
    const isSubmitEnabled = ((gameSetupState.userType !== undefined) && (gameSetupState.roomName !== ''))

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

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    setGameSettings,
    setUsername,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup)
