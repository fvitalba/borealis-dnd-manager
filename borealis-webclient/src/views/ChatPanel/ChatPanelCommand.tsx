import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'
import MessageType from '../../enums/MessageType'
import ChatPanelMessageContainer from '../GenericViews/ChatPanelMessageContainer'
import ChatPanelMessageContentContainer from '../GenericViews/ChatPanelMessageContentContainer'

interface ChatPanelCommandProps {
    message: Message,
    username: string,
}

const ChatPanelCommand = forwardRef(({ message, username }: ChatPanelCommandProps, ref: ForwardedRef<HTMLDivElement>) => {
    const textToShow = message.username === username ? message.privateMessage : message.publicMessage
    return (
        <ChatPanelMessageContainer ref={ ref } property={ username === message.username ? 'own' : 'other'}>
            <ChatPanelMessageContentContainer messageType={ MessageType.Command }>{ textToShow }</ChatPanelMessageContentContainer>
        </ChatPanelMessageContainer>
    )
})
ChatPanelCommand.displayName = 'ChatPanelCommand'

export default ChatPanelCommand
