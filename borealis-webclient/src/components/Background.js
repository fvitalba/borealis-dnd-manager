import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Background = ({ gameState, setGameState, controlPanelState, setControlPanelState, updateTokens }) => {
	//TODO: Verify if component is correct past refactoring
	const resizeCanvases = (w, h) => {
		return new Promise((resolve, reject) => {
			if (!w)
				w = (gameState.map && gameState.map.w) || window.innerWidth
			if (!h)
				h = (gameState.map && gameState.map.h) || window.innerHeight
			let canvases = document.querySelectorAll('canvas')
			const noChangeNeeded = Array.from(canvases).reduce((prev, canv) => (
				prev && canv.width === w && canv.height === h
			), true)
			if (noChangeNeeded)
				resolve(w, h)
			else
				setGameState({
					...gameState,
					state: {
						...gameState,
						width: w,
						height: h,
						isFogLoaded: false,
					}
				}, () => {
					canvases.forEach(canvas => {
						canvas.width = w
						canvas.height = h
					})
					resolve(w, h)
				})
		})
	}

	const load = () => {
		if (!gameState.map) {
			console.error('No map is selected.')
			return Promise.reject()
		}
		//return drawImage(gameState.map.url, null /* which */, gameState, ref.current.getContext('2d'), resizeCanvases)
	}

	const handleOnClick = (e) => {
		setControlPanelState({
			...controlPanelState,
			toggleOnMaps: false,
			toggleOnTokens: false,
		})
		updateTokens(token => token.$selected = false)
	}

	return (
		<canvas id='background' onClick={ handleOnClick } />
	)
}

export default Background
