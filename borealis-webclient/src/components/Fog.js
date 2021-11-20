import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Fog = ({ gameState, canvasRef }) => {
	const fogOpacity = gameState.isHost ? gameState.state.fogOpacity : 1
	const width = gameState.state.width
	const height = gameState.state.height

	/*
	const load = () => {
		//TODO: this probably isn't working
		const dataUrl = map.fogUrl
		if (dataUrl) {
			return new Promise((resolve, reject) => {
			return drawImage(dataUrl, 'fog')
				.then(resolve)
				.catch(() => fill().then(resolve))
			})
		} else
			return fill()
	}
	*/

	return (
		<canvas 
			id='fog' 
			ref={ canvasRef } 
			className='passthrough' 
			style={{ opacity: fogOpacity }} 
			width={ width } 
			height={ height } />
	)
}

export default Fog
