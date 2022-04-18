import {
    OVERWRITE_GAME,
    LOAD_MAP,
    INCREMENT_VERSION,
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
    let newGame = state
    switch (action.type) {
    case OVERWRITE_GAME:
        if (action.game)
            newGame = action.game
        newGame.width = window.innerWidth
        newGame.height = window.innerHeight
        return newGame
    case INCREMENT_VERSION:
        newGame.version = state.version + 1
        return newGame
    case SET_FOG_ENABLED:
        newGame.fogEnabled = action.fogEnabled !== undefined ? action.fogEnabled : state.fogEnabled
        return newGame
    default:
        return state
    }
}

//#region Action Creators
export const overwriteGame = (newGame: Game): GameAction => {
    return {
        type: OVERWRITE_GAME,
        game: newGame,
    }
}

export const loadMap = (newMapId: number): GameAction => {
    return {
        type: LOAD_MAP,
        mapId: newMapId,
    }
}

export const incrementVersion = (): GameAction => {
    return {
        type: INCREMENT_VERSION,
    }
}

export const setFogEnabled = (newFogEnabled: boolean): GameAction => {
    return {
        type: SET_FOG_ENABLED,
        fogEnabled: newFogEnabled,
    }
}
//#endregion Action Creators

export default gameReducer
