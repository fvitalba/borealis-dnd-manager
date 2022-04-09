class Game {
    public currentMapId: number
    public version: number
    public width: number
    public height: number
    public fogEnabled: boolean

    public constructor(newCurrentMapId?: number, newVersion?: number, newWidth?: number, newHeight?: number, newFogEnabled?: boolean) {
        this.currentMapId = newCurrentMapId ? newCurrentMapId : -1
        this.version = newVersion ? newVersion : -1
        this.width = newWidth ? newWidth : window.innerWidth
        this.height = newHeight ? newHeight : window.innerHeight
        this.fogEnabled = newFogEnabled ? newFogEnabled : false
    }
}

export default Game
