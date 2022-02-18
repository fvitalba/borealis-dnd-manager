import React from 'react'
import { connect } from 'react-redux'
import { deleteToken, copyToken, updateTokenValue, toggleTokenValue, updateTokens } from '../reducers/gameReducer.js'
import HostTokenConfig from '../views/HostTokenConfigView.js'
import GuestTokenConfigView from '../views/GuestTokenConfigView.js'

const TokenConfig = ({ token, game, metadata, deleteToken, copyToken, updateTokenValue, toggleTokenValue }) => {
    const selectToken = (token, tokenSelected) => {
        if (!token.pc && !metadata.isHost)
            return
        toggleTokenValue(token.guid, '$selected')
    }

    const deleteCurrToken = () => {
        deleteToken(token.guid)
    }

    const copy = () => {
        copyToken(token.guid)
    }

    const onMapSelect = (e) => {
        let value = parseInt(e.target.value)
        if (value < 0)
            value = undefined
        updateTokenValue(token.guid, 'mapId', value)
    }

    const onToggle = (key) => {
        toggleTokenValue(token.guid, key)
    }

    const onIntegerChange = (key, e) => {
        updateTokenValue(token.guid, key, parseInt(e.target.value) || undefined)
    }

    const onTextChange = (key, e) => {
        updateTokenValue(token.guid, key, e.target.value)
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
