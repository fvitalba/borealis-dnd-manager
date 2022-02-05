import React from 'react'
import useCanvas from '../controllers/useCanvas.js'

const Canvas = ({ id, draw, options, ...rest }) => {
	const canvasRef = useCanvas(draw)
	
	return (
		<canvas id={ id } ref={ canvasRef } { ...rest } />
	)
}

export default Canvas
