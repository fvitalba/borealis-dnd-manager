import React, { useState } from 'react';

const initialOverlayState = () => {
	return ({
		lastX: 0,
		lastY: 0,
	})
}

const Overlay = ({ gameState, canvasRef, updateMap, websocket }) => {
	const [overlayState, setOverlayState] = useState(initialOverlayState)

	const drawingControl = () => {
		return gameState.drawingRef.current.getContext('2d')
	}
	const fogControl = () => {
		return gameState.fogRef.current.getContext('2d')
	}

	const fogErase = (x, y, r, r2, noEmit) => {
		const ctx = fogControl
		if (!r)
			r = gameState.state.fogRadius
		ctx.globalCompositeOperation = 'destination-out'
		let gradient = ctx.createRadialGradient(x, y, r2||1, x, y, r*0.75)
		gradient.addColorStop(0, 'rgba(0,0,0,255)')
		gradient.addColorStop(1, 'rgba(0,0,0,0)')
		ctx.fillStyle = gradient
		ctx.fillRect(x-r, y-r, x+r, y+r)
		ctx.globalCompositeOperation = 'destination-over'
		updateMap(map => map.$fogChangedAt = new Date())
		if (!noEmit)
			websocket.pushFogErase(x, y, r, r2)
	}

	const draw = (x, y, opts, noEmit) => {
		const ctx = drawingControl
		opts = Object.assign({
			x: x,
			y: y,
			color: gameState.state.drawColor,
			size: gameState.state.drawSize,
			x0: overlayState.lastX || x,
			y0: overlayState.lastY || y,
		}, opts)
		ctx.beginPath()
		ctx.moveTo(opts.x0, opts.y0)
		ctx.lineTo(x, y)
		ctx.strokeStyle = opts.color
		ctx.lineWidth = opts.size
		ctx.stroke()
		if (!noEmit) {
			setOverlayState({
				lastX: x,
				lastY: y
			})
			websocket.pushDraw(opts)
		}
	}

	const erase = (x, y, r, noEmit) => {
		const radius = r || gameState.state.drawSize
		drawingControl.clearRect(x-radius, y-radius, radius*2, radius*2)
		if (!noEmit)
			websocket.pushErase(x, y, radius)
	}

	const isEraser = () => {
		return gameState.state.subtool === 'ereaser'
	}

	const drawOrErase = (x, y) => {
		if (isEraser())
			erase(x, y)
		else
			draw(x, y)
		updateMap(map => map.$drawChangedAt = new Date())
	}

	const setPointerOutline = (x, y, color, radius) => {
		if (color == null)
			return
		const ctx = canvasRef.current.getContext('2d')
		ctx.strokeStyle = color
		ctx.lineWidth = '3'
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2*Math.PI)
		ctx.stroke()
		ctx.closePath()
	}

	let canvasClass
    switch (gameState.state.tool) {
		case 'fog':
		case 'draw':
			canvasClass = ''
			break
		default:
			canvasClass = 'gone'
    }

	return (
		<canvas id='overlay' ref={ canvasRef } className={ canvasClass } width={ gameState.state.width } height={ gameState.state.height } />
	)
}

export default Overlay
