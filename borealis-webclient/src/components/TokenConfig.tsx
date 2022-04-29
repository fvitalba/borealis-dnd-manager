import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Token, { TokenBooleanProperty, TokenNumberProperty, TokenTextProperty } from '../classes/Token'
import UserType from '../enums/UserType'
import { TokenSizeArray } from '../enums/TokenSize'
import { TokenTypeArray } from '../enums/TokenType'
import { TokenConditionArray } from '../enums/TokenCondition'
import { pushSingleToken, deleteSingleToken, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { TokenState } from '../reducers/tokenReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { deleteToken, copyToken, updateTokenTextValue, updateTokenNumberValue, toggleTokenValue, updateTokens } from '../reducers/tokenReducer'
import { MapState } from '../reducers/mapReducer'
import HostTokenConfig from '../views/HostTokenConfigView'
import GuestTokenConfigView from '../views/GuestTokenConfigView'

interface TokenConfigProps {
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
}

const TokenConfig = ({ token, mapState, tokenState, metadataState, deleteToken, copyToken, updateTokenTextValue, updateTokenNumberValue, toggleTokenValue, updateTokens }: TokenConfigProps) => {
    const webSocketContext = useWebSocket()

    const selectToken = () => {
        if (!token.isAllowedToMove(metadataState.userType))
            return
        toggleTokenValue(token.guid, 'selected')
    }

    const deleteCurrToken = () => {
        deleteToken(token.guid)
        if (webSocketContext.ws)
            deleteSingleToken(webSocketContext.ws, webSocketContext.wsSettings, token.guid)
    }

    const copy = () => {
        copyToken(token.guid)
    }

    const onTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newToken = token.copy()
        newToken.type = parseInt(e.target.value)
        const newTokens = tokenState.tokens.map((gtoken) => gtoken.guid === newToken.guid ? newToken : gtoken)
        updateTokens(newTokens)
        if (webSocketContext.ws)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
    }

    const onConditionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newToken = token.copy()
        newToken.condition = parseInt(e.target.value)
        const newTokens = tokenState.tokens.map((gtoken) => gtoken.guid === newToken.guid ? newToken : gtoken)
        updateTokens(newTokens)
        if (webSocketContext.ws)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
    }

    const onSizeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const newToken = token.copy()
        newToken.setTokenSize(parseInt(e.target.value))
        const newTokens = tokenState.tokens.map((gtoken) => gtoken.guid === newToken.guid ? newToken : gtoken)
        updateTokens(newTokens)
        if (webSocketContext.ws)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
    }

    const onMapSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.target.value)
        if (value < 0)
            value = -1

        updateTokenNumberValue(token.guid, 'mapId', value)
        if (webSocketContext.ws) {
            const newToken = token.copy()
            newToken.mapId = value
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    const onToggle = (attributeKey: TokenBooleanProperty /*, e: MouseEvent<HTMLButtonElement>*/) => {
        toggleTokenValue(token.guid, attributeKey)
        if (webSocketContext.ws) {
            const newToken = token.copy()
            newToken.toggleValue(attributeKey)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    const onTextChange = (attributeKey: TokenTextProperty, e: ChangeEvent<HTMLInputElement>) => {
        updateTokenTextValue(token.guid, attributeKey, e.target.value)
        if (webSocketContext.ws) {
            const newToken = token.copy()
            newToken.setTextValue(attributeKey, e.target.value)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    return (
        <div>
            { token
                ? (metadataState.userType === UserType.host)
                    ? <HostTokenConfig
                        tokenTypes={ TokenTypeArray }
                        tokenConditions={ TokenConditionArray }
                        tokenSizes={ TokenSizeArray }
                        maps={ mapState.maps }
                        token={ token }
                        copy={ copy }
                        onToggle={ onToggle }
                        onTextChange={ onTextChange }
                        selectToken={ selectToken }
                        onTypeSelect={ onTypeSelect }
                        onConditionSelect={ onConditionSelect }
                        onSizeSelect={ onSizeSelect }
                        onMapSelect={ onMapSelect }
                        deleteToken={ deleteCurrToken }
                    />
                    : <GuestTokenConfigView
                        token={ token }
                        onTextChange={ onTextChange }
                    />
                : null
            }
        </div>
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        mapState: state.map,
        tokenState: state.token,
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    deleteToken,
    copyToken,
    updateTokenTextValue,
    updateTokenNumberValue,
    toggleTokenValue,
    updateTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenConfig)
