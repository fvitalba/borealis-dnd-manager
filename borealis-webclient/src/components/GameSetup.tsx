import React, { MouseEvent, ChangeEvent, useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import User from '../classes/User'
import { IWsSettings } from '../contexts/WebSocketProvider'
import UserType from '../enums/UserType'
import { useLoading } from '../hooks/useLoading'
import { useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { assignCharacter, setCharacters } from '../reducers/characterReducer'
import { overwriteChat } from '../reducers/chatReducer'
import { overwriteGame } from '../reducers/gameReducer'
import { updateMaps } from '../reducers/mapReducer'
import { MetadataState, setGameSettings } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import { updateTokens } from '../reducers/tokenReducer'
import { setUsersFromAPI } from '../reducers/userReducer'
import { getRoomFromDatabase } from '../utils/apiHandler'
import loadAllFromDatabase from '../utils/gameLoadHandler'
import guid from '../utils/guid'
import { API_AUTHENTICATING_USER } from '../utils/loadingTasks'
import { authenticateOrRegisterUser } from '../utils/loginHandler'
import GameSetupView from '../views/GameSetupView'

interface GameSetupState {
    roomName: string,
    roomId: string,
    userName: string,
    userGuid: string,
    userType: UserType | undefined,
}

const initialGameSetupState = (): GameSetupState => {
    return {
        roomName: '',
        roomId: '',
        userName: '',
        userGuid: '',
        userType: undefined,
    }
}

interface GameSetupProps {
    metadataState: MetadataState,
    setGameSettings: (userType: UserType, userGuid: string, roomName: string, roomGuid: string) => void,
    setUsername: (username: string) => void,
}

const GameSetup = ({ metadataState, setGameSettings, setUsername }: GameSetupProps) => {
    const [gameSetupState, setGameSetupState] = useState(initialGameSetupState())
    const [roomLookupState, setRoomLookupState] = useState({
        roomFound: false,
        searchingRoom: false,
    })
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

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
            userGuid: gameSetupState.userGuid !== '' ? gameSetupState.userGuid : guid(),
        })
    }

    const onToggleUserButton = (e: MouseEvent<HTMLButtonElement>) => {
        const userType = (e.target as HTMLElement).innerText === 'DM' ? UserType.host : UserType.player
        const defaultUserName = userType === UserType.host ? 'DM' : 'PC'
        if (userType !== gameSetupState.userType) {
            setGameSetupState({
                ...gameSetupState,
                userType: userType,
                userName: gameSetupState.userName !== '' ? gameSetupState.userName : defaultUserName,
                userGuid: gameSetupState.userGuid !== '' ? gameSetupState.userGuid : guid(),
            })
        }
    }

    const onSubmitSetup = async () => {
        if (gameSetupState.userType === undefined)
            return
        const currUser = new User(gameSetupState.userGuid, gameSetupState.userName, gameSetupState.userType)
        loadingContext.startLoadingTask(API_AUTHENTICATING_USER)
        const authenticatedUser = await authenticateOrRegisterUser(webSocketContext.wsSettings, currUser)
        loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
        if (!authenticatedUser)
            throw new Error('User could not be authenticated!')

        setGameSetupState({
            ...gameSetupState,
            userType: authenticatedUser.type,
            userGuid: authenticatedUser.guid,
            userName: authenticatedUser.name,
        })
        setGameSettings(authenticatedUser.type, authenticatedUser.guid, gameSetupState.roomName, gameSetupState.roomId)
        console.log('metadataState',metadataState)
        setUsername(authenticatedUser.name)
        saveSettingsToLocalStorage()

        loadAllFromDatabase(webSocketContext, loadingContext)
            .then((dbState) => {
                if (dbState.gameState)
                    overwriteGame(dbState.gameState)
                if (dbState.mapState)
                    updateMaps(dbState.mapState.maps)
                if (dbState.tokenState)
                    updateTokens(dbState.tokenState.tokens)
                if (dbState.chatState)
                    overwriteChat(dbState.chatState.messages)
                if (dbState.characterState) {
                    setCharacters(dbState.characterState.characters)
                    if (dbState.characterState.currentCharacterGuid !== '')
                        assignCharacter(dbState.characterState.currentCharacterGuid)
                }
                if (dbState.usersState)
                    setUsersFromAPI(dbState.usersState.users)
            })
    }

    const readSettingsFromLocalStorage = (roomName: string) => {
        const lastRoomIdText = (!roomName || (roomName === '')) ? localStorage.getItem('borealis-room') : roomName
        const lastRoomId = lastRoomIdText ? lastRoomIdText : ''

        const roomUserGuidText = localStorage.getItem(`borealis-${lastRoomId}-userGuid`)
        const roomUserGuid = roomUserGuidText ? roomUserGuidText : ''

        const roomUserNameText = localStorage.getItem(`borealis-${lastRoomId}-userName`)
        const roomUserName = roomUserNameText ? roomUserNameText : ''

        const roomRoomNameText = localStorage.getItem(`borealis-${lastRoomId}-roomName`)
        const roomRoomName = roomRoomNameText ? roomRoomNameText : ''

        const userTypeText = localStorage.getItem(`borealis-${lastRoomId}-${roomUserGuid}`)
        const userType: UserType = userTypeText ? parseInt(userTypeText) : UserType.player
        return { lastRoomId, roomRoomName, roomUserGuid, roomUserName, userType }
    }

    const saveSettingsToLocalStorage = () => {
        localStorage.setItem('borealis-room',`${gameSetupState.roomId}`)
        localStorage.setItem(`borealis-${gameSetupState.roomId}-roomName`,`${gameSetupState.roomName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomId}-userGuid`,`${gameSetupState.userGuid}`)
        localStorage.setItem(`borealis-${gameSetupState.roomId}-userName`,`${gameSetupState.userName}`)
        localStorage.setItem(`borealis-${gameSetupState.roomId}-${gameSetupState.userGuid}`,`${gameSetupState.userType}`)
    }

    const updateSettingsFromLocalStorage = (skipRoomUpdate: boolean) => {
        const localSettings = readSettingsFromLocalStorage(gameSetupState.roomName)
        if (skipRoomUpdate)
            localSettings.lastRoomId = metadataState.roomName ? metadataState.roomName : gameSetupState.roomName
        if ((localSettings.lastRoomId !== gameSetupState.roomName) || (localSettings.roomUserGuid !== gameSetupState.userName))
            setGameSetupState({
                ...gameSetupState,
                roomId: localSettings.lastRoomId,
                roomName: localSettings.roomRoomName,
                userGuid: localSettings.roomUserGuid,
                userName: localSettings.roomUserName,
                userType: localSettings.userType,
            })
    }

    const searchRoom = useCallback(() => {
        if ((gameSetupState.roomName !== '') && (!roomLookupState.roomFound)) {
            const tempWsSettings: IWsSettings = {
                socketGuid: '',
                userGuid: gameSetupState.userGuid,
                roomId: gameSetupState.roomId,
                userType: gameSetupState.userType ? gameSetupState.userType : UserType.player,
            }
            if (!roomLookupState.searchingRoom)
                setRoomLookupState({
                    roomFound: false,
                    searchingRoom: true,
                })
            getRoomFromDatabase(tempWsSettings)
                .then((result) => {
                    if (result.length > 0) {
                        if (result[0].roomId !== '')
                            setGameSetupState({
                                ...gameSetupState,
                                roomId: result[0].roomId,
                            })
                        setRoomLookupState({
                            roomFound: true,
                            searchingRoom: false,
                        })
                    } else {
                        setGameSetupState({
                            ...gameSetupState,
                            roomId: guid(),
                        })
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
        if (metadataState.roomGuid !== '') {
            updateSettingsFromLocalStorage(true)
        } else {
            updateSettingsFromLocalStorage(false)
        }
    }, [ metadataState.roomGuid ])

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
