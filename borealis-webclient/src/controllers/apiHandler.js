import axios from 'axios'

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const ROOM_API_URL = 'rooms'
const USER_API_URL = 'room-users'
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const usersUrl = (roomName) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/api/${USER_API_URL}/${roomName}`
        : `${protocol}://${host}/api/${USER_API_URL}/${roomName}`
}

const roomUrl = (roomName) => {
    const host = window.location.host.replace(/:\d+$/, '')
    const protocol = /https/.test(window.location.protocol) ? 'https' : 'http'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/api/${ROOM_API_URL}/${roomName}`
        : `${protocol}://${host}/api/${ROOM_API_URL}/${roomName}`
}

export const saveRoomToDatabase = (wsSettings, payload) => {
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

export const loadRoomFromDatabase = (wsSettings) => {
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

export const getUsersFromDatabase = (wsSettings) => {
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
