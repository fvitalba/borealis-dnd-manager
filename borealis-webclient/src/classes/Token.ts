import guid from '../utils/guid.js'
import TokenCondition from '../enums/TokenCondition'
import TokenSize from '../enums/TokenSize'
import TokenType from '../enums/TokenType'
import UserType from '../enums/UserType.js'

export type TokenTextProperty = 'guid' | 'name' | 'imageUrl'
export type TokenNumberProperty = 'mapId' | 'x' | 'y' | 'width' | 'height' | 'x0' | 'y0'
export type TokenBooleanProperty = 'selected' | 'hidden' | 'showLabel'

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
    public width: number
    public height: number
    public selected: boolean
    public hidden: boolean
    public showLabel: boolean
    public x0: number
    public y0: number

    public constructor(newName: string, newImageUrl: string, newMapId: number, newX: number, newY: number, newCondition?: TokenCondition, newType?: TokenType, newGuid?: string, newSize?: TokenSize, newSelected?: boolean, newHidden?: boolean, newShowLabel?: boolean, newX0?: number, newY0?: number) {
        this.guid = newGuid ? newGuid : guid()
        this.name = newName
        this.imageUrl = newImageUrl.trim()
        this.mapId = newMapId
        this.x = newX
        this.y = newY
        this.condition = newCondition ? newCondition : TokenCondition.Alive
        this.type = newType ? newType : TokenType.NPC
        this.size = newSize ? newSize : TokenSize.medium
        this.width = this.size
        this.height = this.size
        this.selected = newSelected ? newSelected : false
        this.hidden = newHidden ? newHidden : false
        this.showLabel = newShowLabel ? newShowLabel : false
        this.x0 = newX0 ? newX0 : 0
        this.y0 = newY0 ? newY0 : 0
    }

    public copy(): Token {
        return this
    }

    public toggleValue(attributeKey: TokenBooleanProperty) {
        this[attributeKey] = !this[attributeKey]
    }

    public setTextValue(attributeKey: TokenTextProperty, newValue: string) {
        this[attributeKey] = newValue
    }

    public setNumberValue(attributeKey: TokenNumberProperty, newValue: number) {
        this[attributeKey] = newValue
    }

    public setTokenSize(newSize: TokenSize) {
        this.size = newSize
        this.width = this.size
        this.height = this.size
    }

    public scaleToken(offsetX: number, offsetY: number, scale: number): Token {
        const scaledToken = this.copy()
        scaledToken.x = scaledToken.x * scale + offsetX
        scaledToken.y = scaledToken.y * scale + offsetY
        scaledToken.width = scaledToken.width * scale
        scaledToken.height = scaledToken.height * scale
        return scaledToken
    }

    public isAllowedToMove(userType: UserType): boolean {
        switch(userType) {
        case UserType.host:
            return true
        case UserType.player:
            return this.type === TokenType.PC
        }
    }

    private generateConditionClass(): string {
        switch(this.condition) {
        case TokenCondition.Death:
            return 'token-dead'
        default:
            return ''
        }
    }

    private generateTypeClass(): string {
        switch(this.type) {
        case TokenType.PC:
            return 'token-pc'
        case TokenType.NPC:
            return 'token-npc'
        default:
            return ''
        }
    }

    private generateAccessabilityClass(userType: UserType): string {
        if (this.isAllowedToMove(userType))
            return 'token-grabbable'
        return ''
    }

    private generateVisibilityClass(userType: UserType): string {
        return userType === UserType.host ? 'opacity-50' : 'invisible'
    }

    public generateTokenClasses(userType: UserType): Array<string> {
        const classes = new Array<string>()
        classes.push('token')
        const conditionClass = this.generateConditionClass()
        if (conditionClass !== '')
            classes.push(conditionClass)
        const typeClass = this.generateTypeClass()
        if (typeClass !== '')
            classes.push(typeClass)
        const accessabilityClass = this.generateAccessabilityClass(userType)
        if (accessabilityClass !== '')
            classes.push(accessabilityClass)
        const hiddenClass = this.generateVisibilityClass(userType)
        if (hiddenClass !== '')
            classes.push(hiddenClass)

        return classes
    }
}

export default Token
