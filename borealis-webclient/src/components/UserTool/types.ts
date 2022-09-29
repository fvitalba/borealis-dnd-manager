import Game from '../../classes/Game'
import ControlTool from '../../enums/Tool'
import { ChatState } from '../../reducers/chatReducer'
import { CharacterState } from '../../reducers/characterReducer'
import { MetadataState } from '../../reducers/metadataReducer'
import { SettingsState } from '../../reducers/settingsReducer'
import { MapState } from '../../reducers/mapReducer'
import { TokenState } from '../../reducers/tokenReducer'
import { UserState } from '../../reducers/userReducer'
import Token from '../../classes/Token'
import Message from '../../classes/Message'
import Map from '../../classes/Map'
import Character from '../../classes/Character'
import User from '../../classes/User'

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
    setFogEnabled: (arg0: boolean) => void,
    incrementVersion: () => void,
    setUsername: (arg0: string) => void,
    toggleMousesharing: () => void,
    setToolSettings: (arg0: ControlTool) => void,
    overwriteGame: (arg0: Game) => void,
    updateMaps: (arg0: Array<Map>) => void,
    updateTokens: (arg0: Array<Token>) => void,
    overwriteChat: (arg0: Array<Message>) => void,
    setCharacters: (arg0: Array<Character>) => void,
    assignCharacter: (arg0: string) => void,
    setUsersFromAPI: (arg0: Array<User>) => void,
}

export interface UserToolViewProps {
    isHost: boolean,
    initAsDev: () => void,
    fogEnabled: boolean,
    toggleFog: () => void,
    saveGameInServer: () => void,
    loadGameFromServer: () => void,
    userName: string,
    updateUserName: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
    mouseIsShared: boolean,
    toggleShareMouse: () => void,
    copyUrlToClipboard: () => void,
    logoutUser: () => void,
}
