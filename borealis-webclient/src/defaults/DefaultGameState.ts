import Character, { CharacterClassLevel, CharacterHitDice } from '../classes/Character'
import Game from '../classes/Game'
import Map from '../classes/Map'
import Token from '../classes/Token'
import CharacterClass from '../enums/CharacterClass'
import DiceType from '../enums/DiceType'
import TokenCondition from '../enums/TokenCondition'
import TokenSize from '../enums/TokenSize'
import TokenType from '../enums/TokenType'
import { CharacterState } from '../reducers/characterReducer'
import { MapState } from '../reducers/mapReducer'
import { TokenState } from '../reducers/tokenReducer'
import guid from '../utils/guid'

interface DefaultGameState {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    characterState: CharacterState,
}

const generateDefaultGameState = (): DefaultGameState => {
    const defaultGame = new Game(0, 0, innerWidth, innerHeight, false)
    const defaultMap1 = new Map(0, 'Dragon\'s Lair', 'https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2022/02/Arena-of-Fire-battle-map-Main-preview-Night.jpg', 0, 0, 795, 555)
    const defaultMap2 = new Map(1, 'Mage Tower', 'https://2minutetabletop.com/wp-content/uploads/2022/01/Wizarding-School-Classroom-Basic-Light-16x22-1.jpg', 0, 0, 795, 555)
    const defaultMapState: MapState = {
        maps: [defaultMap1, defaultMap2],
    }
    const defaultToken1 = new Token('Adult Black Dragon', 'https://i.imgur.com/H2dyKur.png', 0, 350, 210, TokenCondition.Alive, TokenType.NPC, guid(), TokenSize.huge, false, false, true, 0, 0)
    const defaultToken2 = new Token('Mighty Paladin', 'https://i.imgur.com/ccQxtZ7.png', 0, 50, 180, TokenCondition.Alive, TokenType.PC, guid(), TokenSize.medium, false, false, false, 0, 0)
    const defaultToken3 = new Token('Misterious Wizard', 'https://i.imgur.com/82s9UPR.png', 1, 620, 250, TokenCondition.Alive, TokenType.NPC, guid(), TokenSize.medium, false, false, true, 0, 0)
    const defaultTokenState: TokenState = {
        tokens: [defaultToken1, defaultToken2, defaultToken3],
    }
    const defaultCharacter1 = new Character(guid(), 'Herbert the Paladin', 28)
    defaultCharacter1.class = [new CharacterClassLevel(3, CharacterClass.Paladin)]
    defaultCharacter1.hitDice = [new CharacterHitDice(3, DiceType.d10, 2)]
    const defaultCharacterState: CharacterState = {
        characters: [defaultCharacter1],
        currentCharacterGuid: defaultCharacter1.guid,
    }

    return {
        gameState: defaultGame,
        mapState: defaultMapState,
        tokenState: defaultTokenState,
        characterState: defaultCharacterState,
    }
}

export default generateDefaultGameState
