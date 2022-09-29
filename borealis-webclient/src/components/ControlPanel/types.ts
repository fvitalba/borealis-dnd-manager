import { ReactNode } from 'react'
import Game from '../../classes/Game'
import { MetadataState } from '../../reducers/metadataReducer'
import { ChatState } from '../../reducers/chatReducer'
import { CharacterState } from '../../reducers/characterReducer'
import { TokenState } from '../../reducers/tokenReducer'
import { MapState } from '../../reducers/mapReducer'

export interface ControlPanelState {
    hidden: boolean,
    toggleOnMaps: boolean,
    toggleOnUser: boolean,
    toggleOnTokens: boolean,
    toggleOnCharacterStats: boolean,
    toggleOnCharacterInventory: boolean,
    toggleOnCharacterSpells: boolean,
}

export type ControlPanelTabName = 'hidden' | 'toggleOnMaps' | 'toggleOnUser' | 'toggleOnTokens' | 'toggleOnCharacterStats' | 'toggleOnCharacterInventory' | 'toggleOnCharacterSpells'

export interface ControlPanelProps {
    metadataState: MetadataState,
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    chatState: ChatState,
    characterState: CharacterState,
}

export interface ControlPanelContainerProps {
    children: ReactNode,
}

export interface ControlPanelRowProps {
    children: ReactNode,
    reverseDirection?: boolean,
}

export interface ControlPanelContainerProps {
    children: ReactNode,
}

export interface ControlPanelViewProps {
    controlPanelState: ControlPanelState,
    hidden: boolean,
    toggleControlPanelTab: (tabName: ControlPanelTabName) => void,
    submenuHidden: boolean,
    fogEnabled: boolean,
    isHost: boolean,
    socketRequestRefresh: () => void,
    pushRefreshToPlayers: () => void,
}
