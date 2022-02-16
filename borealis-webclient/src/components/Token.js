import React from 'react'
import { connect } from 'react-redux'
import { setTokenOrigin, toggleTokenValue } from '../reducers/gameReducer'
import TokenView from '../views/TokenView.js'

const Token = ({ token, isHost, game, settings, toggleTokenValue, setTokenOrigin }) => {
	const isMoveTool = () => {
		return settings.tool === 'move'
	}

	const onMouseDown = (e) => {
		if (!isMoveTool())
			return
		if (!token.$selected)
			toggleTokenValue(token.guid, '$selected')
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
	toggleTokenValue,
	setTokenOrigin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Token)
