import Path from './Path'
import Rectangle from './Rectangle'

class Map {
    public id: number
    public name: string
    public backgroundUrl: string
    public x: number
    public y: number
    public width: number
    public height: number
    public drawPaths: Array<Path>
    public fogPaths: Array<Path>

    public constructor(newId: number, newName: string, newBackgroundUrl: string, newX: number, newY: number, newWidth: number, newHeight: number, newDrawPaths?: Array<Path>, newFogPaths?:Array<Path>) {
        this.id = newId
        this.name = newName
        this.backgroundUrl = newBackgroundUrl
        this.x = newX
        this.y = newY
        this.width = newWidth
        this.height = newHeight
        this.drawPaths = newDrawPaths ? newDrawPaths : new Array<Path>()
        this.fogPaths = newFogPaths ? newFogPaths : new Array<Path>()
    }

    public isEmpty(): boolean {
        return this.id < 0
    }

    public getScaledAndOffsetSize(offsetX: number, offsetY: number, scale: number): Rectangle {
        const scaledAndOffsetSize = new Rectangle(this.x + offsetX, this.y + offsetY, this.width * scale, this.height * scale)
        return scaledAndOffsetSize
    }
}

export default Map
