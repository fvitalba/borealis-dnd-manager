import Path from './Path'

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
}

export default Map
