import React from 'react'
import TokenView from '../views/TokenView.js'

const Token = ({ gameState, token, selectGameToken }) => {
	const isMoveTool = () => {
		return gameState.state.tool === 'move'
	}

	const onMouseDown = (e) => {
		if (!isMoveTool())
			return
		//TODO: Fix multi token selection
		if (!token.$selected)
			selectGameToken(token, true, e.metaKey)
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
		width: token.width || undefined,
		height: token.height || undefined,
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
				onMouseDown={ onMouseDown }
			/>
		: null
	)
}

export default Token
