import React from 'react';

/****************************************************
 * Overlay Component                                *
 *                                                  *
 * This Component contains the users drawings, the  *
 * fog and also the cursor identifiers              *
 ****************************************************/
const Overlay = ({ gameState }) => {
	const maps = gameState.game.maps
	const map = maps[gameState.game.mapId] || undefined
	const width = map ? map.width : gameState.game.width
	const height = map ? map.height : gameState.game.height
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
