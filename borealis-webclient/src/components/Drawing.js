import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Drawing = ({ gameState, canvasRef }) => {
	const width = gameState.state.width
	const height = gameState.state.height

	/*
	//TODO: The following function contains the LOAD function, not the DRAW function
	const draw = (ctx) => {
		const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined
		if (!map || !map.drawUrl) {
			return
		}
		drawImage(map.drawUrl, 'drawing', undefined, ctx, undefined, undefined)
	}
	*/

	return (
		<canvas 
			id='drawing' 
			ref={ canvasRef } 
			className='passthrough' 
			width={ width } 
			height={ height } />
	)
}

export default Drawing
