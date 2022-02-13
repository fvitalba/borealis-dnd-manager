import React from 'react'
import { connect } from 'react-redux'
import { updateTokens } from '../reducers/gameReducer'
import drawImage from '../controllers/drawImage.js'
import Canvas from './Canvas.js'


const Background = ({ game, updateTokens }) => {
	const map = game.maps ? game.maps[game.mapId] : undefined

	const draw = (ctx) => {
		if (!map) {
			return
		}
		drawImage(map.imageUrl, map.name, map, ctx, null)
	}

	const handleOnClick = (e) => {
		//TODO: Handle onClick of Maps
		/*
		setControlPanelState({
			...controlPanelState,
			toggleOnMaps: false,
			toggleOnTokens: false,
		}, () => updateTokens(token => token.$selected = false))
		*/
	}

	return (
		<Canvas 
			id='background' 
			onClick={ handleOnClick } 
			width={ map ? map.width : 0 } 
			height={ map ? map.height : 0 } 
			draw={ draw } />
	)
}

const mapStateToProps = (state) => {
	return {
		game: state.game,
	}
}

const mapDispatchToProps = {
	updateTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)
