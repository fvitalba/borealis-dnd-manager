import { ReactNode } from 'react'
import Message from '@/classes/Message'
import MessageType from '@/enums/MessageType'

type MessageProperty = 'own' | 'other'

export interface ChatPanelCommandProps {
    message: Message,
    username: string,
}

export interface ChatPanelErrorProps {
    message: Message,
    username: string,
}

export interface ChatPanelMessageProps {
    message: Message,
    username: string,
    playerInfo: string,
}

export interface ChatPanelMessageContainerProps {
    children: ReactNode,
    property: MessageProperty,
}

export interface ChatPanelMessageContentContainerProps {
    children: ReactNode,
    messageType: MessageType,
}

export interface ChatPanelMessageInfoProps {
    message: Message,
    username: string,
    playerInfo: string,
}

export interface ChatPanelWhisperProps {
    message: Message,
    username: string,
    playerInfo: string,
}
