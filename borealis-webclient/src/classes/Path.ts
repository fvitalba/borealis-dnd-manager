import Point from './Point'
import ControlTool from '../enums/Tool'
import { PathSchema } from '../utils/mongoDbSchemas'

class Path {
    public points: Array<Point>
    public r: number
    public r2: number
    public tool: ControlTool
    public drawColor: string
    public drawSize: number

    public constructor(newPoints: Array<Point>, newR: number, newR2: number, newTool: ControlTool, newDrawColor: string, newDrawSize: number) {
        this.points = newPoints
        this.r = newR
        this.r2 = newR2
        this.tool = newTool
        this.drawColor = newDrawColor
        this.drawSize = newDrawSize
    }

    static fromDbSchema(dbSchemaPath: PathSchema): Path {
        const newPath = new Path(dbSchemaPath.points.map((dbPoint) => Point.fromDbSchema(dbPoint)), dbSchemaPath.r, dbSchemaPath.r2, dbSchemaPath.tool, dbSchemaPath.drawColor, dbSchemaPath.drawSize)
        return newPath
    }
}

export default Path
