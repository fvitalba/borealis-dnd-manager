import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Game from '../classes/Game'
import Token from '../classes/Token'
import ControlTool from '../enums/Tool'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { SettingsState } from '../reducers/settingsReducer'
import { TokenState, setTokenOrigin, updateTokens } from '../reducers/tokenReducer'
import TokenView from '../views/TokenView'

interface TokenProps {
    token: Token,
    userType: UserType,
    gameSate: Game,
    tokenState: TokenState,
    settingsState: SettingsState,
    updateTokens: (arg0: Array<Token>) => void,
    setTokenOrigin: (arg0: string, arg1: number, arg2: number) => void,
}

const TokenComponent = ({ token, userType, gameSate, tokenState, settingsState, updateTokens, setTokenOrigin }: TokenProps) => {
    const scaledToken = token.scaleToken(settingsState.deltaX, settingsState.deltaY, settingsState.scale)
    const labelRef = useRef<HTMLLabelElement>(null)
    const [labelPosition, setLabelPosition] = useState({
        top: scaledToken.y + scaledToken.height,
        left: scaledToken.x + Math.floor(scaledToken.width / 2),
    })

    const onMouseDown = () => {
        if (settingsState.tool !== ControlTool.Move)
            return
        if (!scaledToken.isAllowedToMove(userType))
            return
        const updatedTokensWithSelection = tokenState.tokens.map((currToken) => {
            const newToken = currToken
            newToken.selected = newToken.guid === scaledToken.guid
            return newToken
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

    if (scaledToken.imageUrl === '')
        return null

    const classes = scaledToken.generateTokenClasses(userType)
    const divStyle = {
        left: scaledToken.x || 0,
        top: scaledToken.y || 0,
    }
    const imgStyle = {
        width: scaledToken.width || 0,
        height: scaledToken.height || 0,
    }
    const showToken = ((scaledToken.mapId === -1) || (gameSate.currentMapId === scaledToken.mapId))

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

const mapStateToProps = (state: StateInterface) => {
    return {
        gameState: state.game,
        tokenState: state.token,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    updateTokens,
    setTokenOrigin,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenComponent)
