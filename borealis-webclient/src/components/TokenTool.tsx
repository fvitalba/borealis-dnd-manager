import React, { useState } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Token from '../classes/Token'
import SelectedTokensControls from './SelectedTokensControls'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import { addToken, TokenState } from '../reducers/tokenReducer'
import TokenToolView from '../views/TokenToolView'

interface TokenToolProps {
    toggleOnTokens: boolean,
    gameState: Game,
    tokenState: TokenState,
    metadataState: MetadataState,
    addToken: (arg0: Token) => void,
}

const TokenTool = ({ toggleOnTokens, gameState, tokenState, metadataState, addToken }: TokenToolProps) => {
    const [newTokenName, setNewTokenName] = useState('')

    if (metadataState.userType !== UserType.host)
        return null

    const createToken = () => {
        if (!newTokenName)
            return
        const newToken = new Token(newTokenName, '', -1, 0, 0)
        addToken(newToken)
        setNewTokenName('')
    }

    const currentTokens = tokenState.tokens.filter((token) => (token.mapId === undefined) || (token.mapId === gameState.currentMapId))

    return (
        toggleOnTokens
            ? <TokenToolView newTokenName={ newTokenName } setNewTokenName={ setNewTokenName } createToken={ createToken } tokens={ currentTokens } />
            : <SelectedTokensControls />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        tokenState: state.token,
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    addToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenTool)
