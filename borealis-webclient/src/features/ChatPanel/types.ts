import { ChangeEvent, Ref, KeyboardEvent, ReactNode } from 'react'
import Message from '@/classes/Message'
import User from '@/classes/User'
import { ChatState } from '@/reducers/chatReducer'
import { UserState } from '@/reducers/userReducer'
import { SettingsState } from '@/reducers/settingsReducer'
import { CharacterState } from '@/reducers/characterReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import { ChatCommand } from '@/utils/constants'

type StateType = 'open' | 'collapsed'

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

export interface ChatPanelViewProps {
    username: string,
    chatPanelHidden: boolean,
    toggleHidden: () => void,
    showHelp: boolean,
    toggleHelp: () => void,
    chatCommands: Array<ChatCommand>,
    showUserHover: boolean,
    toggleUserHover: () => void,
    noOfCurrentUsers: number,
    users: Array<User>,
    currentMessage: string,
    changeCurrentMessage: (event: ChangeEvent<HTMLInputElement>) => void,
    addMessage: () => void,
    chatMessages: Array<Message>,
    inputOnKeyDown: (event: KeyboardEvent) => void,
    endOfMessagesRef: Ref<HTMLDivElement>,
}

export interface ChatPanelPlayerPanelProps {
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    users: Array<User>,
    showUserList: boolean,
}

export interface ChatPanelInputContainerProps {
    children: ReactNode,
}

export interface ChatPanelHeaderContainerProps {
    children: ReactNode,
}

export interface ChatPanelContentContainerProps {
    children: ReactNode,
}

export interface ChatPanelContainerProps {
    children: ReactNode,
}

export interface ChatPanelActionContainerProps {
    children: ReactNode,
    state: StateType,
}
