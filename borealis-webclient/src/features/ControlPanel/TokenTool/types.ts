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
    addToken: (arg0: Token) => void,
}

export interface TokenToolViewProps {
    newTokenName: string,
    setNewTokenName: (e: ChangeEvent<HTMLInputElement>) => void,
    isCreateTokenEnabled: boolean,
    createToken: () => void,
    tokens: Array<Token>,
    selectedTokenName: string,
    currSelectedTokenName: string,
    onTokenSelect: (tokenIndex: number) => void,
    onSubmitSelectToken: () => void,
    isSubmitSelectionEnabled: boolean,
    showSelectedToken: boolean,
}
