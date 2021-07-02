import React, { useState } from 'react';

const initialOverlayState = () => {
	return ({
		lastX: 0,
		lastY: 0,
	})
}

const Overlay = ({ game, canvasRef }) => {
	const [overlayState, setOverlayState] = useState(initialOverlayState)

	const drawingControl = () => {
		return game.drawingRef.current.getContext('2d')
	}
	const fogControl = () => {
		return game.fogRef.current.getContext('2d')
	}

	const fogErase = (x, y, r, r2, noEmit) => {
		const ctx = fogControl
		if (!r)
			r = game.state.fogRadius
		ctx.globalCompositeOperation = 'destination-out'
		let gradient = ctx.createRadialGradient(x, y, r2||1, x, y, r*0.75)
		gradient.addColorStop(0, 'rgba(0,0,0,255)')
		gradient.addColorStop(1, 'rgba(0,0,0,0)')
		ctx.fillStyle = gradient
		ctx.fillRect(x-r, y-r, x+r, y+r)
		ctx.globalCompositeOperation = 'destination-over'
		game.updateMap(map => map.$fogChangedAt = new Date())
		if (!noEmit)
			game.websocket.pushFogErase(x, y, r, r2)
	}

	const draw = (x, y, opts, noEmit) => {
		const ctx = drawingControl
		opts = Object.assign({
			x: x,
			y: y,
			color: game.state.drawColor,
			size: game.state.drawSize,
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
			game.websocket.pushDraw(opts)
		}
	}

	const erase = (x, y, r, noEmit) => {
		const radius = r || game.state.drawSize
		drawingControl.clearRect(x-radius, y-radius, radius*2, radius*2)
		if (!noEmit)
			game.websocket.pushErase(x, y, radius)
	}

	const isEraser = () => {
		return game.state.subtool === 'ereaser'
	}

	const drawOrErase = (x, y) => {
		if (isEraser())
			erase(x, y)
		else
			draw(x, y)
		game.updateMap(map => map.$drawChangedAt = new Date())
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
    switch (game.state.tool) {
		case 'fog':
		case 'draw':
			canvasClass = ''
			break
		default:
			canvasClass = 'gone'
    }

	return (
		<canvas id='overlay' ref={ canvasRef } className={ canvasClass } />
	)
}

export default Overlay
