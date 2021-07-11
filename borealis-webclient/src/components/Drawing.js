import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Drawing = ({ gameState, ref }) => {
	//TODO: Verify if component is correct past refactoring
	const load = () => {
		const dataUrl = gameState.map.drawUrl
		if (dataUrl)
			return drawImage(dataUrl, 'drawing')
		else
			return Promise.resolve()
	}

	return (
		<canvas id='drawing' ref={ ref } className='passthrough' width={ gameState.state.width } height={ gameState.state.height } />
	)
}

export default Drawing
