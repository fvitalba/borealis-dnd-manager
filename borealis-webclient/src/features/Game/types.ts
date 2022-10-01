import { Ref, MouseEvent } from 'react'
import Cursor from '@/classes/Cursor'
import Token, { TokenBooleanProperty } from '@/classes/Token'
import UserType from '@/enums/UserType'
import Game from '@/classes/Game'
import Map from '@/classes/Map'
import { MapState } from '@/reducers/mapReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import { TokenState } from '@/reducers/tokenReducer'

export interface GameProps {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    settingsState: SettingsState,
    metadataState: MetadataState,
    updateTokens: (newTokens: Array<Token>) => void,
    toggleTokenValue: (tokenGuidToUpdate: string, key: TokenBooleanProperty) => void,
    updateMaps: (newMaps: Array<Map>) => void,
    setTokenSelected: (newTokenSelected: boolean) => void,
}

export interface GameViewProps {
    userType: UserType,
    overlayRef: Ref<HTMLCanvasElement>,
    cursors: Array<Cursor>,
    tokens: Array<Token>,
    onMouseMove: (event: MouseEvent) => void,
    onMouseUp: (event: MouseEvent) => void,
    onMouseDown: (event: MouseEvent) => void,
}
