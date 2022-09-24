import Game from '../../classes/Game'
import { SettingsState } from '../../reducers/settingsReducer'
import { MapState } from '../../reducers/mapReducer'

export interface BackgroundProps {
    gameState: Game,
    mapState: MapState,
    settingsState: SettingsState,
    updateDeltaXY: (arg0: number, arg1: number) => void,
    updateScale: (arg0: number) => void,
}
