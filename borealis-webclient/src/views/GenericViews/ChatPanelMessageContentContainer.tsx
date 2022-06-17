import React, { ReactNode } from 'react'
import MessageType from '../../enums/MessageType'

interface ChatPanelMessageContentContainerProps {
    children: ReactNode,
    messageType: MessageType,
}

const ChatPanelMessageContentContainer = ({ children, messageType }: ChatPanelMessageContentContainerProps) => {
    let className = ''
    switch(messageType) {
    case MessageType.Whisper:
        className = 'borealis-chat-panel-whisper-content'
        break
    case MessageType.Command:
        className = 'borealis-chat-panel-command-content'
        break
    case MessageType.Error:
        className = 'borealis-chat-panel-error-content'
        break
    default:
        className = 'borealis-chat-panel-message-content'
        break
    }

    return (<div className={ className }>
        { children }
    </div>)
}

export default ChatPanelMessageContentContainer
