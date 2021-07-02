import React, { useState } from 'react'
import TokenView from '../views/TokenView'

const Token = ({ game, token }) => {
	const [was, setWas] = useState(false)

	const isMoveTool = () => {
		return game.state.tool === 'move'
	}

	const onMouseUp = (e) => {
		if (!isMoveTool())
			return
		if (was)
			game.selectToken(token, false, e.ctrlKey)
	}

	const onMouseDown = (e) => {
		if (!isMoveTool())
			return
		setWas(token.$selected)
		if (token.$selected)
			game.selectToken(token, true, e.ctrlKey)
	}

	const isHost = game.isHost
	const mapId = game.state.mapId
	let showToken = false

	if (!token.url || !token.url.trim())
		return null
	
		const classes = ['token',
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
