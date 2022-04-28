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

export const initialMapState = (): MapState => {
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

const mapReducer = (state = initialMapState(), action: MapAction): MapState => {
    let newMapId = -1
    let newMaps = state.maps.map((map) => map.copy())
    let newMap: Map

    switch(action.type) {
    case ADD_MAP:
        if (action.map) {
            newMapId = state.maps.length
            newMap = action.map
            newMap.id = newMapId
            newMaps = newMaps.concat(newMap)
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
                newMap = map.copy()
                if (map.id === action.mapId)
                    newMap.fogPaths = new Array<Path>()
                return newMap
            })
        return {
            ...state,
            maps: newMaps,
        }
    case RESET_DRAW:
        if (action.mapId)
            newMaps = state.maps.map((map) => {
                newMap = map.copy()
                if (map.id === action.mapId)
                    newMap.drawPaths = new Array<Path>()
                return newMap
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
export const addMap = (newMap: Map): MapAction => {
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
