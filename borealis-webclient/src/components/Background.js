import React from 'react'
import drawImage from '../controllers/drawImage.js'
import Canvas from './Canvas.js'

const Background = ({ gameState, setGameState, controlPanelState, setControlPanelState, updateTokens, updateMap }) => {
	const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined

	//TODO: Verify that this is actually needed
	/*
	const resizeCanvases = (w, h) => {
		return new Promise((resolve, reject) => {
			if (!w)
				w = (map && map.width) || window.innerWidth
			if (!h)
				h = (map && map.height) || window.innerHeight
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
						...gameState.state,
						width: w,
						height: h,
						isFogLoaded: false,
					}
				})
		})
	}
	*/

	const draw = (ctx) => {
		if (!map) {
			return
		}
		drawImage(map.url, map.name, map, ctx, null, updateMap)
	}

	const handleOnClick = (e) => {
		setControlPanelState({
			...controlPanelState,
			toggleOnMaps: false,
			toggleOnTokens: false,
		}, () => updateTokens(token => token.$selected = false))
	}

	return (
		<Canvas 
			id='background' 
			onClick={ handleOnClick } 
			width={ map ? map.width : 0 } 
			height={ map ? map.height : 0 } 
			draw={ draw } />
	)
}

export default Background
