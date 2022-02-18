import React from 'react'
import useCanvas from '../hooks/useCanvas'

const Canvas = ({ id, draw, ...rest }) => {
    const canvasRef = useCanvas(draw)

    return (
        <canvas id={ id } ref={ canvasRef } { ...rest } />
    )
}

export default Canvas
