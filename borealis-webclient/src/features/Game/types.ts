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
    updateTokens: (arg0: Array<Token>) => void,
    toggleTokenValue: (arg0: string, arg1: TokenBooleanProperty) => void,
    updateMaps: (arg0: Array<Map>) => void,
    setTokenSelected: (arg0: boolean) => void,
}

export interface GameViewProps {
    userType: UserType,
    overlayRef: Ref<HTMLCanvasElement>,
    cursors: Array<Cursor>,
    tokens: Array<Token>,
    onMouseMove: (arg0: MouseEvent) => void,
    onMouseUp: (arg0: MouseEvent) => void,
    onMouseDown: (arg0: MouseEvent) => void,
}
