import React from 'react'
import drawImage from '../controllers/drawImage.js'
import Canvas from './Canvas.js'

const Drawing = ({ gameState, setGameState }) => {
	const draw = (ctx) => {
		const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined
		if (!map || !map.drawUrl) {
			return
		}
		drawImage(map.drawUrl, 'drawing', undefined, ctx, undefined, undefined)
	}

	return (
		<Canvas 
			id='drawing' 
			className='passthrough' 
			width={ gameState.state.width } 
			height={ gameState.state.height } 
			draw={ draw } />
	)
}

export default Drawing
