import {
    SET_GAMESETTINGS,
    SET_SESSION_TOKEN,
    SET_CURSORS,
    UPDATE_CURSOR,
    SET_LAST_COORDINATES,
    SET_DOWN_COORDINATES,
    RESET_GAMESETTINGS
} from '../redux/constants'
import UserType from '../enums/UserType'
import Cursor from '../classes/Cursor'
import Point from '../classes/Point'

export interface MetadataState {
    userType: UserType,
    userGuid: string,
    roomName: string,
    roomGuid: string,
    isGuest: boolean,
    sessionGuid: string,
    cursors: Array<Cursor>,
    lastPos: Point,
    downPos: Point,
}

export const initialMetadataState = (): MetadataState => {
    return {
        userType: UserType.player,
        userGuid: '',
        roomName: '',
        roomGuid: '',
        isGuest: true,
        sessionGuid: '',
        cursors: [],
        lastPos: new Point(-1, -1),
        downPos: new Point(-1, -1),
    }
}

interface MetadataAction {
    type: string,
    userType?: UserType,
    userGuid?: string,
    roomName?: string,
    roomGuid?: string,
    isGuest?: boolean,
    sessionGuid?: string,
    cursor?: Cursor,
    cursors?: Array<Cursor>,
    lastPos?: Point,
    downPos?: Point,
}

const metadataReducer = (state = initialMetadataState(), action: MetadataAction): MetadataState => {
    let newCursors: Array<Cursor> = state.cursors.map((cursor) => cursor.copy())
    switch (action.type) {
    case SET_GAMESETTINGS:
        if ((action.roomGuid !== undefined) || (action.userGuid !== undefined))
            return {
                ...state,
                userType: action.userType !== undefined ? action.userType : state.userType,
                userGuid: action.userGuid !== undefined ? action.userGuid : state.userGuid,
                roomName: action.roomName !== undefined ? action.roomName : state.roomName,
                roomGuid: action.roomGuid !== undefined ? action.roomGuid : state.roomGuid,
                isGuest: action.isGuest !== undefined ? action.isGuest : state.isGuest,
            }
        else
            return state
    case SET_SESSION_TOKEN:
        return {
            ...state,
            sessionGuid: action.sessionGuid !== undefined ? action.sessionGuid : state.sessionGuid,
        }
    case SET_CURSORS:
        return {
            ...state,
            cursors: action.cursors !== undefined ? action.cursors : state.cursors,
        }
    case UPDATE_CURSOR:
        if (action.cursor !== undefined) {
            newCursors = state.cursors.filter((crs) => (crs.username !== action.cursor?.username))
            return {
                ...state,
                cursors: newCursors.concat(action.cursor),
            }
        } else
            return state
    case SET_LAST_COORDINATES:
        return {
            ...state,
            lastPos: action.lastPos !== undefined ? action.lastPos : state.lastPos,
        }
    case SET_DOWN_COORDINATES:
        return {
            ...state,
            downPos: action.downPos !== undefined ? action.downPos : state.downPos
        }
    case RESET_GAMESETTINGS:
        return initialMetadataState()
    default:
        return state
    }
}

//#region Action Creators
export const setGameSettings = (newUserType: UserType | undefined, newUserGuid: string, newIsGuest: boolean, newRoomName: string, newRoomGuid: string): MetadataAction => {
    return {
        type: SET_GAMESETTINGS,
        userType: newUserType,
        userGuid: newUserGuid,
        roomName: newRoomName,
        roomGuid: newRoomGuid,
        isGuest: newIsGuest,
    }
}

export const setSessionToken = (newSessionGuid: string): MetadataAction => {
    return {
        type: SET_SESSION_TOKEN,
        sessionGuid: newSessionGuid,
    }
}

export const setCursors = (newCursors: Array<Cursor>): MetadataAction => {
    return {
        type: SET_CURSORS,
        cursors: newCursors,
    }
}

export const updateCursor = (newUsername: string, newX: number, newY: number): MetadataAction => {
    const newCursor = new Cursor(newUsername, newX, newY)
    return {
        type: UPDATE_CURSOR,
        cursor: newCursor,
    }
}

export const setLastCoordinates = (newLastX: number, newLastY: number): MetadataAction => {
    const newLastPos = new Point(newLastX, newLastY)
    return {
        type: SET_LAST_COORDINATES,
        lastPos: newLastPos,
    }
}

export const setDownCoordinates = (newDownX: number, newDownY: number): MetadataAction => {
    const newDownPos = new Point(newDownX, newDownY)
    return {
        type: SET_DOWN_COORDINATES,
        downPos: newDownPos,
    }
}

export const resetGameSettings = (): MetadataAction => {
    return {
        type: RESET_GAMESETTINGS,
    }
}
//#endregion Action Creators

export default metadataReducer
