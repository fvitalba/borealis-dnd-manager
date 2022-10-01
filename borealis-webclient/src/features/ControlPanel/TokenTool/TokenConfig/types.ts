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
    deleteToken: (tokenGuid: string) => void,
    copyToken: (tokenGuid: string) => void,
    updateTokenTextValue: (tokenGuid: string, tokenAttribute: TokenTextProperty, newValue: string) => void,
    updateTokenNumberValue: (tokenGuid: string, tokenAttribute: TokenNumberProperty, newValue: number) => void,
    toggleTokenValue: (tokenGuid: string, tokenAttribute: TokenBooleanProperty) => void,
    updateTokens: (tokens: Array<Token>) => void,
    setTokenSelected: (selected: boolean) => void,
}

export interface HostTokenConfigViewProps {
    tokenSizes: Array<TokenSize>,
    tokenTypes: Array<TokenType>,
    tokenConditions: Array<TokenCondition>,
    maps: Array<Map>,
    token: Token,
    copy: () => void,
    onToggle: (tokenAttribute: TokenBooleanProperty, event: MouseEvent<HTMLButtonElement>) => void,
    onTextChange: (tokenAttribute: TokenTextProperty, event: ChangeEvent<HTMLInputElement>) => void,
    selectToken: (event: MouseEvent<HTMLButtonElement>) => void,
    onTypeSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    onConditionSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    onSizeSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    onMapSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    deleteToken: (event: MouseEvent<HTMLButtonElement>) => void,
}

export interface GuestTokenConfigViewProps {
    token: Token,
    onTextChange: (tokenAttribute: TokenTextProperty, event: ChangeEvent<HTMLInputElement>) => void,
}
