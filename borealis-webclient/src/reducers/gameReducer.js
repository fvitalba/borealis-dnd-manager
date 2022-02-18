import {
    OVERWRITE_GAME,
    LOAD_MAP, 
    INCREMENT_GEN, 
    SET_FOG_ENABLED,
    SET_ISFIRSTLOADDONE, 
    SET_ISFOGLOADED, 
    UPDATE_MAPS, 
    ADD_MAP,
    DELETE_MAP,
    UPDATE_TOKENS,
    ADD_TOKEN,
    DELETE_TOKEN,
    COPY_TOKEN,
    UPDATE_TOKEN_VALUE,
    TOGGLE_TOKEN_VALUE,
    SET_TOKEN_ORIGIN,
    RESET_FOG,
    RESET_DRAW
} from '../redux/constants'
import guid from '../controllers/guid.js'

const initialGameState = {
    mapId: undefined,
    gen: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    fogEnabled: false,
    isFogLoaded: false,
    isFirstLoadDone: false, /* Ensure we don't overwrite localStorage before load is done */
    maps: [],
    tokens: [],
}

const defaultGameState = {
    ...initialGameState,
    mapId: 0,
    isFogLoaded: true,
    isFirstLoadDone: true,
    width: 795,
    height: 555,
    maps: [{
        name: 'Dragon\'s Lair',
        $id: 0,
        imageUrl: 'https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2022/02/Arena-of-Fire-battle-map-Main-preview-Night.jpg',
        x: 0,
        y: 0,
        width: 795,
        height: 555,
        drawPaths: [],
        fogPaths: [],
    },
    {
        name: 'Mage Tower',
        $id: 1,
        imageUrl: 'https://2minutetabletop.com/wp-content/uploads/2022/01/Wizarding-School-Classroom-Basic-Light-16x22-1.jpg',
        x: 0,
        y: 0,
        width: 795,
        height: 555,
        drawPaths: [],
        fogPaths: [],
    }],
    tokens: [{
        guid: guid(),
        name: 'Adult Black Dragon',
        url: 'https://i.imgur.com/H2dyKur.png',
        mapId: 0,
        x: 350,
        y: 210,
        ko: false,
        pc: false,
        width: 100,
        height: 100,
        $selected: false,
        $x0: 0,
        $y0: 0,
    },
    {
        guid: guid(),
        name: 'Mighty Paladin',
        url: 'https://i.imgur.com/ccQxtZ7.png',
        mapId: 0,
        x: 50,
        y: 180,
        ko: false,
        pc: true,
        width: 50,
        height: 50,
        $selected: false,
        $x0: 0,
        $y0: 0,
    },
    {
        guid: guid(),
        name: 'Misterious Wizard',
        url: 'https://i.imgur.com/82s9UPR.png',
        mapId: 1,
        x: 620,
        y: 250,
        ko: false,
        pc: false,
        width: 50,
        height: 50,
        $selected: false,
        $x0: 0,
        $y0: 0,
    }]
}

const gameReducer = (state = initialGameState, action) => {
    const maps = JSON.parse(JSON.stringify(state.maps))
    const tokens = JSON.parse(JSON.stringify(state.tokens))
    switch (action.type) {
        case OVERWRITE_GAME:
            return {
                ...state,
                ...action.game,
            }
        case LOAD_MAP:
            return {
                ...state,
                mapId: parseInt(action.mapId),
            }
        case INCREMENT_GEN:
            return {
                ...state,
                gen: state.gen + 1,
            }
        case SET_FOG_ENABLED:
            return {
                ...state,
                fogEnabled: action.fogEnabled,
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
                mapId: !isNaN(state.mapId) ? state.mapId : undefined,
            }
        case ADD_MAP:
            const newMapId = state.maps.length
            const mapsWithNewMap = maps.concat({
                ...action.map,
                $id: newMapId,
            })
            return {
                ...state,
                maps: mapsWithNewMap,
                mapId: !isNaN(state.mapId) ? state.mapId : newMapId,
                isFirstLoadDone: true,
                isFogLoaded: true,
            }
        case DELETE_MAP:
			const newMaps = maps.filter((map) => map.$id !== parseInt(action.mapId))
            return {
                ...state,
                maps: newMaps,
                mapId: parseInt(action.mapId) === state.mapId ? undefined : state.mapId,
            }
        case UPDATE_TOKENS:
            return {
                ...state,
                tokens: action.tokens,
            }
        case ADD_TOKEN:
            return {
                ...state,
                tokens: state.tokens.concat(action.token)
            }
        case DELETE_TOKEN:
            const newTokens = tokens.filter((token) => token.guid !== action.tokenGuid)
            return {
                ...state,
                tokens: newTokens,
            }
        case COPY_TOKEN:
            const tokenCopy = state.tokens.filter((token) => token.guid === action.tokenGuid)
            const newToken = {
                ...tokenCopy[0],
                guid: guid()
            }
            return {
                ...state,
                tokens: state.tokens.concat(newToken)
            }
        case UPDATE_TOKEN_VALUE:
            const tokensCopy = state.tokens.map((token) => {
                return token.guid !== action.tokenGuid ? token : {
                    ...token,
                    [action.key]: action.value
                }
            })
            return {
                ...state,
                tokens: tokensCopy,
            }
        case TOGGLE_TOKEN_VALUE:
            const tokensCopy2 = state.tokens.map((token) => {
                return token.guid !== action.tokenGuid ? token : {
                    ...token,
                    [action.key]: !token[action.key]
                }
            })
            return {
                ...state,
                tokens: tokensCopy2,
            }
        case SET_TOKEN_ORIGIN:
            const tokensCopy3 = state.tokens.map((token) => {
                return token.guid !== action.tokenGuid ? token : {
                    ...token,
                    $x0: action.xOrigin,
                    $y0: action.yOrigin,
                }
            })
            return {
                ...state,
                tokens: tokensCopy3,
            }
        case RESET_FOG:
			const fogResetMaps = state.maps.map((map) => {
                return map.$id === state.mapId ? {
                        ...map,
                        fogPaths: [],
                    } 
                    : map
                })
            return {
                ...state,
                maps: fogResetMaps,
            }
        case RESET_DRAW:
            const drawResetMaps = state.maps.map((map) => {
                return map.$id === state.mapId ? {
                        ...map,
                        drawPaths: [],
                    } 
                    : map
                })
            return {
                ...state,
                maps: drawResetMaps,
            }
        default:
            return state
    }
}

//#region Action Creators
export const overwriteGame = (newGame) => {
    const newGameUpdated = {
        ...newGame,
        tokens: newGame.tokens.map((token) => {
            return {
                ...token,
                $selected: false,
                $x0: 0,
                $y0: 0,
            }
        })
    }
    return {
        type: OVERWRITE_GAME,
        game: newGameUpdated,
    }
}

export const loadDefaultBattleGame = () => {
    return {
        type: OVERWRITE_GAME,
        game: defaultGameState,
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

export const setFogEnabled = (newFogEnabled) => {
    return {
        type: SET_FOG_ENABLED,
        fogEnabled: newFogEnabled,
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

export const addMap = (mapName, width, height) => {
    const newMap = {
        name: mapName,
        $id: 0,
        imageUrl: '',
        x: 0,
        y: 0,
        width: width,
        height: height,
        drawPaths: [],
        fogPaths: [],
    }

    return {
        type: ADD_MAP,
        map: newMap,
    }
}

export const deleteMap = (mapIdToDelete) => {
    return {
        type: DELETE_MAP,
        mapId: mapIdToDelete,
    }
}

export const updateTokens = (newTokens) => {
    return {
        type: UPDATE_TOKENS,
        tokens: newTokens,
    }
}

export const addToken = (tokenName, tokenUrl, mapId) => {
    const newToken = {
        guid: guid(),
        name: tokenName,
        url: tokenUrl,
        mapId: mapId,
        $selected: false,
        $x0: 0,
        $y0: 0,
        x: 0,
        y: 0,
        ko: false,
        pc: false,
        w: 0,
        h: 0,
    }

    return {
        type: ADD_TOKEN,
        token: newToken,
    }
}

export const deleteToken = (tokenGuidToDelete) => {
    return {
        type: DELETE_TOKEN,
        tokenGuid: tokenGuidToDelete,
    }
}

export const copyToken = (tokenGuidToCopy) => {
    return {
        type: COPY_TOKEN,
        tokenGuid: tokenGuidToCopy,
    }
}

export const updateTokenValue = (tokenGuidToUpdate, key, value) => {
    return {
        type: UPDATE_TOKEN_VALUE,
        tokenGuid: tokenGuidToUpdate,
        key: key,
        value: value,
    }
}

export const toggleTokenValue = (tokenGuidToUpdate, key) => {
    return {
        type: TOGGLE_TOKEN_VALUE,
        tokenGuid: tokenGuidToUpdate,
        key: key,
    }
}

export const setTokenOrigin = (tokenGuidToUpdate, xOrigin, yOrigin) => {
    return {
        type: SET_TOKEN_ORIGIN,
        tokenGuid: tokenGuidToUpdate,
        xOrigin: parseInt(xOrigin),
        yOrigin: parseInt(yOrigin),
    }
}

export const resetFog = () => {
    return {
        type: RESET_FOG,
    }
}

export const resetDraw = () => {
    return {
        type: RESET_DRAW,
    }
}
//#endregion Action Creators

export default gameReducer
