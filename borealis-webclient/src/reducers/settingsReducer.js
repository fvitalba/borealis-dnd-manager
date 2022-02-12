import { CHANGE_CURSORSIZE } from '../redux/constants'

const initialSettingsState = {
    cursorSize: 50,
    fogOpacity: 0.5,
    fogRadius: 33,
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
        default: // if none of the above matches, code comes here
            return state
    }
}

export const setCursorSize = (newCursorSize) => {
    return {
        type: CHANGE_CURSORSIZE,
        cursorSize: newCursorSize,
    }
}

export default settingsReducer
