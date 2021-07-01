import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Background = ({ game, ref }) => {
	const resizeCanvases = (w, h) => {
		return new Promise((resolve, reject) => {
			if (!w)
				w = (game.map && game.map.w) || window.innerWidth
			if (!h)
				h = (game.map && game.map.h) || window.innerHeight
			let canvases = document.querySelectorAll('canvas')
			const noChangeNeeded = Array.from(canvases).reduce((prev, canv) => (
				prev && canv.width === w && canv.height === h
			), true)
			if (noChangeNeeded)
				resolve(w, h)
			else
				game.setState({ w: w, h: h, isFogLoaded: false }, () => {
					canvases.forEach(canvas => {
						canvas.width = w
						canvas.height = h
					})
					resolve(w, h)
				})
		})
	}

	const load = () => {
		if (!game.map) {
			console.error('No map is selected.')
			return Promise.reject()
		}
		return drawImage(game.map.url, null /* which */, game, ref.current.getContext('2d'), resizeCanvases)
	}

	const handleOnClick = (e) => {
		game.cpRef.current.setState({
			toggleOnMaps: false,
			toggleOnTokens: false
		})
		game.updateTokens(token => token.$selected = false)
	}

	return (
		<canvas id='background' ref={ ref } onClick={ handleOnClick } />
	)
}

export default Background
