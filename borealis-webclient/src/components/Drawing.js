import React from 'react'
import Canvas from './Canvas.js'

const Drawing = ({ gameState }) => {
	const width = gameState.state.width
	const height = gameState.state.height

	const getMap = () => {
		if (gameState.state.maps.length === 0)
			return undefined
		const currMap = gameState.state.maps.filter((map) => parseInt(map.$id) === parseInt(gameState.state.mapId))
		return currMap.length > 0 ? currMap[0] : gameState.state.maps[0]
	}
	const map = getMap()

	const renderDrawingLayer = (ctx) => {
		if (!map) {
			return
		}
		if (!ctx)
			return
		
		ctx.beginPath()
		ctx.clearRect(0, 0, width, height)
		for(var pathId = 0; pathId < map.drawPaths.length; pathId++) {
			const currPath = map.drawPaths[pathId]
			const tool = currPath.length > 0 ? currPath[0].tool : ''
			switch (tool) {
				case 'draw': 
					draw(ctx, currPath)
					break;
				case 'erease':
					erease(ctx, currPath)
					break;
				default:
					break;
			}
			ctx.stroke()
		}
	}

	const draw = (ctx, currPath) => {
		ctx.globalCompositeOperation = 'source-over'
		ctx.beginPath()
		for (var pointId = 0; pointId < currPath.length; pointId++) {
			ctx.lineCap = 'round'
			ctx.fillStyle = currPath[pointId].drawColor
			ctx.lineWidth = currPath[pointId].drawSize
			ctx.strokeStyle = currPath[pointId].drawColor
			if (pointId === 0) {
				ctx.moveTo(currPath[pointId].x, currPath[pointId].y)
			} else {
				ctx.lineTo(currPath[pointId].x, currPath[pointId].y)
			}
		}
	}

	const erease = (ctx, currPath) => {
		ctx.globalCompositeOperation = 'destination-out'
		ctx.beginPath()
		for (var pointId = 0; pointId < currPath.length; pointId++) {
			ctx.lineCap = 'round'
			ctx.lineWidth = currPath[pointId].drawSize
			if (pointId === 0) {
				ctx.moveTo(currPath[pointId].x, currPath[pointId].y)
			} else {
				ctx.lineTo(currPath[pointId].x, currPath[pointId].y)
			}
		}
	}
	
	return (
		<Canvas 
			id='drawing' 
			className='passthrough' 
			width={ width } 
			height={ height } 
			draw={ renderDrawingLayer } />
	)
}

export default Drawing
