import { Ref, MouseEvent } from 'react'
import Token from '../../classes/Token'
import Game from '../../classes/Game'
import UserType from '../../enums/UserType'
import { SettingsState } from '../../reducers/settingsReducer'
import { TokenState } from '../../reducers/tokenReducer'

export interface TokenProps {
    token: Token,
    userType: UserType,
    gameState: Game,
    tokenState: TokenState,
    settingsState: SettingsState,
    updateTokens: (arg0: Array<Token>) => void,
    setTokenOrigin: (arg0: string, arg1: number, arg2: number) => void,
    setTokenSelected: (arg0: boolean) => void,
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
    onMouseDown: (arg0: MouseEvent<HTMLDivElement>) => void,
}
