import React from 'react'
import { connect } from 'react-redux'
import { deleteToken, copyToken, updateTokenValue, toggleTokenValue, updateTokens } from '../reducers/gameReducer'
import { pushSingleToken, deleteSingleToken, useWebSocket } from '../hooks/useSocket'
import HostTokenConfig from '../views/HostTokenConfigView'
import GuestTokenConfigView from '../views/GuestTokenConfigView'

const tokenSizes = [{
    id: 'tiny',
    width: 10,
    height: 10,
},
{
    id: 'small',
    width: 25,
    height: 25,
},
{
    id: 'medium',
    width: 50,
    height: 50,
},
{
    id: 'large',
    width: 75,
    height: 75,
},
{
    id: 'huge',
    width: 100,
    height: 100,
},
{
    id: 'gargantuan',
    width: 150,
    height: 150,
}]

const TokenConfig = ({ token, game, metadata, deleteToken, copyToken, updateTokenValue, toggleTokenValue, updateTokens }) => {
    const [webSocket, wsSettings] = useWebSocket()

    const selectToken = (token) => {
        if (!token.pc && !metadata.isHost)
            return
        toggleTokenValue(token.guid, 'selected')
    }

    const deleteCurrToken = () => {
        deleteToken(token.guid)
        deleteSingleToken(webSocket, wsSettings, token.guid)
    }

    const copy = () => {
        copyToken(token.guid)
    }

    const onSizeSelect = (e) => {
        const size = tokenSizes.filter((tokenSize) => tokenSize.id === e.target.value)
        const newToken = {
            ...token,
            size: size[0].id,
            width: size[0].width,
            height: size[0].height,
        }
        const newTokens = game.tokens.map((gtoken) => gtoken.guid === newToken.guid ? newToken : gtoken)
        updateTokens(newTokens)
        pushSingleToken(webSocket,wsSettings,newToken)
    }

    const onMapSelect = (e) => {
        let value = parseInt(e.target.value)
        if (value < 0)
            value = undefined
        updateTokenValue(token.guid, 'mapId', value)
        const newToken = {
            ...token,
            mapId: value,
        }
        pushSingleToken(webSocket,wsSettings,newToken)
    }

    const onToggle = (key) => {
        toggleTokenValue(token.guid, key)
        const newToken = {
            ...token,
            [key]: !token[key],
        }
        pushSingleToken(webSocket,wsSettings,newToken)
    }

    const onTextChange = (key, e) => {
        updateTokenValue(token.guid, key, e.target.value)
        const newToken = {
            ...token,
            [key]: e.target.value,
        }
        pushSingleToken(webSocket,wsSettings,newToken)
    }

    return (
        <div>
            { token ?
                metadata.isHost ?
                    <HostTokenConfig
                        tokenSizes={ tokenSizes }
                        maps={ game.maps }
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

const mapStateToProps = (state) => {
    return {
        game: state.game,
        metadata: state.metadata,
    }
}

const mapDispatchToProps = {
    deleteToken,
    copyToken,
    updateTokenValue,
    toggleTokenValue,
    updateTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenConfig)
