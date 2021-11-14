import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Fog = ({ gameState, canvasRef }) => {
	const fogOpacity = gameState.isHost ? gameState.state.fogOpacity : 1
	const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined
	const width = map ? map.width : gameState.state.width
	const height = map ? map.height : gameState.state.height

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

	return map ? (
		<canvas 
			id={ map ? `fog_${map.$id}` : 'fog' } 
			ref={ canvasRef } 
			className='passthrough' 
			style={{ opacity: fogOpacity }} 
			width={ width } 
			height={ height } />
	) : null
}

export default Fog
