import Game from '../classes/Game'
import { ILoadingContext } from '../contexts/LoadingProvider'
import { IWebSocketContext } from '../contexts/WebSocketProvider'
import { CharacterState } from '../reducers/characterReducer'
import { ChatState } from '../reducers/chatReducer'
import { MapState } from '../reducers/mapReducer'
import { TokenState } from '../reducers/tokenReducer'
import { UserState } from '../reducers/userReducer'
import { saveRoomToDatabase, saveMapsToDatabase, saveTokensToDatabase, saveChatToDatabase, saveCharactersToDatabase, saveUsersToDatabase } from './apiHandler'
import {
    API_SAVE_ROOM,
    API_SAVE_MAPS,
    API_SAVE_TOKENS,
    API_SAVE_CHAT,
    API_SAVE_CHARACTERS,
    API_SAVE_USERS
} from './loadingTasks'

interface DatabaseState {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    chatState: ChatState,
    characterState: CharacterState,
    userState: UserState,
}

interface DatabaseSaveResult {
    roomSaved: boolean,
    mapsSaved: boolean,
    tokensSaved: boolean,
    chatSaved: boolean,
    charactersSaved: boolean,
    usersSaved: boolean,
}

const saveAllToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, dbState: DatabaseState): Promise<DatabaseSaveResult> => {
    return Promise.all([
        saveRoomStateToDatabase(webSocketContext, loadingContext, dbState.gameState),
        saveMapStateToDatabase(webSocketContext, loadingContext, dbState.mapState),
        saveTokenStateToDatabase(webSocketContext, loadingContext, dbState.tokenState),
        saveChatStateToDatabase(webSocketContext, loadingContext, dbState.chatState),
        saveCharacterStateToDatabase(webSocketContext, loadingContext, dbState.characterState),
        saveUserStateToDatabase(webSocketContext, loadingContext, dbState.userState),
    ])
        .then(([ roomResult, mapsResult, tokensResult, chatResult, charactersResult, usersResult ]) => {
            console.log(roomResult, mapsResult, tokensResult, chatResult, charactersResult, usersResult)
            return {
                roomSaved: roomResult,
                mapsSaved: mapsResult,
                tokensSaved: tokensResult,
                chatSaved: chatResult,
                charactersSaved: charactersResult,
                usersSaved: usersResult,
            }})
        .catch(() => {
            return {
                roomSaved: false,
                mapsSaved: false,
                tokensSaved: false,
                chatSaved: false,
                charactersSaved: false,
                usersSaved: false,
            }})
}

const saveRoomStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, gameState: Game): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_ROOM)
        saveRoomToDatabase(webSocketContext.wsSettings, gameState)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_ROOM)
                resolve(true)
            })
            .catch(() => reject())
    })
}

const saveMapStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, mapState: MapState): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_MAPS)
        saveMapsToDatabase(webSocketContext.wsSettings, mapState.maps)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_MAPS)
                resolve(true)
            })
            .catch(() => reject())
    })
}

const saveTokenStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, tokenState: TokenState): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_TOKENS)
        saveTokensToDatabase(webSocketContext.wsSettings, tokenState.tokens)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_TOKENS)
                resolve(true)
            })
            .catch(() => reject())
    })
}

const saveChatStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, chatState: ChatState): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_CHAT)
        saveChatToDatabase(webSocketContext.wsSettings, chatState.messages)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_CHAT)
                resolve(true)
            })
            .catch(() => reject())
    })
}

const saveCharacterStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, characterState: CharacterState): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_CHARACTERS)
        saveCharactersToDatabase(webSocketContext.wsSettings, characterState.characters)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_CHARACTERS)
                resolve(true)
            })
            .catch(() => reject())
    })
}

export const saveUserStateToDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext, userState: UserState): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        loadingContext.startLoadingTask(API_SAVE_USERS)
        saveUsersToDatabase(webSocketContext.wsSettings, userState.users)
            .then((result) => {
                console.log(result)
                loadingContext.stopLoadingTask(API_SAVE_USERS)
                resolve(true)
            })
            .catch((error) => reject(error))
    })
}

export default saveAllToDatabase
