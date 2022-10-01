import { ChangeEvent } from 'react'
import Game from '@/classes/Game'
import Token from '@/classes/Token'
import { MetadataState } from '@/reducers/metadataReducer'
import { TokenState } from '@/reducers/tokenReducer'

export interface TokenToolState {
    newTokenName: string,
    selectedTokenName: string,
    currSelectedTokenName: string,
    showSelectedToken: boolean,
}

export interface TokenToolProps {
    toggleOnTokens: boolean,
    gameState: Game,
    tokenState: TokenState,
    metadataState: MetadataState,
    addToken: (newToken: Token) => void,
}

export interface TokenToolViewProps {
    newTokenName: string,
    setNewTokenName: (event: ChangeEvent<HTMLInputElement>) => void,
    isCreateTokenEnabled: boolean,
    createToken: () => void,
    tokens: Array<Token>,
    selectedTokenName: string,
    currSelectedTokenName: string,
    onTokenSelect: (tokenIndex: number, submitSelection: boolean) => void,
    onSubmitSelectToken: () => void,
    isSubmitSelectionEnabled: boolean,
    showSelectedToken: boolean,
}
