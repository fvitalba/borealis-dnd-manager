import React from 'react'
import { connect } from 'react-redux'
import { deleteToken, copyToken, updateTokenValue, toggleTokenValue, updateTokens } from '../reducers/gameReducer'
import { pushSingleToken, deleteSingleToken, useWebSocket } from '../hooks/useSocket'
import HostTokenConfig from '../views/HostTokenConfigView'
import GuestTokenConfigView from '../views/GuestTokenConfigView'

const TokenConfig = ({ token, game, metadata, deleteToken, copyToken, updateTokenValue, toggleTokenValue }) => {
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

    const onIntegerChange = (key, e) => {
        updateTokenValue(token.guid, key, parseInt(e.target.value) || undefined)
        const newToken = {
            ...token,
            [key]: parseInt(e.target.value) || undefined,
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
                        maps={ game.maps }
                        token={ token }
                        copy={ copy }
                        onToggle={ onToggle }
                        selectToken={ selectToken }
                        onTextChange={ onTextChange }
                        onIntegerChange={ onIntegerChange }
                        onMapSelect={ onMapSelect }
                        deleteToken={ deleteCurrToken }
                    />
                    :
                    <GuestTokenConfigView
                        token={ token }
                        onTextChange={ onTextChange }
                        onIntegerChange={ onIntegerChange }
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
