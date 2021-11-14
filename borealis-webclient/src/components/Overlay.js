import React from 'react';

/****************************************************
 * Overlay Component                                *
 *                                                  *
 * This Component contains the users drawings, the  *
 * fog and also the cursor identifiers              *
 ****************************************************/
const Overlay = ({ gameState }) => {
	const maps = gameState.state.maps
	const map = maps[gameState.state.mapId] || undefined
	const width = map ? map.width : gameState.state.width
	const height = map ? map.height : gameState.state.height
	const canvasRef = gameState.overlayRef

	return (
		<canvas 
			id='overlay' 
			ref={ canvasRef } 
			width={ width } 
			height={ height } />
	)
}

export default Overlay
