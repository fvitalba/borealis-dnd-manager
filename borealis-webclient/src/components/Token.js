import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setTokenOrigin, updateTokens } from '../reducers/gameReducer'
import TokenView from '../views/TokenView'

const Token = ({ token, isHost, game, settings, updateTokens, setTokenOrigin }) => {
    const labelRef = useRef(null)
    const [labelPosition, setLabelPosition] = useState({
        top: token.y + token.height,
        left: token.x + Math.floor(token.width / 2),
    })

    const isMoveTool = () => {
        return settings.tool === 'move'
    }

    const onMouseDown = () => {
        if (!isMoveTool())
            return
        if (!isHost && (!token.pc))
            return
        const updatedTokensWithSelection = game.tokens.map((currToken) => {
            return {
                ...currToken,
                selected: currToken.guid === token.guid ? true : false
            }
        })
        updateTokens(updatedTokensWithSelection)
        setTokenOrigin(token.guid, token.x, token.y)
    }

    useEffect(() => {
        if (labelRef.current) {
            setLabelPosition({
                top: token.y + token.height,
                left: token.x + Math.floor(token.width / 2) - Math.floor(labelRef.current.offsetWidth / 2),
            })
        }
    }, [ labelRef.current, token.x, token.y, token.width, token.height, token.showLabel ])

    if (!token.url || !token.url.trim())
        return null

    const hiddenClass = isHost ? 'opacity-50' : 'invisible'
    const classes = [
        'token',
        token.ko && 'token-dead',
        token.pc ? 'token-pc' : 'token-npc',
        isHost && !token.pc && 'token-grabbable',
        token.hidden && hiddenClass,
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
                isSelected={ token.selected }
                classes={ classes }
                imgStyle={ imgStyle }
                labelRef={ labelRef }
                labelPosition={ labelPosition }
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
