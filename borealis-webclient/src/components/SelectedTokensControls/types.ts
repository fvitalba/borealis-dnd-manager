import Token from '../../classes/Token'
import { TokenState } from '../../reducers/tokenReducer'

export interface SelectedTokensControlsProps {
    tokenState: TokenState,
}

export interface SelectedTokensControlsViewProps {
    tokens: Array<Token>,
}
