import guid from '../utils/guid.js'
import TokenCondition from '../enums/TokenCondition'
import TokenSize from '../enums/TokenSize'
import TokenType from '../enums/TokenType'

class Token {
    public guid: string
    public name: string
    public imageUrl: string
    public mapId: number
    public x: number
    public y: number
    public condition: TokenCondition
    public type: TokenType
    public size: TokenSize
    public selected: boolean
    public hidden: boolean
    public showLabel: boolean
    public x0: number
    public y0: number

    public constructor(newName: string, newImageUrl: string, newMapId: number, newX: number, newY: number, newCondition?: TokenCondition, newType?: TokenType, newGuid?: string, newSize?: TokenSize, newSelected?: boolean, newHidden?: boolean, newShowLabel?: boolean, newX0?: number, newY0?: number) {
        this.guid = newGuid ? newGuid : guid()
        this.name = newName
        this.imageUrl = newImageUrl
        this.mapId = newMapId
        this.x = newX
        this.y = newY
        this.condition = newCondition ? newCondition : TokenCondition.Alive
        this.type = newType ? newType : TokenType.NPC
        this.size = newSize ? newSize : TokenSize.medium
        this.selected = newSelected ? newSelected : false
        this.hidden = newHidden ? newHidden : false
        this.showLabel = newShowLabel ? newShowLabel : false
        this.x0 = newX0 ? newX0 : 0
        this.y0 = newY0 ? newY0 : 0
    }

    public toggleTokenValue(attributeKey: string) {
        switch(attributeKey.toUpperCase()) {
        case 'SELECTED':
            this.selected = !this.selected
            break
        case 'HIDDEN':
            this.hidden = !this.hidden
            break
        case 'SHOWLABEL':
            this.showLabel = !this.showLabel
            break
        }
    }
}

export default Token
