import Game from '../classes/Game'
import { SettingsState } from '../reducers/settingsReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { MapState } from '../reducers/mapReducer'
import { TokenState } from '../reducers/tokenReducer'
import { ChatState } from '../reducers/chatReducer'
import { UserState } from '../reducers/userReducer'
import { CharacterState } from '../reducers/characterReducer'

interface StateInterface {
    settings: SettingsState,
    metadata: MetadataState,
    game: Game,
    map: MapState,
    token: TokenState,
    chat: ChatState,
    user: UserState,
    character: CharacterState,
}

export default StateInterface
