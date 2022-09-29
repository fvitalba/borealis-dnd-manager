import { CharacterState } from '@/reducers/characterReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import User from '@/classes/User'

export interface UserManagerProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
    characterState: CharacterState,
    setUsersFromAPI: (arg0: Array<User>) => void,
}
