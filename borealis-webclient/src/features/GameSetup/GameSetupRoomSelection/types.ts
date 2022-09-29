import { ChangeEvent } from 'react'
import Game from '@/classes/Game'
import Map from '@/classes/Map'
import Token from '@/classes/Token'
import Message from '@/classes/Message'
import Character from '@/classes/Character'
import User from '@/classes/User'
import UserType from '@/enums/UserType'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'

export interface Room {
    id: string,
    name: string,
    userRole: UserType,
}

export interface GameSetupRoomSelectionState {
    newRoomName: string,
    selectedRoomName: string,
    roomId: string,
    userType: UserType | undefined,
    availableRooms: Array<Room>,
}

export interface GameSetupRoomSelectionProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
    setGameSettings: (userType: UserType, userGuid: string, isGuest: boolean, roomName: string, roomGuid: string) => void,
    overwriteGame: (game: Game) => void,
    updateMaps: (maps: Array<Map>) => void,
    updateTokens: (tokens: Array<Token>) => void,
    overwriteChat: (messages: Array<Message>) => void,
    setCharacters: (characters: Array<Character>) => void,
    assignCharacter: (characterGuid: string) => void,
    setUsersFromAPI: (users: Array<User>) => void,
}

export interface GameSetupRoomSelectionViewProps {
    userName: string,
    newRoomName: string,
    onNewRoomNameChange: (newRoomName: ChangeEvent<HTMLInputElement>) => void,
    selectedRoomName: string,
    onRoomSelect: (roomIndex: number) => void,
    searchingRoom: boolean,
    roomFound: boolean,
    availableRooms: Array<Room>,
    onSubmitNewRoom: () => void,
    onSubmitSelectRoom: () => void,
    isSubmitNewEnabled: boolean,
    isSubmitSelectionEnabled: boolean,
}
