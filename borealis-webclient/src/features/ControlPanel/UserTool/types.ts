import Game from '@/classes/Game'
import ControlTool from '@/enums/Tool'
import { ChatState } from '@/reducers/chatReducer'
import { CharacterState } from '@/reducers/characterReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import { MapState } from '@/reducers/mapReducer'
import { TokenState } from '@/reducers/tokenReducer'
import { UserState } from '@/reducers/userReducer'
import Token from '@/classes/Token'
import Message from '@/classes/Message'
import Map from '@/classes/Map'
import Character from '@/classes/Character'
import User from '@/classes/User'

export interface UserToolProps {
    toggleOnUser: boolean,
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    chatState: ChatState,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    setFogEnabled: (fogEnabled: boolean) => void,
    incrementVersion: () => void,
    setUsername: (newUsername: string) => void,
    toggleMousesharing: () => void,
    setToolSettings: (newTool: ControlTool) => void,
    overwriteGame: (newGame: Game) => void,
    updateMaps: (newMaps: Array<Map>) => void,
    updateTokens: (newTokens: Array<Token>) => void,
    overwriteChat: (newMessages: Array<Message>) => void,
    setCharacters: (newCharacters: Array<Character>) => void,
    assignCharacter: (guidToAssign: string) => void,
    setUsersFromAPI: (newUsers: Array<User>) => void,
    resetGameSettings: () => void,
}

export interface UserToolViewProps {
    isHost: boolean,
    initAsDev: () => void,
    fogEnabled: boolean,
    toggleFog: () => void,
    saveGameInServer: () => void,
    loadGameFromServer: () => void,
    userName: string,
    updateUserName: (event: React.ChangeEvent<HTMLInputElement>) => void,
    mouseIsShared: boolean,
    toggleShareMouse: () => void,
    copyUrlToClipboard: () => void,
    logoutUser: () => void,
}
