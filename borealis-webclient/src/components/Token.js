import React from 'react'
import { connect } from 'react-redux'
import { setTokenOrigin, updateTokens } from '../reducers/gameReducer'
import TokenView from '../views/TokenView.js'

const Token = ({ token, isHost, game, settings, updateTokens, setTokenOrigin }) => {
    const isMoveTool = () => {
        return settings.tool === 'move'
    }

    const onMouseDown = (e) => {
        if (!isMoveTool())
            return
        if (!isHost && (!token.pc))
            return
        const updatedTokensWithSelection = game.tokens.map((currToken) => {
            return {
                ...currToken,
                $selected: currToken.guid === token.guid ? true : false
            }
        })
        updateTokens(updatedTokensWithSelection)
        setTokenOrigin(token.guid, token.x, token.y)
    }

    if (!token.url || !token.url.trim())
        return null

    const classes = [
        'token',
        token.ko && 'dead',
        token.pc ? 'pc' : 'npc',
        token.$selected && 'selected',
        isHost && !token.pc && 'grabbable',
    ]
    const divStyle = {
        left: token.x || 0,
        top: token.y || 0,
    }
    const imgStyle = {
        width: token.width || undefined,
        height: token.height || undefined,
    }
    const showToken = ((token.mapId === undefined) || (game.mapId === token.mapId))

    return (
        showToken ?
            <TokenView 
                divStyle={ divStyle } 
                token={ token } 
                classes={ classes } 
                imgStyle={ imgStyle } 
                onMouseDown={ onMouseDown }
            />
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    updateTokens,
    setTokenOrigin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Token)
