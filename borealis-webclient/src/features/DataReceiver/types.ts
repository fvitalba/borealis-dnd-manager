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
    updateCursor: (newUsername: string, newX: number, newY: number) => void,
    updateMaps: (newMaps: Array<Map>) => void,
    updateTokens: (newTokens: Array<Token>) => void,
    loadMap: (mapId: number) => void,
    addMap: (newMap: Map) => void,
    setFogEnabled: (fogEnabled: boolean) => void,
    assignCharacter: (guidToAssign: string) => void,
    assignCharacterToUser: (username: string, guidToAssign: string) => void,
    updateCharacter: (character: Character) => void,
    overwriteGame: (newGame: Game) => void,
    overwriteChat: (newMessages: Array<Message>) => void,
    setCharacters: (newCharacters: Array<Character>) => void,
    addChatMessage: (newMessage: Message) => void,
}
