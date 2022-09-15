import axios from 'axios'
import Character from '../classes/Character'
import Game from '../classes/Game'
import Map from '../classes/Map'
import Message from '../classes/Message'
import Token from '../classes/Token'
import User from '../classes/User'
import { IWsSettings } from '../contexts/WebSocketProvider'
import { CharacterSchema, ChatMessageSchema, GameSchema, MapSchema, RoomSchema, RoomUserSchema, TokenSchema, UserSchema } from './mongoDbSchemas'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const CHARACTER_API_URL = 'characters'
const ROOM_API_URL = 'rooms'
const USER_API_URL = 'users'
const ROOM_USER_API_URL = 'roomUsers'
const MAP_API_URL = 'maps'
const TOKEN_API_URL = 'tokens'
const CHAT_API_URL = 'chats'
const API_VERSION = 'v1.0'
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

interface APIRequestParams {
    fromSocketGuid: string,
    fromUserGuid: string,
    roomId: string,
    roomName?: string,
    hostUserGuid?: string,
    payload: string,
}

export interface RegisterParameters {
    userGuid: string,
    userName: string,
    secret: string,
    email: string,
    isGuest: boolean,
}

const getUrlSchema = (selectedApi: string) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/api/${API_VERSION}/${selectedApi}/`
        : `${protocol}://${host}/api/${API_VERSION}/${selectedApi}/`
}

const charactersUrl = (roomId: string): string => {
    return getUrlSchema(CHARACTER_API_URL) + `?roomId=${roomId}`
}

const roomsUrl = (roomId: string, hostUserGuid: string): string => {
    const urlArray = [getUrlSchema(ROOM_API_URL)]
    if (roomId !== '')
        urlArray.push(`roomId=${roomId}`)
    if (hostUserGuid !== '')
        urlArray.push(`hostUserGuid=${hostUserGuid}`)
    return combineUrlArrayToUrl(urlArray)
}

const usersUrl = (): string => {
    return getUrlSchema(USER_API_URL)
}

const roomUsersUrl = (roomId: string): string => {
    return getUrlSchema(ROOM_USER_API_URL) + `?roomId=${roomId}`
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

const combineUrlArrayToUrl = (urlArray: Array<string>): string => {
    const formattedUrlArray = urlArray.map((urlPart, index) => {
        switch(true) {
        case index === 0:
            return urlPart
        case index === 1:
            return `?${urlPart}`
        case index > 1:
            return `&${urlPart}`
        default:
            return ''
        }
    })
    return formattedUrlArray.join('')
}

export const saveRoomToDatabase = (wsSettings: IWsSettings, roomName: string, payload: Game) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            roomName: roomName,
            hostUserGuid: wsSettings.userGuid,
            payload: JSON.stringify(payload),
        }

        axios.post(roomsUrl('', ''), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUserRoomsFromDatabase = (hostUserGuid: string): Promise<Array<RoomSchema>> => {
    return new Promise((resolve, reject) => {
        axios.get(roomsUrl('',hostUserGuid))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getRoomFromDatabase = (wsSettings: IWsSettings): Promise<GameSchema> => {
    return new Promise((resolve, reject) => {
        axios.get(roomsUrl(wsSettings.roomId, ''))
            .then((result) => {
                resolve(result.data[0])
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

        axios.post(roomUsersUrl(wsSettings.roomId), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUsersFromDatabase = (wsSettings: IWsSettings): Promise<Array<RoomUserSchema>> => {
    return new Promise ((resolve, reject) => {
        axios.get(roomUsersUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const addUserToDatabase = (wsSettings: IWsSettings, newUser: User): Promise<Array<RoomUserSchema>> => {
    return new Promise ((resolve, reject) => {
        const params = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            newUser: JSON.stringify(newUser),
        }

        axios.post(usersUrl(), params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const setAllRoomUsersInactive =  (wsSettings: IWsSettings): Promise<Array<RoomUserSchema>> => {
    return new Promise ((resolve, reject) => {
        const params = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            active: false,
        }

        axios.post(roomUsersUrl(wsSettings.roomId) + 'status/', params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUserDetailsFromDatabase = (wsSettings: IWsSettings, userGuid?: string, userName?: string, email?: string, secret?: string, isGuest?: boolean): Promise<UserSchema> => {
    return new Promise((resolve, reject) => {
        const params = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            userGuid: userGuid,
            userName: userName,
            email: email,
            secret: secret,
            isGuest: isGuest,
        }

        axios.post(usersUrl() + 'authenticate/', params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const checkOrStartSession = (wsSettings: IWsSettings, userGuid: string, currentSessionId?: string, secret?: string, isGuest?: boolean): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
        const params = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            userGuid: userGuid,
            sessionToken: currentSessionId,
            secret: secret,
            isGuest: isGuest,
        }

        axios.post(usersUrl() + 'session/', params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const registerUserToDatabase = (wsSettings: IWsSettings, user: RegisterParameters): Promise<UserSchema> => {
    return new Promise((resolve, reject) => {
        const params = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            newUser: JSON.stringify(user),
        }

        axios.post(usersUrl() + 'register/', params)
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const saveCharactersToDatabase = (wsSettings: IWsSettings, payload: Array<Character>) => {
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
                resolve(result.data[0].messages)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
