import axios from 'axios'
import Character from '../classes/Character'
import Game from '../classes/Game'
import Map from '../classes/Map'
import Message from '../classes/Message'
import Token from '../classes/Token'
import User from '../classes/User'
import { IWsSettings } from '../contexts/WebSocketProvider'
import { CharacterSchema, ChatMessageSchema, GameSchema, MapSchema, TokenSchema, UserSchema } from './mongoDbSchemas'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const CHARACTER_API_URL = 'characters'
const ROOM_API_URL = 'rooms'
const USER_API_URL = 'users'
const MAP_API_URL = 'maps'
const TOKEN_API_URL = 'tokens'
const CHAT_API_URL = 'chats'
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const getUrlSchema = (selectedApi: string) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/api/${selectedApi}/`
        : `${protocol}://${host}/api/${selectedApi}/`
}

const charactersUrl = (roomId: string): string => {
    return getUrlSchema(CHARACTER_API_URL) + `?roomId=${roomId}`
}

const roomsUrl = (roomId: string): string => {
    return getUrlSchema(ROOM_API_URL) + `${roomId}`
}

const usersUrl = (roomId: string): string => {
    return getUrlSchema(USER_API_URL) + `?roomId=${roomId}`
}

const mapsUrl = (roomId: string): string => {
    return getUrlSchema(MAP_API_URL) + `?roomId=${roomId}`
}

const tokensUrl = (roomId: string): string => {
    return getUrlSchema(TOKEN_API_URL) + `?roomId=${roomId}`
}

const chatsUrl = (roomId: string): string => {
    return getUrlSchema(CHAT_API_URL) + `?roomId=${roomId}`
}

interface APIRequestParams {
    fromSocketGuid: string,
    fromUserGuid: string,
    roomId: string,
    payload: string,
}

export const saveRoomToDatabase = (wsSettings: IWsSettings, payload: Game) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(roomsUrl(''), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getRoomFromDatabase = (wsSettings: IWsSettings): Promise<Array<GameSchema>> => {
    return new Promise((resolve, reject) => {
        axios.get(roomsUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveUsersToDatabase = (wsSettings: IWsSettings, payload: Array<User>) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(usersUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUsersFromDatabase = (wsSettings: IWsSettings): Promise<Array<UserSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(usersUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveCharacterToDatabase = (wsSettings: IWsSettings, payload: Array<Character>) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(charactersUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getCharactersFromDatabase = (wsSettings: IWsSettings): Promise<Array<CharacterSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(charactersUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveMapsToDatabase = (wsSettings: IWsSettings, payload: Array<Map>) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(mapsUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getMapsFromDatabase = (wsSettings: IWsSettings): Promise<Array<MapSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(mapsUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveTokensToDatabase = (wsSettings: IWsSettings, payload: Array<Token>) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(tokensUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getTokensFromDatabase = (wsSettings: IWsSettings): Promise<Array<TokenSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(tokensUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveChatToDatabase = (wsSettings: IWsSettings, payload: Array<Message>) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: JSON.stringify(payload),
        }

        axios.post(chatsUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getChatFromDatabase = (wsSettings: IWsSettings): Promise<Array<ChatMessageSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(chatsUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
