import React from 'react'
import Canvas from './Canvas.js'

const Fog = ({ gameState }) => {
	const fogOpacity = gameState.isHost ? gameState.state.fogOpacity : 1
	const width = gameState.state.width
	const height = gameState.state.height

	const getMap = () => {
		if (gameState.state.maps.length === 0)
			return undefined
		const currMap = gameState.state.maps.filter((map) => parseInt(map.$id) === parseInt(gameState.state.mapId))
		return currMap.length > 0 ? currMap[0] : gameState.state.maps[0]
	}
	const map = getMap()

	const renderFogLayer = (ctx) => {
		if (!map) {
			return
		}
		if (!ctx)
			return
		
		ctx.beginPath()
		ctx.globalCompositeOperation = 'destination-over'
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, width, height)
		for(var pathId = 0; pathId < map.fogPaths.length; pathId++) {
			const currPath = map.fogPaths[pathId]
			ereaseFog(ctx, currPath)
			ctx.stroke()
		}
	}

	const ereaseFog = (ctx, currPath) => {
		//ctx.save()
		ctx.beginPath()
		ctx.globalCompositeOperation = 'destination-out'
		var gradient
		for (var pointId = 0; pointId < currPath.length; pointId++) {
			gradient = ctx.createRadialGradient(currPath[pointId].x, currPath[pointId].y, currPath[pointId].r2 || 1, currPath[pointId].x, currPath[pointId].y, currPath[pointId].r*0.75)
			gradient.addColorStop(0, 'rgba(0,0,0,255)')
			gradient.addColorStop(1, 'rgba(0,0,0,0)')
			ctx.fillStyle = gradient
			ctx.fillRect(currPath[pointId].x-currPath[pointId].r, currPath[pointId].y-currPath[pointId].r, currPath[pointId].x+currPath[pointId].r, currPath[pointId].y+currPath[pointId].r)
		}
		//ctx.restore()
	}

	return (
		<Canvas 
			id='fog' 
			className='passthrough' 
			style={{ opacity: fogOpacity }} 
			width={ width } 
			height={ height } 
			draw={ renderFogLayer } />
	)
}

export default Fog
