import {
    CHANGE_CURSORSIZE,
    CHANGE_FOG_SETTINGS,
    CHANGE_DRAW_SETTINGS,
    CHANGE_TOOL,
    CHANGE_USERNAME,
    TOGGLE_MOUSESHARING,
    UPDATE_DELTAXY,
    UPDATE_SCALE
} from '../redux/constants'
import ControlTool from '../enums/Tool'

interface SettingsState {
    cursorSize: number,
    fogOpacity: number,
    fogRadius: number,
    drawColor: string,
    drawSize: number,
    tool: ControlTool,
    username: string,
    shareMouse: boolean,
    deltaX: number,
    deltaY: number,
    scale: number,
}

const initialSettingsState = (): SettingsState => {
    return {
        cursorSize: 50,
        fogOpacity: 0.5,
        fogRadius: 75,
        drawColor: '#fafafa',
        drawSize: 8,
        tool: ControlTool.Move,
        username: '',
        shareMouse: false,
        deltaX: 0,
        deltaY: 0,
        scale: 1.0,
    }
}

interface SettingsAction {
    type: string,
    cursorSize?: number,
    fogOpacity?: number,
    fogRadius?: number,
    drawColor?: string,
    drawSize?: number,
    tool?: ControlTool,
    username?: string,
    shareMouse?: boolean,
    deltaX?: number,
    deltaY?: number,
    scale?: number,
}

const settingsReducer = (state = initialSettingsState(), action: SettingsAction): SettingsState => {
    switch (action.type) {
    case CHANGE_CURSORSIZE:
        return {
            ...state,
            cursorSize: action.cursorSize ? action.cursorSize : state.cursorSize,
        }
    case CHANGE_FOG_SETTINGS:
        return {
            ...state,
            fogOpacity: action.fogOpacity ? action.fogOpacity : state.fogOpacity,
            fogRadius: action.fogRadius ? action.fogRadius : state.fogRadius,
        }
    case CHANGE_DRAW_SETTINGS:
        return {
            ...state,
            drawColor: action.drawColor ? action.drawColor : state.drawColor,
            drawSize: action.drawSize ? action.drawSize : state.drawSize,
        }
    case CHANGE_TOOL:
        return {
            ...state,
            tool: action.tool ? action.tool : state.tool,
        }
    case CHANGE_USERNAME:
        return {
            ...state,
            username: action.username ? action.username : state.username,
        }
    case TOGGLE_MOUSESHARING:
        return {
            ...state,
            shareMouse: !state.shareMouse,
        }
    case UPDATE_DELTAXY:
        return {
            ...state,
            deltaX: action.deltaX ? action.deltaX : state.deltaX,
            deltaY: action.deltaY ? action.deltaY : state.deltaY,
        }
    case UPDATE_SCALE:
        return {
            ...state,
            scale: action.scale ? action.scale : state.scale,
        }
    default:
        return state
    }
}

//#region Action Creators
export const setCursorSize = (newCursorSize: number): SettingsAction => {
    return {
        type: CHANGE_CURSORSIZE,
        cursorSize: newCursorSize,
    }
}

export const setFogToolSettings = (newFogOpacity: number, newFogRadius: number): SettingsAction => {
    return {
        type: CHANGE_FOG_SETTINGS,
        fogOpacity: newFogOpacity,
        fogRadius: newFogRadius,
    }
}

export const setDrawToolSettings = (newDrawColor: string, newDrawSize: number): SettingsAction => {
    return {
        type: CHANGE_DRAW_SETTINGS,
        drawColor: newDrawColor,
        drawSize: newDrawSize,
    }
}

export const setToolSettings = (newTool: ControlTool): SettingsAction => {
    return {
        type: CHANGE_TOOL,
        tool: newTool,
    }
}

export const setUsername = (newUsername: string): SettingsAction => {
    return {
        type: CHANGE_USERNAME,
        username: newUsername,
    }
}

export const toggleMousesharing = (): SettingsAction=> {
    return {
        type: TOGGLE_MOUSESHARING,
    }
}

export const updateDeltaXY = (newDeltaX: number, newDeltaY: number): SettingsAction => {
    return {
        type: UPDATE_DELTAXY,
        deltaX: newDeltaX,
        deltaY: newDeltaY,
    }
}

export const updateScale = (newScale: number): SettingsAction => {
    return {
        type: UPDATE_SCALE,
        scale: newScale,
    }
}
//#endregion Action Creators

export default settingsReducer
