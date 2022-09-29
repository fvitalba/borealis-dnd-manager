import { ChangeEvent, MouseEvent } from 'react'
import { MetadataState } from '@/reducers/metadataReducer'
import { TokenState } from '@/reducers/tokenReducer'
import { MapState } from '@/reducers/mapReducer'
import Map from '@/classes/Map'
import Token, { TokenBooleanProperty, TokenTextProperty, TokenNumberProperty } from '@/classes/Token'
import TokenCondition from '@/enums/TokenCondition'
import TokenSize from '@/enums/TokenSize'
import TokenType from '@/enums/TokenType'

export interface TokenConfigProps {
    token: Token,
    mapState: MapState,
    tokenState: TokenState,
    metadataState: MetadataState,
    deleteToken: (arg0: string) => void,
    copyToken: (arg0: string) => void,
    updateTokenTextValue: (arg0: string, arg1: TokenTextProperty, arg2: string) => void,
    updateTokenNumberValue: (arg0: string, arg1: TokenNumberProperty, arg2: number) => void,
    toggleTokenValue: (arg0: string, arg1: TokenBooleanProperty) => void,
    updateTokens: (arg0: Array<Token>) => void,
    setTokenSelected: (arg0: boolean) => void,
}

export interface HostTokenConfigViewProps {
    tokenSizes: Array<TokenSize>,
    tokenTypes: Array<TokenType>,
    tokenConditions: Array<TokenCondition>,
    maps: Array<Map>,
    token: Token,
    copy: () => void,
    onToggle: (arg0: TokenBooleanProperty, arg1: MouseEvent<HTMLButtonElement>) => void,
    onTextChange: (arg0: TokenTextProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
    selectToken: (arg0: MouseEvent<HTMLButtonElement>) => void,
    onTypeSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onConditionSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onSizeSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    onMapSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    deleteToken: (arg0: MouseEvent<HTMLButtonElement>) => void,
}

export interface GuestTokenConfigViewProps {
    token: Token,
    onTextChange: (arg0: TokenTextProperty, arg1: ChangeEvent<HTMLInputElement>) => void,
}
