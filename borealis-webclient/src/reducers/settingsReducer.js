import { 
    CHANGE_CURSORSIZE,
    CHANGE_FOG_SETTINGS,
    CHANGE_DRAW_SETTINGS, 
    CHANGE_TOOL,
    CHANGE_USERNAME,
    TOGGLE_MOUSESHARING 
} from '../redux/constants'

const initialSettingsState = {
    cursorSize: 50,
    fogOpacity: 0.5,
    fogRadius: 75,
    drawColor: 'white',
    drawSize: 8,
    tool: 'move',
    subtool: undefined,
    username: 'PC', //TODO: /*params.get('host') ? 'DM' : 'PC'*/
    shareMouse: true,
}

const settingsReducer = (state = initialSettingsState, action) => {
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
//#endregion Action Creators

export default settingsReducer
