import React from 'react'
import drawImage from '../controllers/drawImage.js'
import Canvas from './Canvas.js'

const Background = ({ gameState, setGameState, controlPanelState, setControlPanelState, updateTokens, updateMap }) => {
	const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined
	console.info('redraw background')
	console.info('map', map)
	
	//TODO: Verify that this is actually needed
	/*
	const resizeCanvases = (w, h) => {
		return new Promise((resolve, reject) => {
			if (!w)
				w = (map && map.w) || window.innerWidth
			if (!h)
				h = (map && map.h) || window.innerHeight
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
		console.info('draw function from background')
		console.info('gameState', gameState)
		console.info('map', map)
		if (!map) {
			console.error('No map is selected.')
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
			width={ map ? map.w : 0 } 
			height={ map ? map.h : 0 } 
			draw={ draw } />
	)
}

export default Background
