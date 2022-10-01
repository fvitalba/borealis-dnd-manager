import { Ref, MouseEvent } from 'react'
import Token from '@/classes/Token'
import Game from '@/classes/Game'
import UserType from '@/enums/UserType'
import { SettingsState } from '@/reducers/settingsReducer'
import { TokenState } from '@/reducers/tokenReducer'

export interface TokenProps {
    token: Token,
    userType: UserType,
    gameState: Game,
    tokenState: TokenState,
    settingsState: SettingsState,
    updateTokens: (newTokens: Array<Token>) => void,
    setTokenOrigin: (tokenGuidToUpdate: string, xOrigin: number, yOrigin: number) => void,
    setTokenSelected: (newSelected: boolean) => void,
}

export interface AbsolutePosition {
    left: number,
    top: number,
}

export interface ImageStyle {
    width: number,
    height: number,
}

export interface TokenViewProps {
    divStyle: AbsolutePosition,
    token: Token,
    isSelected: boolean,
    classes: Array<string>,
    imgStyle: ImageStyle,
    labelRef: Ref<HTMLLabelElement>,
    labelPosition: AbsolutePosition,
    onMouseDown: (event: MouseEvent<HTMLDivElement>) => void,
}
