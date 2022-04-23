import { GameSchema } from '../utils/mongoDbSchemas'
import Map from './Map'

class Game {
    public currentMapId: number
    public version: number
    public width: number
    public height: number
    public fogEnabled: boolean
    public tokenSelected: boolean

    public constructor(newCurrentMapId?: number, newVersion?: number, newWidth?: number, newHeight?: number, newFogEnabled?: boolean) {
        this.currentMapId = newCurrentMapId ? newCurrentMapId : -1
        this.version = newVersion ? newVersion : -1
        this.width = newWidth ? newWidth : window.innerWidth
        this.height = newHeight ? newHeight : window.innerHeight
        this.fogEnabled = newFogEnabled ? newFogEnabled : false
        //TODO: Enable this and disable this when selecting/unselecting tokens
        this.tokenSelected = false
    }

    static fromDbSchema(dbGame: GameSchema): Game {
        const newGame = new Game(dbGame.currentMapId, dbGame.version, dbGame.width, dbGame.height, dbGame.fogEnabled)
        return newGame
    }

    public getCurrentMap(maps: Array<Map>): Map {
        const currentMap = maps.filter((map: Map) => map.id === this.currentMapId)
        if (currentMap.length > 0)
            return currentMap[0]
        else
            return new Map(-1,'','',0,0,0,0)
    }
}

export default Game
