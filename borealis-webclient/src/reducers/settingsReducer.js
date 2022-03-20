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

const initialSettingsState = () => {
    const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
    return {
        cursorSize: 50,
        fogOpacity: 0.5,
        fogRadius: 75,
        drawColor: '#fafafa',
        drawSize: 8,
        tool: 'move',
        subtool: undefined,
        username: params.get('host') ? 'DM' : 'PC',
        shareMouse: false,
        deltaX: 0,
        deltaY: 0,
        scale: 1.0,
    }
}

const settingsReducer = (state = initialSettingsState(), action) => {
    switch (action.type) {
    case CHANGE_CURSORSIZE:
        return {
            ...state,
            cursorSize: action.cursorSize,
        }
    case CHANGE_FOG_SETTINGS:
        return {
            ...state,
            fogOpacity: action.fogOpacity,
            fogRadius: action.fogRadius,
        }
    case CHANGE_DRAW_SETTINGS:
        return {
            ...state,
            drawColor: action.drawColor,
            drawSize: action.drawSize,
        }
    case CHANGE_TOOL:
        return {
            ...state,
            tool: action.tool,
            subtool: action.subtool,
        }
    case CHANGE_USERNAME:
        return {
            ...state,
            username: action.username,
        }
    case TOGGLE_MOUSESHARING:
        return {
            ...state,
            shareMouse: !state.shareMouse,
        }
    case UPDATE_DELTAXY:
        return {
            ...state,
            deltaX: action.deltaX,
            deltaY: action.deltaY,
        }
    case UPDATE_SCALE:
        return {
            ...state,
            scale: action.scale,
        }
    default:
        return state
    }
}

//#region Action Creators
export const setCursorSize = (newCursorSize) => {
    return {
        type: CHANGE_CURSORSIZE,
        cursorSize: parseInt(newCursorSize),
    }
}

export const setFogToolSettings = (newFogOpacity, newFogRadius) => {
    return {
        type: CHANGE_FOG_SETTINGS,
        fogOpacity: newFogOpacity,
        fogRadius: parseInt(newFogRadius),
    }
}

export const setDrawToolSettings = (newDrawColor, newDrawSize) => {
    return {
        type: CHANGE_DRAW_SETTINGS,
        drawColor: newDrawColor,
        drawSize: parseInt(newDrawSize),
    }
}

export const setToolSettings = (newTool, newSubtool) => {
    return {
        type: CHANGE_TOOL,
        tool: newTool,
        subtool: newSubtool,
    }
}

export const setUsername = (newUsername) => {
    return {
        type: CHANGE_USERNAME,
        username: newUsername,
    }
}

export const toggleMousesharing = () => {
    return {
        type: TOGGLE_MOUSESHARING,
    }
}

export const updateDeltaXY = (newDeltaX, newDeltaY) => {
    return {
        type: UPDATE_DELTAXY,
        deltaX: newDeltaX,
        deltaY: newDeltaY,
    }
}

export const updateScale = (newScale) => {
    return {
        type: UPDATE_SCALE,
        scale: newScale,
    }
}
//#endregion Action Creators

export default settingsReducer
