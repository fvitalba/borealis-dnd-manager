export interface IIncPoint {
    x: number,
    y: number,
}

export interface IIncPath {
    points: Array<IIncPoint>,
    r: number,
    r2: number,
    tool: number,
    drawColor: string,
    drawSize: number,
}

interface IIncMap {
    id: number,
    name: string,
    backgroundUrl: string,
    x: number,
    y: number,
    width: number,
    height: number,
    drawPaths: Array<IIncPath>,
    fogPaths: Array<IIncPath>,
}

export default IIncMap
