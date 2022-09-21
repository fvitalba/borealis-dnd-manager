import { MetadataState } from '../../reducers/metadataReducer'

export interface GameSetupProps {
    metadataState: MetadataState,
}

export interface GameSetupViewProps {
    showLogin: boolean,
    showRoomSelection: boolean,
}
