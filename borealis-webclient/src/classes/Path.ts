import Point from './Point'

class Path {
    public points: Array<Point>

    public constructor(newPoints: Array<Point>) {
        this.points = newPoints
    }
}

export default Path
