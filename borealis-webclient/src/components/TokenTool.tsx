import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Token from '../classes/Token'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState } from '../reducers/metadataReducer'
import { addToken, TokenState } from '../reducers/tokenReducer'
import TokenToolView from '../views/TokenToolView'

interface TokenToolState {
    newTokenName: string,
    selectedTokenName: string,
    currSelectedTokenName: string,
    showSelectedToken: boolean,
}

const initialTokenToolState = (): TokenToolState => {
    return {
        newTokenName: '',
        selectedTokenName: '',
        currSelectedTokenName: '',
        showSelectedToken: false,
    }
}

interface TokenToolProps {
    toggleOnTokens: boolean,
    gameState: Game,
    tokenState: TokenState,
    metadataState: MetadataState,
    addToken: (arg0: Token) => void,
}

const TokenTool = ({ toggleOnTokens, gameState, tokenState, metadataState, addToken }: TokenToolProps) => {
    const [tokenToolState, setTokenToolState] = useState(initialTokenToolState())
    const currentTokens = tokenState.tokens.filter((token) => (token.mapId === -1) || (token.mapId === gameState.currentMapId))

    if (metadataState.userType !== UserType.host)
        return <></>

    const createToken = () => {
        if (!tokenToolState.newTokenName)
            return
        const newToken = new Token(tokenToolState.newTokenName, '', -1, 0, 0)
        addToken(newToken)
        setTokenToolState({
            ...tokenToolState,
            newTokenName: '',
            currSelectedTokenName: newToken.name,
            showSelectedToken: true,
        })
    }

    const onNewTokenNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTokenToolState({
            ...tokenToolState,
            newTokenName: e.target.value,
            selectedTokenName: '',
        })
    }

    const onTokenSelect = (tokenIndex: number) => {
        const selectedToken = currentTokens.filter((token, index) => index === tokenIndex)[0]
        setTokenToolState({
            ...tokenToolState,
            selectedTokenName: selectedToken.name,
            newTokenName: '',
        })
    }

    const onSubmitSelectToken = () => {
        console.log('selected token name',tokenToolState.selectedTokenName)
        setTokenToolState({
            ...tokenToolState,
            selectedTokenName: '',
            currSelectedTokenName: tokenToolState.selectedTokenName,
            showSelectedToken: true,
        })
    }

    const isCreateTokenEnabled = (): boolean => {
        const existingToken = tokenState.tokens.filter((token) => token.name === tokenToolState.newTokenName)
        if (existingToken.length > 0)
            return false
        else
            return true
    }
    const isSubmitSelectionEnabled = (tokenToolState.selectedTokenName !== '')

    return (
        toggleOnTokens
            ? <TokenToolView
                newTokenName={ tokenToolState.newTokenName }
                setNewTokenName={ onNewTokenNameChange }
                isCreateTokenEnabled={ isCreateTokenEnabled() }
                createToken={ createToken }
                tokens={ currentTokens }
                selectedTokenName={ tokenToolState.selectedTokenName }
                currSelectedTokenName={ tokenToolState.currSelectedTokenName }
                onTokenSelect={ onTokenSelect }
                onSubmitSelectToken={ onSubmitSelectToken }
                isSubmitSelectionEnabled={ isSubmitSelectionEnabled }
                showSelectedToken={ tokenToolState.showSelectedToken }
            />
            : null
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
