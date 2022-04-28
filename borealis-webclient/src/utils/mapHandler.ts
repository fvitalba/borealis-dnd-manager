import Map from '../classes/Map'
import { MapState } from '../reducers/mapReducer'

export const getMap = (mapState: MapState, mapId: number): Map | undefined => {
    if (mapState.maps.length === 0)
        return undefined
    const currMap = mapState.maps.filter((map) => map.id === mapId)
    return currMap.length > 0 ? currMap[0] : mapState.maps[0]
}
