import Game from '@/classes/Game'
import Map from '@/classes/Map'
import Token from '@/classes/Token'
import Character from '@/classes/Character'
import Message from '@/classes/Message'
import {  MapState } from '@/reducers/mapReducer'
import { TokenState } from '@/reducers/tokenReducer'
import {  ChatState } from '@/reducers/chatReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import { CharacterState } from '@/reducers/characterReducer'
import { CharacterSchema, CharacterStateSchema, ChatMessageSchema, ChatStateSchema, GameSchema, MapSchema, MapStateSchema, PathSchema, RoomUserSchema, TokenSchema, TokenStateSchema } from '@/utils/mongoDbSchemas'

export interface IncomingWebSocketPayload {
    type: string,
    targetGuid?: string,
    targetUsername?: string,
    x?: number,
    y?: number,
    mapId?: number,
    drawPath?: PathSchema,
    fogPath?: PathSchema,
    entityGuid?: string,
    maps?: Array<MapSchema>,
    map?: Map,
    tokens?: Array<TokenSchema>,
    token?: TokenSchema,
    character?: CharacterSchema,
    width?: number,
    height?: number,
    fogEnabled?: boolean,
    message?: ChatMessageSchema,
    user?: RoomUserSchema,
    game?: GameSchema,
    mapState?: MapStateSchema,
    tokenState?: TokenStateSchema,
    chatState?: ChatStateSchema,
    characterState?: CharacterStateSchema,
    fromSocketGuid: string,
    fromUserGuid: string,
    roomId: string,
}

export interface DataReceiverProps {
    gameState: Game,
    mapState: MapState,
    tokenState: TokenState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    characterState: CharacterState,
    chatState: ChatState,
    updateCursor: (arg0: string, arg1: number, arg2: number) => void,
    updateMaps: (arg0: Array<Map>) => void,
    updateTokens: (arg0: Array<Token>) => void,
    loadMap: (arg0: number) => void,
    addMap: (arg0: Map) => void,
    setFogEnabled: (arg0: boolean) => void,
    assignCharacter: (arg0: string) => void,
    assignCharacterToUser: (arg0: string, arg1: string) => void,
    updateCharacter: (arg0: Character) => void,
    overwriteGame: (arg0: Game) => void,
    overwriteChat: (arg0: Array<Message>) => void,
    setCharacters: (arg0: Array<Character>) => void,
    addChatMessage: (arg0: Message) => void,
}
