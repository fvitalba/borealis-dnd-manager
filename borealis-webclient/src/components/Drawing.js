import React from 'react'
import drawImage from '../controllers/drawImage.js'

const Drawing = ({ gameState, canvasRef }) => {
	const width = gameState.state.width
	const height = gameState.state.height

	/*
	//TODO: The following function contains the LOAD function, not the DRAW function
	const draw = (ctx) => {
		const map = gameState.state.maps ? gameState.state.maps[gameState.state.mapId] : undefined
		if (!map || !map.drawUrl) {
			return
		}
		drawImage(map.drawUrl, 'drawing', undefined, ctx, undefined, undefined)
	}
	*/
	const getDrawingContext = () => {
		if (!gameState.drawingRef)
			return undefined
		if (!gameState.drawingRef.current)
			return undefined
		return gameState.drawingRef.current.getContext('2d')
	}

	const getMap = () => {
		if (gameState.state.maps.length === 0)
			return undefined
		const map = gameState.state.maps.filter(map => map.$id === gameState.state.mapId)
		return map.length > 0 ? map[0] : gameState.state.maps[0]
	}

	const map = getMap()
	const drawCtx = getDrawingContext()

	if (map && drawCtx) {
		//drawCtx.clearRect(0, 0, gameState.state.width, gameState.state.height)
		if (map.drawUrl) {
			let img = new Image()
			img.onload = function(){
				drawCtx.drawImage(img, 0, 0, gameState.state.width, gameState.state.height)
			}
			img.src = map.drawUrl
		}
	}
	
	return (
		<canvas 
			id='drawing' 
			ref={ canvasRef } 
			className='passthrough' 
			width={ width } 
			height={ height } />
	)
}

export default Drawing
