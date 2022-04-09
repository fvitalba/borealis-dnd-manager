import ControlTool from '../enums/Tool'

class Point {
    public x: number
    public y: number
    public r: number
    public r2: number
    public tool: ControlTool
    public drawColor: string
    public drawSize: number

    public constructor(newX: number, newY: number, newR: number, newR2: number, newTool: ControlTool, newDrawColor: string, newDrawSize: number) {
        this.x = newX
        this.y = newY
        this.r = newR
        this.r2 = newR2
        this.tool = newTool
        this.drawColor = newDrawColor
        this.drawSize = newDrawSize
    }
}

export default Point
