import { MouseEventHandler, WheelEventHandler } from 'react'

export interface CanvasProps {
    id: string,
    className: string,
    style?: object,
    width: number,
    height: number,
    draw: (canvasContext: CanvasRenderingContext2D) => void,
    onMouseUp?: MouseEventHandler<HTMLCanvasElement>,
    onMouseDown?: MouseEventHandler<HTMLCanvasElement>,
    onMouseMove?: MouseEventHandler<HTMLCanvasElement>,
    onWheel?: WheelEventHandler<HTMLCanvasElement>,
}
