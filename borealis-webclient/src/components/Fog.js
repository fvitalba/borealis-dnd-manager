import React from 'react'
import Canvas from './Canvas.js'

const Fog = ({ gameState }) => {
	const fogOpacity = gameState.metadata.isHost ? gameState.settings.fogOpacity : 1
	const width = gameState.game.width
	const height = gameState.game.height

	const getMap = () => {
		if (gameState.game.maps.length === 0)
			return undefined
		const currMap = gameState.game.maps.filter((map) => parseInt(map.$id) === parseInt(gameState.game.mapId))
		return currMap.length > 0 ? currMap[0] : gameState.game.maps[0]
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
		for(let pathId = 0; pathId < map.fogPaths.length; pathId++) {
			const currPath = map.fogPaths[pathId]
			ereaseFog(ctx, currPath)
			ctx.stroke()
		}
	}

	const ereaseFog = (ctx, currPath) => {
		ctx.beginPath()
		ctx.globalCompositeOperation = 'destination-out'
		let gradient
		for (let pointId = 0; pointId < currPath.length; pointId++) {
			gradient = ctx.createRadialGradient(currPath[pointId].x, currPath[pointId].y, currPath[pointId].r2 || 1, currPath[pointId].x, currPath[pointId].y, currPath[pointId].r*0.75)
			gradient.addColorStop(0, 'rgba(0,0,0,255)')
			gradient.addColorStop(1, 'rgba(0,0,0,0)')
			ctx.fillStyle = gradient
			ctx.fillRect(currPath[pointId].x-currPath[pointId].r, currPath[pointId].y-currPath[pointId].r, currPath[pointId].x+currPath[pointId].r, currPath[pointId].y+currPath[pointId].r)
		}
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
