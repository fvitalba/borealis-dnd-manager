import UserType from '../../enums/UserType'
import { MetadataState } from '../../reducers/metadataReducer'
import { SettingsState } from '../../reducers/settingsReducer'

export interface DebugOverlayProps {
    metadataState: MetadataState,
    settingsState: SettingsState,
}

export interface DebugOverlayViewProps {
    userType: UserType,
    userGuid: string,
    userName: string,
    roomId: string,
    roomName: string,
    socketGuid: string,
    sessionGuid: string,
    isGuest: boolean,
}
