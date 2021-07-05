import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Fog = ({ game, ref, width, height }) => {
	//TODO: Verify if component is correct past refactoring
	const fogOpacity = game.isHost ? game.state.fogOpacity : 1

	const fill = () => {
		const ctx = ref.current.getContext('2d')
		ctx.globalCompositeOperation = 'destination-over'
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, width, height)
		game.updateMap(map => map.$fogChangedAt = new Date())
		return Promise.resolve()
	}

	const load = () => {
		const dataUrl = game.map.fogUrl
		if (dataUrl) {
			return new Promise((resolve, reject) => {
			return drawImage(dataUrl, 'fog')
				.then(resolve)
				.catch(() => fill().then(resolve))
			})
		} else
			return fill()
	}

	return (
		<canvas id='fog' ref={ ref } className='passthrough' style={{ opacity: fogOpacity }} />
	)
}

export default Fog