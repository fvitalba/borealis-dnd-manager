import Game from '../../classes/Game'
import { MapState } from '../../reducers/mapReducer'
import { MetadataState } from '../../reducers/metadataReducer'
import { SettingsState } from '../../reducers/settingsReducer'

export interface FogProps {
    gameState: Game,
    mapState: MapState,
    metadataState: MetadataState,
    settingsState: SettingsState,
}
