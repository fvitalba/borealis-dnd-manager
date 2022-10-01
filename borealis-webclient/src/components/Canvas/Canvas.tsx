import React from 'react'
import useCanvas from '@/hooks/useCanvas'
import { CanvasProps } from './types'

const Canvas = ({ id, className, style, width, height, draw, onMouseUp, onMouseDown, onMouseMove, onWheel }: CanvasProps) => {
    const canvasRef = useCanvas(draw)

    return (
        <canvas
            id={ id }
            ref={ canvasRef }
            className={ className }
            width={ width }
            height={ height }
            style={ style }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onWheel={ onWheel }
        />
    )
}

export default Canvas
