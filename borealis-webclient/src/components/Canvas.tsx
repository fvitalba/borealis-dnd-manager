import React, { MouseEventHandler, WheelEventHandler } from 'react'
import useCanvas from '../hooks/useCanvas'

interface CanvasProps {
    id: string,
    className: string,
    width: number,
    height: number,
    draw: (arg0: CanvasRenderingContext2D) => void,
    onMouseUp?: MouseEventHandler<HTMLCanvasElement>,
    onMouseDown?: MouseEventHandler<HTMLCanvasElement>,
    onMouseMove?: MouseEventHandler<HTMLCanvasElement>,
    onWheel?: WheelEventHandler<HTMLCanvasElement>,
}

const Canvas = ({ id, className, width, height, draw, onMouseUp, onMouseDown, onMouseMove, onWheel }: CanvasProps) => {
    const canvasRef = useCanvas(draw)

    return (
        <canvas
            id={ id }
            ref={ canvasRef }
            className={ className }
            width={ width }
            height={ height }
            onMouseUp={ onMouseUp }
            onMouseDown={ onMouseDown }
            onMouseMove={ onMouseMove }
            onWheel={ onWheel }
        />
    )
}

export default Canvas
