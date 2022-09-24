import { MouseEventHandler, WheelEventHandler } from 'react'

export interface CanvasProps {
    id: string,
    className: string,
    style?: object,
    width: number,
    height: number,
    draw: (arg0: CanvasRenderingContext2D) => void,
    onMouseUp?: MouseEventHandler<HTMLCanvasElement>,
    onMouseDown?: MouseEventHandler<HTMLCanvasElement>,
    onMouseMove?: MouseEventHandler<HTMLCanvasElement>,
    onWheel?: WheelEventHandler<HTMLCanvasElement>,
}
