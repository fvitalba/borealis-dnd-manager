import { ChangeEvent } from 'react'
import Game from '@/classes/Game'
import Map from '@/classes/Map'
import { MapState } from '@/reducers/mapReducer'

export interface MapConfigState {
    id: number,
    name: string,
    imageUrl: string,
    x: number,
    y: number,
}

export interface MapConfigProps {
    map: Map,
    gameState: Game,
    mapState: MapState,
    loadMap: (arg0: number) => void,
    updateMaps: (arg0: Array<Map>) => void,
    deleteMap: (arg0: number) => void,
}

export interface MapConfigViewProps {
    isSelected: boolean,
    mapConfigState: MapConfigState,
    load: () => void,
    onTextChange: (arg0: string, arg1: ChangeEvent<HTMLInputElement>) => void,
    deleteMap: () => void,
}
