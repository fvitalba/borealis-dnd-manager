import UserType from '../../enums/UserType'
import { MetadataState } from '../../reducers/metadataReducer'

export interface GameStateHandlerProps {
    metadataState: MetadataState,
    setGameSettings: (userType: UserType, userGuid: string, isGuest: boolean, roomName: string, roomGuid: string) => void,
    setUsername: (userName: string) => void,
}
