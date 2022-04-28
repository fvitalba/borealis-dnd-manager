import React from 'react'
import { connect } from 'react-redux'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import GameSetupView from '../views/GameSetup/GameSetupView'

interface GameSetupProps {
    metadataState: MetadataState,
}

const GameSetup = ({ metadataState }: GameSetupProps) => {
    //TODO: read most recent settings from memory
    /*
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
    */

    return (
        <GameSetupView
            showLogin={ (metadataState.sessionGuid === '') && (metadataState.userGuid === '') }
            showRoomSelection={ (metadataState.sessionGuid !== '') && (metadataState.roomGuid === '') }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup)
