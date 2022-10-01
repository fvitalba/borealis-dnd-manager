import React, { forwardRef, ForwardedRef } from 'react'
import MessageType from '@/enums/MessageType'
import ChatPanelMessageContainer from './ChatPanelMessageContainer'
import ChatPanelMessageContentContainer from './ChatPanelMessageContentContainer'
import { ChatPanelErrorProps } from './types'

const ChatPanelError = forwardRef(({ message, username }: ChatPanelErrorProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <ChatPanelMessageContainer ref={ ref } property={ username === message.username ? 'own' : 'other'}>
            <ChatPanelMessageContentContainer messageType={ MessageType.Error }>{ message.publicMessage }</ChatPanelMessageContentContainer>
        </ChatPanelMessageContainer>
    )
})
ChatPanelError.displayName = 'ChatPanelError'

export default ChatPanelError
