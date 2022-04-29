import Character from '../classes/Character'
import Game from '../classes/Game'
import Map from '../classes/Map'
import Message from '../classes/Message'
import Token from '../classes/Token'
import User from '../classes/User'
import { ILoadingContext } from '../contexts/LoadingProvider'
import { IWebSocketContext } from '../contexts/WebSocketProvider'
import { CharacterState } from '../reducers/characterReducer'
import { ChatState } from '../reducers/chatReducer'
import { MapState } from '../reducers/mapReducer'
import { TokenState } from '../reducers/tokenReducer'
import { UserState } from '../reducers/userReducer'
import { getRoomFromDatabase, getUsersFromDatabase, getCharactersFromDatabase, getMapsFromDatabase, getTokensFromDatabase, getChatFromDatabase } from './apiHandler'
import {
    API_LOAD_ROOM,
    API_LOAD_MAPS,
    API_LOAD_TOKENS,
    API_LOAD_CHAT,
    API_LOAD_CHARACTERS,
    API_LOAD_USERS
} from './loadingTasks'

interface DatabaseState {
    gameState: Game | null,
    mapState: MapState | null,
    tokenState: TokenState | null,
    chatState: ChatState | null,
    characterState: CharacterState | null,
    usersState: UserState | null,
}

const loadAllFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<DatabaseState> => {
    return Promise.all([
        loadRoomFromDatabase(webSocketContext, loadingContext),
        loadMapsFromDatabase(webSocketContext, loadingContext),
        loadTokensFromDatabase(webSocketContext, loadingContext),
        loadChatFromDatabase(webSocketContext, loadingContext),
        loadCharactersFromDatabase(webSocketContext, loadingContext),
        loadUsersFromDatabase(webSocketContext, loadingContext),
    ])
        .then(([ roomResult, mapsResult, tokensResult, chatResult, charactersResult, usersResult ]) => {
            return {
                gameState: roomResult,
                mapState: mapsResult,
                tokenState: tokensResult,
                chatState: chatResult,
                characterState: charactersResult,
                usersState: usersResult,
            }})
        .catch(() => {
            return {
                gameState: null,
                mapState: null,
                tokenState: null,
                chatState: null,
                characterState: null,
                usersState: null,
            }})
}

const loadRoomFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<Game | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_ROOM)
        getRoomFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newGame = Game.fromDbSchema(result[0])
                loadingContext.stopLoadingTask(API_LOAD_ROOM)
                resolve(newGame)
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_ROOM)
                reject()
            })
    })
}

const loadMapsFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<MapState | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_MAPS)
        getMapsFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newMaps = result.map((dbMap) => Map.fromDbSchema(dbMap))
                const newMapState = {
                    maps: newMaps,
                }
                loadingContext.stopLoadingTask(API_LOAD_MAPS)
                resolve(newMapState)
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_MAPS)
                reject()
            })
    })
}

const loadTokensFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<TokenState | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_TOKENS)
        getTokensFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newTokens = result.map((dbToken) => Token.fromDbSchema(dbToken))
                const newTokenState = {
                    tokens: newTokens,
                }
                loadingContext.stopLoadingTask(API_LOAD_TOKENS)
                resolve(newTokenState)

            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_TOKENS)
                reject()
            })
    })
}

const loadChatFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<ChatState | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_CHAT)
        getChatFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newChatMessages = result.map((dbChatMessage) => Message.fromDbSchema(dbChatMessage))
                const newChatState = {
                    username: '',
                    messages: newChatMessages,
                }
                loadingContext.stopLoadingTask(API_LOAD_CHAT)
                resolve(newChatState)
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_CHAT)
                reject()
            })
    })
}

const loadCharactersFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<CharacterState | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_CHARACTERS)
        getCharactersFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newCharacters = result.map((dbCharacter) => Character.fromDbSchema(dbCharacter))
                const newCharacterState = {
                    currentCharacterGuid: '',
                    characters: newCharacters,
                }
                loadingContext.stopLoadingTask(API_LOAD_CHARACTERS)
                resolve(newCharacterState)
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_CHARACTERS)
                reject()
            })
    })
}

export const loadUsersFromDatabase = async (webSocketContext: IWebSocketContext, loadingContext: ILoadingContext): Promise<UserState | null> => {
    return new Promise((resolve, reject) => {
        // loads the game from database
        loadingContext.startLoadingTask(API_LOAD_USERS)
        getUsersFromDatabase(webSocketContext.wsSettings)
            .then((result) => {
                const newUsers = result.map((dbUser) => User.fromDbSchema(dbUser))
                const newUserState = {
                    users: newUsers,
                }
                loadingContext.stopLoadingTask(API_LOAD_USERS)
                resolve(newUserState)
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_LOAD_USERS)
                reject()
            })
    })
}

export default loadAllFromDatabase
