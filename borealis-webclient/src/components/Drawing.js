import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Drawing = ({ game, ref }) => {
	const load = () => {
		const dataUrl = game.map.drawUrl
		if (dataUrl)
			return drawImage(dataUrl, 'drawing')
		else
			return Promise.resolve()
	}

	return (
		<canvas id='drawing' ref={ ref } className='passthrough' />
	)
}

export default Drawing
