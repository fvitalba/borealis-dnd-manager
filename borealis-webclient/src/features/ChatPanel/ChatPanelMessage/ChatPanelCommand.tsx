import React, { forwardRef, ForwardedRef } from 'react'
import MessageType from '@/enums/MessageType'
import ChatPanelMessageContainer from './ChatPanelMessageContainer'
import ChatPanelMessageContentContainer from './ChatPanelMessageContentContainer'
import { ChatPanelCommandProps } from './types'

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
