import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setTokenOrigin, updateTokens } from '../reducers/gameReducer'
import TokenView from '../views/TokenView'

const Token = ({ token, isHost, game, settings, updateTokens, setTokenOrigin }) => {
    const scaledToken = {
        ...token,
        x: token.x * settings.scale + settings.deltaX,
        y: token.y * settings.scale + settings.deltaY,
        width: token.width * settings.scale,
        height: token.height * settings.scale,
    }
    const labelRef = useRef(null)
    const [labelPosition, setLabelPosition] = useState({
        top: scaledToken.y + scaledToken.height,
        left: scaledToken.x + Math.floor(scaledToken.width / 2),
    })

    const isMoveTool = () => {
        return settings.tool === 'move'
    }

    const onMouseDown = () => {
        if (!isMoveTool())
            return
        if (!isHost && (!scaledToken.pc))
            return
        const updatedTokensWithSelection = game.tokens.map((currToken) => {
            return {
                ...currToken,
                selected: currToken.guid === scaledToken.guid ? true : false
            }
        })
        updateTokens(updatedTokensWithSelection)
        setTokenOrigin(scaledToken.guid, token.x, token.y)
    }

    useEffect(() => {
        if (labelRef.current) {
            setLabelPosition({
                top: scaledToken.y + scaledToken.height,
                left: scaledToken.x + Math.floor(scaledToken.width / 2) - Math.floor(labelRef.current.offsetWidth / 2),
            })
        }
    }, [ labelRef.current, scaledToken.x, scaledToken.y, scaledToken.width, scaledToken.height, scaledToken.showLabel ])

    if (!scaledToken.url || !scaledToken.url.trim())
        return null

    const hiddenClass = isHost ? 'opacity-50' : 'invisible'
    const classes = [
        'token',
        scaledToken.ko && 'token-dead',
        scaledToken.pc ? 'token-pc' : 'token-npc',
        isHost && !scaledToken.pc && 'token-grabbable',
        scaledToken.hidden && hiddenClass,
    ]
    const divStyle = {
        left: scaledToken.x || 0,
        top: scaledToken.y || 0,
    }
    const imgStyle = {
        width: scaledToken.width || undefined,
        height: scaledToken.height || undefined,
    }
    const showToken = ((scaledToken.mapId === undefined) || (game.mapId === scaledToken.mapId))

    return (
        showToken ?
            <TokenView
                divStyle={ divStyle }
                token={ scaledToken }
                isSelected={ scaledToken.selected }
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
