import { ChangeEvent } from 'react'
import Map from '@/classes/Map'
import Game from '@/classes/Game'
import { MapState } from '@/reducers/mapReducer'

export interface MapToolState {
    newMapName: string,
    selectedMapName: string,
    currSelectedMapName: string,
    showSelectedMap: boolean,
}

export interface MapToolProps {
    toggleOnMaps: boolean,
    mapState: MapState,
    gameState: Game,
    addMap: (newMap: Map) => void,
}

export interface MapToolViewProps {
    maps: Array<Map>,
    activeMapId: number,
    newMapName: string,
    setNewMapName: (event: ChangeEvent<HTMLInputElement>) => void,
    isCreateMapEnabled: boolean,
    createMap: () => void,
    selectedMapName: string,
    currSelectedMapName: string,
    onMapSelect: (mapIndex: number) => void,
    onSubmitSelectMap: () => void,
    isSubmitSelectionEnabled: boolean,
    showSelectedMap: boolean,
}
