import Game from '../classes/Game'
import { CharacterState, initialCharacterState } from '../reducers/characterReducer'
import { ChatState, initialChatState } from '../reducers/chatReducer'
import { initialMapState, MapState } from '../reducers/mapReducer'
import { initialMetadataState, MetadataState } from '../reducers/metadataReducer'
import { initialTokenState, TokenState } from '../reducers/tokenReducer'
import { UserState, initialUserState } from '../reducers/userReducer'

export interface GameStateJson {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
}

export const gameToJsonString = (gameState: Game, mapState: MapState, tokenState: TokenState, characterState: CharacterState, userState: UserState, metadataState: MetadataState): string => {
    return JSON.stringify(gameToJson(gameState, mapState, tokenState, characterState, userState, metadataState))
}

export const gameToJson = (gameState: Game, mapState: MapState, tokenState: TokenState, characterState: CharacterState, userState: UserState, metadataState: MetadataState): GameStateJson => {
    const data = {
        gameState,
        mapState,
        tokenState,
        characterState,
        userState,
        metadataState,
    }
    return data
}

export const gameFromJsonString = (jsonString: string): GameStateJson => {
    return gameFromJson(JSON.parse(jsonString))
}

export const gameFromJson = (json: any | undefined): GameStateJson => {
    if (json) {
        const gameState = resetGameState(json.gameState ? json.gameState : new Game())
        const mapState = json.mapState ? json.mapState : initialMapState()
        const tokenState = resetTokenState(json.tokenState ? json.tokenState : initialTokenState())
        const characterState = json.characterState ? json.characterState : initialCharacterState()
        const userState = json.userState ? json.userState : initialUserState()
        const metadataState = json.metadataState ? json.metadataState : initialMetadataState()
        return {
            gameState,
            mapState,
            tokenState,
            characterState,
            userState,
            metadataState,
        }
    } else {
        throw new Error(`The json ${json} is no allowed json that can be used for state construction.`)
    }
}

export interface ChatStateJson {
    chatState: ChatState,
}

export const chatToJsonString = (chatState: ChatState): string => {
    return JSON.stringify(chatToJson(chatState))
}

export const chatToJson = (chatState: ChatState): ChatStateJson => {
    const data = {
        chatState,
    }
    return data
}

export const chatFromJsonString = (jsonString: string): ChatStateJson => {
    return chatFromJson(JSON.parse(jsonString))
}

export const chatFromJson = (json: any | undefined): ChatStateJson => {
    if (json) {
        const chatState = json.chatState ? json.chatState : initialChatState()
        return {
            chatState,
        }
    } else {
        throw new Error(`The json ${json} is no allowed json that can be used for state construction.`)
    }
}

const resetGameState = (inputGameState: Game): Game => {
    //TODO: Think about if we actually want this behaviour
    const outputGameState = inputGameState
    outputGameState.currentMapId = -1
    return outputGameState
}

const resetTokenState = (inputTokenState: TokenState): TokenState => {
    const outputTokenState = {
        ...inputTokenState,
        tokens: inputTokenState.tokens.map((token) => {
            token.x0 = 0
            token.y0 = 0
            token.selected = false
            return token
        }),
    }
    return outputTokenState
}
