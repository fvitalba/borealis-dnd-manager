import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Token, { TokenBooleanProperty, TokenNumberProperty, TokenTextProperty } from '../classes/Token'
import UserType from '../enums/UserType'
import TokenSize, { TokenSizeArray } from '../enums/TokenSize'
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

    const selectToken = (selectedToken: Token) => {
        if (!selectedToken.isAllowedToMove(metadataState.userType))
            return
        toggleTokenValue(selectedToken.guid, 'selected')
    }

    const deleteCurrToken = () => {
        deleteToken(token.guid)
        if (webSocketContext.ws && webSocketContext.wsSettings)
            deleteSingleToken(webSocketContext.ws, webSocketContext.wsSettings, token.guid)
    }

    const copy = () => {
        copyToken(token.guid)
    }

    const onSizeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const size = TokenSizeArray.filter((tokenSize) => tokenSize === e.target.value)
        const newToken = token.copy()
        const newSize: TokenSize = TokenSize[size[0]]
        newToken.setTokenSize(newSize)
        const newTokens = tokenState.tokens.map((gtoken) => gtoken.guid === newToken.guid ? newToken : gtoken)
        updateTokens(newTokens)
        if (webSocketContext.ws && webSocketContext.wsSettings)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
    }

    const onMapSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.target.value)
        if (value < 0)
            value = -1

        updateTokenNumberValue(token.guid, 'mapId', value)
        if (webSocketContext.ws && webSocketContext.wsSettings) {
            const newToken = token.copy()
            newToken.mapId = value
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    const onToggle = (attributeKey: TokenBooleanProperty /*, e: React.MouseEvent<HTMLButtonElement>*/) => {
        toggleTokenValue(token.guid, attributeKey)
        if (webSocketContext.ws && webSocketContext.wsSettings) {
            const newToken = token.copy()
            newToken.toggleValue(attributeKey)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    const onTextChange = (attributeKey: TokenTextProperty, e: ChangeEvent<HTMLInputElement>) => {
        updateTokenTextValue(token.guid, attributeKey, e.target.value)
        if (webSocketContext.ws && webSocketContext.wsSettings) {
            const newToken = token.copy()
            newToken.setTextValue(attributeKey, e.target.value)
            pushSingleToken(webSocketContext.ws, webSocketContext.wsSettings, newToken)
        }
    }

    return (
        <div>
            { token ?
                (metadataState.userType === UserType.host) ?
                    <HostTokenConfig
                        tokenSizes={ TokenSizeArray }
                        maps={ mapState.maps }
                        token={ token }
                        copy={ copy }
                        onToggle={ onToggle }
                        selectToken={ selectToken }
                        onTextChange={ onTextChange }
                        onSizeSelect={ onSizeSelect }
                        onMapSelect={ onMapSelect }
                        deleteToken={ deleteCurrToken }
                    />
                    :
                    <GuestTokenConfigView
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
