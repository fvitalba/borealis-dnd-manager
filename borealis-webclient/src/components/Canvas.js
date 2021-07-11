import React from 'react'
import useCanvas from '../controllers/useCanvas.js'

const Canvas = ({ id, draw, options, ...rest }) => {
	//const { context, ...moreConfig } = options
	const canvasRef = useCanvas(draw/*, {context}*/)
	
	return (
		<canvas id={ id } ref={ canvasRef } { ...rest } />
	)
}

export default Canvas
