import { PointSchema } from '../utils/mongoDbSchemas'

class Point {
    public x: number
    public y: number

    public constructor(newX: number, newY: number) {
        this.x = newX
        this.y = newY
    }

    static fromDbSchema(dbPoint: PointSchema): Point {
        return new Point(dbPoint.x, dbPoint.y)
    }

    public translatePoint(offsetX: number, offsetY: number, scale: number): Point {
        return new Point(this.x * scale + offsetX, this.y * scale + offsetY)
    }
}

export default Point
