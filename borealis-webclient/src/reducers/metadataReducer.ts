import {
    SET_GAMESETTINGS,
    SET_CURSORS,
    UPDATE_CURSOR,
    SET_LAST_COORDINATES,
    SET_DOWN_COORDINATES
} from '../redux/constants'
import UserType from '../enums/UserType'
import Cursor from '../classes/Cursor'
import Point from '../classes/Point'

export interface MetadataState {
    userType: UserType,
    userGuid: string,
    roomName: string,
    roomGuid: string,
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
    cursor?: Cursor,
    cursors?: Array<Cursor>,
    lastPos?: Point,
    downPos?: Point,
}

const metadataReducer = (state = initialMetadataState(), action: MetadataAction): MetadataState => {
    let newCursors: Array<Cursor> = JSON.parse(JSON.stringify(state.cursors))
    switch (action.type) {
    case SET_GAMESETTINGS:
        if ((action.userType !== undefined) && (action.roomName) && (action.roomGuid))
            return {
                ...state,
                userType: action.userType,
                userGuid: action.userGuid ? action.userGuid : state.userGuid,
                roomName: action.roomName,
                roomGuid: action.roomGuid ? action.roomGuid : state.roomGuid,
            }
        else
            return state
    case SET_CURSORS:
        return {
            ...state,
            cursors: action.cursors ? action.cursors : state.cursors,
        }
    case UPDATE_CURSOR:
        if (action.cursor) {
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
            lastPos: action.lastPos ? action.lastPos : state.lastPos,
        }
    case SET_DOWN_COORDINATES:
        return {
            ...state,
            downPos: action.downPos ? action.downPos : state.downPos
        }
    default:
        return state
    }
}

//#region Action Creators
export const setGameSettings = (newUserType: UserType, newUserGuid: string, newRoomName: string, newRoomGuid: string): MetadataAction => {
    return {
        type: SET_GAMESETTINGS,
        userType: newUserType,
        userGuid: newUserGuid,
        roomName: newRoomName,
        roomGuid: newRoomGuid,
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
//#endregion Action Creators

export default metadataReducer
