import React, { useState } from 'react'
import TokenView from '../views/TokenView.js'

const initialTokenState = () => {
	return {
		was: undefined,
	}
}

const Token = ({ gameState, token, selectGameToken }) => {
	const [tokenState, setTokenState] = useState(initialTokenState)

	const isMoveTool = () => {
		return gameState.state.tool === 'move'
	}

	const onMouseUp = (e) => {
		if (!isMoveTool())
			return
		if (tokenState.was)
			selectGameToken(token, false, e.ctrlKey)
	}

	const onMouseDown = (e) => {
		if (!isMoveTool())
			return
		setTokenState({
			...tokenState,
			was: token.$selected
		})
		if (token.$selected)
			selectGameToken(token, true, e.ctrlKey)
	}

	const isHost = gameState.isHost
	const mapId = gameState.state.mapId
	let showToken = false

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
		width: token.w || undefined,
		height: token.h || undefined,
	}
	
	//TODO: Verify if we can use a triple equal
	if ([undefined, null].indexOf(token.mapId) >= 0 || mapId == token.mapId) /* eslint-disable-line eqeqeq */
		showToken = true

	return (
		showToken ?
			<TokenView 
				divStyle={ divStyle } 
				token={ token } 
				classes={ classes } 
				imgStyle={ imgStyle } 
				onMouseUp={ onMouseUp } 
				onMouseDown={ onMouseDown }
			/>
		: null
	)
}

export default Token
