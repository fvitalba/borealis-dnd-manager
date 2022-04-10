import {
    ADD_MAP,
    UPDATE_MAPS,
    DELETE_MAP,
    RESET_FOG,
    RESET_DRAW
} from '../redux/constants'
import Map from '../classes/Map'
import Path from '../classes/Path'

export interface MapState {
    maps: Array<Map>,
}

const initialMapState = (): MapState => {
    return {
        maps: new Array<Map>(),
    }
}

interface MapAction {
    type: string,
    maps?: Array<Map>,
    map?: Map,
    mapId?: number,
}

const mapReducer = (state: MapState = initialMapState(), action: MapAction): MapState => {
    let newMapId = -1
    let newMaps = state.maps

    switch(action.type) {
    case ADD_MAP:
        if (action.map) {
            newMapId = state.maps.length
            newMaps = newMaps.concat({
                ...action.map,
                id: newMapId,
            })
        }
        return {
            ...state,
            maps: newMaps,
        }
    case UPDATE_MAPS:
        if (action.maps)
            return {
                ...state,
                maps: action.maps,
            }
        else
            return state
    case DELETE_MAP:
        if (action.mapId)
            newMaps = newMaps.filter((map: Map) => map.id !== action.mapId)
        return {
            ...state,
            maps: newMaps,
        }
    case RESET_FOG:
        if (action.mapId)
            newMaps = state.maps.map((map) => {
                return map.id === action.mapId ? {
                    ...map,
                    fogPaths: new Array<Path>(),
                }
                    : map
            })
        return {
            ...state,
            maps: newMaps,
        }
    case RESET_DRAW:
        if (action.mapId)
            newMaps = state.maps.map((map) => {
                return map.id === action.mapId ? {
                    ...map,
                    drawPaths: new Array<Path>(),
                }
                    : map
            })
        return {
            ...state,
            maps: newMaps,
        }
    default:
        return state
    }
}

//#region Action Creators
export const addMap = (mapName: string, width: number, height: number): MapAction => {
    const newMap = new Map(-1, mapName, '', 0, 0, width, height)
    return {
        type: ADD_MAP,
        map: newMap,
    }
}

export const updateMaps = (newMaps: Array<Map>): MapAction => {
    return {
        type: UPDATE_MAPS,
        maps: newMaps,
    }
}

export const deleteMap = (mapIdToDelete: number): MapAction => {
    return {
        type: DELETE_MAP,
        mapId: mapIdToDelete,
    }
}

export const resetFog = (mapIdToReset: number): MapAction => {
    return {
        type: RESET_FOG,
        mapId: mapIdToReset,
    }
}

export const resetDraw = (mapIdToReset: number): MapAction => {
    return {
        type: RESET_DRAW,
        mapId: mapIdToReset,
    }
}
//#endregion Action Creators

export default mapReducer
