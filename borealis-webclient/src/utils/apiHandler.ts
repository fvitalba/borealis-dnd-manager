import axios from 'axios'
import { IWsSettings } from '../contexts/WebSocketProvider'

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
    payload: any,
}

export const saveRoomToDatabase = (wsSettings: IWsSettings, payload: any) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: payload,
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

export const getRoomFromDatabase = (wsSettings: IWsSettings) => {
    return new Promise((resolve, reject) => {
        axios.get(roomsUrl(wsSettings.roomId))
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getUsersFromDatabase = (wsSettings: IWsSettings) => {
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

export const saveCharacterToDatabase = (wsSettings: IWsSettings, payload: any) => {
    return new Promise((resolve, reject) => {
        const params: APIRequestParams = {
            fromSocketGuid: wsSettings.socketGuid,
            fromUserGuid: wsSettings.userGuid,
            roomId: wsSettings.roomId,
            payload: payload,
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

export const getCharactersFromDatabase = (wsSettings: IWsSettings) => {
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
