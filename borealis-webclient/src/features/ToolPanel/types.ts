import Game from '@/classes/Game'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'

export interface ToolPanelState {
    hidden: boolean,
}

export type ToolPanelTabName = 'hidden'

export interface ToolPanelProps {
    metadataState: MetadataState,
    gameState: Game,
    settingsState: SettingsState,
}

export interface ToolPanelViewProps {
    hidden: boolean,
    toggleToolPanelTab: (tabName: ToolPanelTabName) => void,
    submenuHidden: boolean,
    isHost: boolean,
    fogEnabled: boolean,
}

export interface ToolSelectViewProps {
    isHost: boolean,
    fogEnabled: boolean,
}
