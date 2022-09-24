import Game from '../../classes/Game'
import { MapState } from '../../reducers/mapReducer'
import { SettingsState } from '../../reducers/settingsReducer'

export interface DrawingProps {
    gameState: Game,
    mapState: MapState,
    settingsState: SettingsState,
}
