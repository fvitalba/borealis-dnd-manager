import {
    SET_GAMESETTINGS,
    SET_CURSORS,
    UPDATE_CURSOR,
    SET_LAST_COORDINATES,
    SET_DOWN_COORDINATES
} from '../redux/constants'

const initialMetadataState = {
    isHost: undefined,
    room: undefined,
    userGuid: '',
    cursors: [],
    lastX: undefined,
    lastY: undefined,
    downX: undefined,
    downY: undefined,
}

const metadataReducer = (state = initialMetadataState, action) => {
    let newCursors = []
    let newCursor = {
        username: '',
        x: 0,
        y: 0,
    }
    switch (action.type) {
    case SET_GAMESETTINGS:
        return {
            ...state,
            isHost: action.isHost,
            room: action.room,
            userGuid: action.guid ? action.guid : state.userGuid,
        }
    case SET_CURSORS:
        return {
            ...state,
            cursors: action.cursors,
        }
    case UPDATE_CURSOR:
        if ((action.username === '') || !action.newX || !action.newY)
            return state
        newCursor = {
            username: action.username,
            x: action.newX,
            y: action.newY,
        }
        newCursors = state.cursors.filter((crs) => (crs.username !== newCursor.username))
        return {
            ...state,
            cursors: newCursors.concat(newCursor),
        }
    case SET_LAST_COORDINATES:
        return {
            ...state,
            lastX: action.lastX,
            lastY: action.lastY,
        }
    case SET_DOWN_COORDINATES:
        return {
            ...state,
            downX: action.downX,
            downY: action.downY,
        }
    default:
        return state
    }
}

//#region Action Creators
export const setGameSettings = (newIsHost, newRoom, newGuid) => {
    return {
        type: SET_GAMESETTINGS,
        isHost: newIsHost,
        room: newRoom,
        guid: newGuid,
    }
}

export const setCursors = (newCursors) => {
    return {
        type: SET_CURSORS,
        cursors: newCursors,
    }
}

export const updateCursor = (username, newX, newY) => {
    return {
        type: UPDATE_CURSOR,
        username: username,
        newX: newX,
        newY: newY,
    }
}

export const setLastCoordinates = (newLastX, newLastY) => {
    return {
        type: SET_LAST_COORDINATES,
        lastX: newLastX,
        lastY: newLastY,
    }
}

export const setDownCoordinates = (newDownX, newDownY) => {
    return {
        type: SET_DOWN_COORDINATES,
        downX: newDownX,
        downY: newDownY,
    }
}
//#endregion Action Creators

export default metadataReducer
