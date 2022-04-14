import axios from 'axios'
import { IWsSettings } from '../contexts/WebSocketProvider'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const ROOM_API_URL = 'rooms'
const USER_API_URL = 'room-users'
const CHARACTER_API_URL = 'room-characters'
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const getUrlSchema = (selectedApi: string) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/api/${selectedApi}/`
        : `${protocol}://${host}/api/${selectedApi}/`
}

const usersUrl = (roomName: string): string => {
    return getUrlSchema(USER_API_URL) + `?roomName=${roomName}`
}

const roomUrl = (roomName: string): string => {
    return getUrlSchema(ROOM_API_URL) + `${roomName}`
}

const charactersUrl = (roomName: string): string => {
    return getUrlSchema(CHARACTER_API_URL) + `?roomName=${roomName}`
}

export const saveRoomToDatabase = (wsSettings: IWsSettings, payload: any) => {
    return new Promise((resolve, reject) => {
        const params = {
            from: wsSettings.guid,
            username: wsSettings.username,
            room: wsSettings.room,
            payload: payload,
        }

        axios.post(roomUrl(''), params)
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
        axios.get(roomUrl(wsSettings.room))
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
        axios.get(usersUrl(wsSettings.room))
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
        const params = {
            from: wsSettings.guid,
            username: wsSettings.username,
            room: wsSettings.room,
            payload: payload,
        }

        axios.post(charactersUrl(wsSettings.room), params)
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
        axios.get(charactersUrl(wsSettings.room))
            .then((result) => {
                resolve(result.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
