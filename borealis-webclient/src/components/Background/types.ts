import Game from '@/classes/Game'
import { SettingsState } from '@/reducers/settingsReducer'
import { MapState } from '@/reducers/mapReducer'

export interface BackgroundProps {
    gameState: Game,
    mapState: MapState,
    settingsState: SettingsState,
    updateDeltaXY: (deltaX: number, deltaY: number) => void,
    updateScale: (scale: number) => void,
}
