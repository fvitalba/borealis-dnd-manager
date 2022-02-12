import { 
    INCREMENT_GEN, 
    LOAD_MAP, 
    SET_ISFIRSTLOADDONE, 
    SET_ISFOGLOADED, 
    UPDATE_MAPS, 
    UPDATE_TOKENS 
} from "../redux/constants"

const initialGameState = {
    mapId: undefined,
    gen: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    isFogLoaded: false,
    isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
    maps: [],
    tokens: [],
}

const gameReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case LOAD_MAP:
            return {
                ...state,
                mapId: action.mapId,
            }
        case INCREMENT_GEN:
            return {
                ...state,
                gen: state.gen + 1,
            }
        case SET_ISFOGLOADED:
            return {
                ...state,
                isFogLoaded: action.isFogLoaded,
            }
        case SET_ISFIRSTLOADDONE:
            return {
                ...state,
                isFirstLoadDone: action.isFirstLoadDone,
            }
        case UPDATE_MAPS:
            return {
                ...state,
                maps: action.maps,
            }
        case UPDATE_TOKENS:
            return {
                ...state,
                tokens: action.tokens,
            }
        default:
            return state
    }
}

export const loadMap = (newMapId) => {
    return {
        type: LOAD_MAP,
        mapId: parseInt(newMapId),
    }
}

export const incrementGen = () => {
    return {
        type: INCREMENT_GEN,
    }
}

export const setIsFogLoaded = (newIsFogLoaded) => {
    return {
        type: SET_ISFOGLOADED,
        isFogLoaded: newIsFogLoaded,
    }
}

export const setIsFirstLoadDone = (newIsFirstLoadDone) => {
    return {
        type: SET_ISFIRSTLOADDONE,
        isFirstLoadDone: newIsFirstLoadDone,
    }
}

export const updateMaps = (newMaps) => {
    return {
        type: UPDATE_MAPS,
        maps: newMaps,
    }
}

export const updatetokens = (newTokens) => {
    return {
        type: UPDATE_TOKENS,
        tokens: newTokens,
    }
}

export default gameReducer
