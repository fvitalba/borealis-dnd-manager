import {
    OVERWRITE_GAME,
    LOAD_MAP,
    INCREMENT_GEN,
    SET_FOG_ENABLED,
} from '../redux/constants'
import Game from '../classes/Game'

interface GameAction {
    type: string,
    game?: Game,
    mapId?: number,
    version?: number,
    fogEnabled?: boolean,
}

const gameReducer = (state: Game = new Game(), action: GameAction): Game => {
    switch (action.type) {
    case OVERWRITE_GAME:
        return {
            ...state,
            ...action.game,
            width: window.innerWidth,
            height: window.innerHeight,
        }
    case INCREMENT_GEN:
        return {
            ...state,
            version: state.version + 1,
        }
    case SET_FOG_ENABLED:
        return {
            ...state,
            fogEnabled: action.fogEnabled !== undefined ? action.fogEnabled : state.fogEnabled,
        }
    default:
        return state
    }
}

//#region Action Creators
export const overwriteGame = (newGame: Game) => {
    return {
        type: OVERWRITE_GAME,
        game: newGame,
    }
}

export const loadMap = (newMapId: number) => {
    return {
        type: LOAD_MAP,
        mapId: newMapId,
    }
}

export const incrementGen = () => {
    return {
        type: INCREMENT_GEN,
    }
}

export const setFogEnabled = (newFogEnabled: boolean) => {
    return {
        type: SET_FOG_ENABLED,
        fogEnabled: newFogEnabled,
    }
}
//#endregion Action Creators

export default gameReducer
