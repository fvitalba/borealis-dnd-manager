import { 
    SET_GAMESETTINGS,
    /* SET_ISHOST,
    SET_ROOM,*/
    SET_CURSORS,
    SET_LAST_COORDINATES,
    SET_DOWN_COORDINATES 
} from '../redux/constants'

const initialMetadataState = {
    isHost: undefined,
    room: undefined,
    cursors: [],
    lastX: undefined,
    lastY: undefined,
    downX: undefined,
    downY: undefined,
}

const metadataReducer = (state = initialMetadataState, action) => {
    switch (action.type) {
        case SET_GAMESETTINGS:
            return {
                ...state,
                isHost: action.isHost,
                room: action.room,
            }
        //TODO: Delete if unused
        /*
        case SET_ISHOST:
            return {
                ...state,
                isHost: action.isHost,
            }
        case SET_ROOM:
            return {
                ...state,
                room: action.room,
            }
        */
       case SET_CURSORS:
           return {
               ...state,
               cursors: action.cursors,
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

export const setGameSettings = (newIsHost, newRoom) => {
    return {
        type: SET_GAMESETTINGS,
        isHost: newIsHost,
        room: newRoom,
    }
}

//TODO: Delete if unused
/*
export const setIsHost = (newIsHost) => {
    return {
        type: SET_ISHOST,
        isHost: newIsHost,
    }
}

export const setRoom = (newRoom) => {
    return {
        type: SET_ROOM,
        room: newRoom,
    }
}
*/

export const setCursors = (newCursors) => {
    return {
        type: SET_CURSORS,
        cursors: newCursors,
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

export default metadataReducer
