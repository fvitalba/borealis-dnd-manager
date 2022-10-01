import { ReactNode } from 'react'
import Game from '@/classes/Game'
import { MetadataState } from '@/reducers/metadataReducer'

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
}
