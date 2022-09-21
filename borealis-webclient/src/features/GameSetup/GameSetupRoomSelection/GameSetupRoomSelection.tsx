import React, { ChangeEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import UserType from '../../../enums/UserType'
import { useLoading } from '../../../hooks/useLoading'
import { useWebSocket } from '../../../hooks/useSocket'
import StateInterface from '../../../interfaces/StateInterface'
import { overwriteGame } from '../../../reducers/gameReducer'
import { updateMaps } from '../../../reducers/mapReducer'
import { updateTokens } from '../../../reducers/tokenReducer'
import { overwriteChat } from '../../../reducers/chatReducer'
import { setCharacters, assignCharacter } from '../../../reducers/characterReducer'
import { setUsersFromAPI } from '../../../reducers/userReducer'
import { setGameSettings } from '../../../reducers/metadataReducer'
import { getUserRoomsFromDatabase } from '../../../utils/apiHandler'
import loadAllFromDatabase from '../../../utils/gameLoadHandler'
import guid from '../../../utils/guid'
import GameSetupRoomSelectionView from './GameSetupRoomSelectionView'
import { Room, GameSetupRoomSelectionState, GameSetupRoomSelectionProps } from './types'

const initialGameSetupRoomSelectionState = (): GameSetupRoomSelectionState => {
    return {
        newRoomName: '',
        selectedRoomName: '',
        roomId: '',
        userType: undefined,
        availableRooms: [],
    }
}

const GameSetupRoomSelection = ({ metadataState, settingsState, setGameSettings, overwriteGame, updateMaps, updateTokens, overwriteChat, setCharacters, assignCharacter, setUsersFromAPI }: GameSetupRoomSelectionProps) => {
    const [gameSetupRoomSelectionState, setGameSetupRoomSelectionState] = useState(initialGameSetupRoomSelectionState())
    const [roomLookupState, setRoomLookupState] = useState({
        roomFound: false,
        searchingRoom: false,
    })
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    const onNewRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newRoomName = e.target.value
        setGameSetupRoomSelectionState({
            ...gameSetupRoomSelectionState,
            newRoomName: newRoomName,
            roomId: '',
            selectedRoomName: '',
            userType: undefined,
        })
        setRoomLookupState({
            roomFound: false,
            searchingRoom: true,
        })
    }

    const onRoomSelect = (roomIndex: number) => {
        const selectedRoom = gameSetupRoomSelectionState.availableRooms.filter((room, index) => index === roomIndex)[0]
        const selectedRoomId = selectedRoom.id
        const userType: UserType = selectedRoom.userRole
        setGameSetupRoomSelectionState({
            ...gameSetupRoomSelectionState,
            selectedRoomName: selectedRoom.name,
            roomId: selectedRoomId,
            userType: userType,
            newRoomName: '',
        })
    }

    const onSubmitNewRoom = async () => {
        const newRoomId = guid()
        setGameSetupRoomSelectionState({
            ...gameSetupRoomSelectionState,
            roomId: newRoomId,
            userType: UserType.host,
        })
        webSocketContext.setWsSettings({
            ...webSocketContext.wsSettings,
            roomId: newRoomId,
            userType: UserType.host,
        })
        setGameSettings(UserType.host, metadataState.userGuid, metadataState.isGuest, gameSetupRoomSelectionState.newRoomName, newRoomId)
    }

    const onSubmitSelectedRoom = async () => {
        if ((gameSetupRoomSelectionState.roomId === '') || (gameSetupRoomSelectionState.userType === undefined))
            throw new Error('No room was selected. Cannot load game.')
        else {
            webSocketContext.setWsSettings({
                ...webSocketContext.wsSettings,
                roomId: gameSetupRoomSelectionState.roomId,
                userType: gameSetupRoomSelectionState.userType,
            })
            setGameSettings(gameSetupRoomSelectionState.userType, metadataState.userGuid, metadataState.isGuest, gameSetupRoomSelectionState.selectedRoomName, gameSetupRoomSelectionState.roomId)
            const webSocketContextCopy = {
                ...webSocketContext,
                wsSettings: {
                    ...webSocketContext.wsSettings,
                    roomId: gameSetupRoomSelectionState.roomId,
                    userType: gameSetupRoomSelectionState.userType,
                }
            }
            loadAllFromDatabase(webSocketContextCopy, loadingContext)
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
                        if (dbState.characterState.currentCharacterGuid !== '') {
                            assignCharacter(dbState.characterState.currentCharacterGuid)
                        } else {
                            const firstAssignedCharacter = dbState.characterState.characters.filter((character) => character.username === settingsState.username)[0]
                            if ((firstAssignedCharacter !== undefined) && (firstAssignedCharacter.guid !== ''))
                                assignCharacter(firstAssignedCharacter.guid)
                        }
                    }
                    if (dbState.usersState)
                        setUsersFromAPI(dbState.usersState.users)
                })
        }
    }

    useEffect(() => {
        getUserRoomsFromDatabase(metadataState.userGuid)
            .then((rooms) => {
                const newRooms: Array<Room> = rooms.map((room) => {
                    return {
                        id: room.roomId,
                        name: room.roomName,
                        userRole: room.userRole,
                    }
                })
                setGameSetupRoomSelectionState({
                    ...gameSetupRoomSelectionState,
                    availableRooms: newRooms,
                })
            })
    },[ metadataState.userGuid ])

    const isSubmitNewEnabled = (gameSetupRoomSelectionState.newRoomName !== '')
    const isSubmitSelectionEnabled = ((gameSetupRoomSelectionState.roomId !== '') && (gameSetupRoomSelectionState.selectedRoomName !== ''))

    return (
        <GameSetupRoomSelectionView
            userName={ settingsState.username }
            newRoomName={ gameSetupRoomSelectionState.newRoomName }
            onNewRoomNameChange={ onNewRoomNameChange }
            selectedRoomName={ gameSetupRoomSelectionState.selectedRoomName }
            onRoomSelect={ onRoomSelect }
            searchingRoom={ roomLookupState.searchingRoom }
            roomFound={ roomLookupState.roomFound }
            availableRooms={ gameSetupRoomSelectionState.availableRooms }
            onSubmitNewRoom={ onSubmitNewRoom }
            onSubmitSelectRoom={ onSubmitSelectedRoom }
            isSubmitNewEnabled={ isSubmitNewEnabled }
            isSubmitSelectionEnabled={ isSubmitSelectionEnabled }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    setGameSettings,
    overwriteGame,
    updateMaps,
    updateTokens,
    overwriteChat,
    setCharacters,
    assignCharacter,
    setUsersFromAPI,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupRoomSelection)
