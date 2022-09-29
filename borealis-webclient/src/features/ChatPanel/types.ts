import Message from '@/classes/Message'
import { ChatState } from '@/reducers/chatReducer'
import { UserState } from '@/reducers/userReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import { CharacterState } from '@/reducers/characterReducer'
import { MetadataState } from '@/reducers/metadataReducer'

export interface ChatPanelState {
    hidden: boolean,
    showHelp: boolean,
    currentMessage: string,
}

export interface ChatPanelProps {
    chatState: ChatState,
    settingsState: SettingsState,
    userState: UserState,
    characterState: CharacterState,
    metadataState: MetadataState,
    addChatMessage: (newMessage: Message) => void,
}
