import React, { forwardRef, ForwardedRef } from 'react'
import MessageType from '@/enums/MessageType'
import ChatPanelMessageContainer from './ChatPanelMessageContainer'
import ChatPanelMessageContentContainer from './ChatPanelMessageContentContainer'
import ChatPanelMessageInfo from './ChatPanelMessageInfo'
import { ChatPanelMessageProps } from './types'

const ChatPanelMessage = forwardRef(({ message, username, playerInfo }: ChatPanelMessageProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <ChatPanelMessageContainer ref={ ref } property={ username === message.username ? 'own' : 'other'}>
            <ChatPanelMessageInfo message={ message } username={ username } playerInfo={ playerInfo } />
            <ChatPanelMessageContentContainer messageType={ MessageType.Message }>{ message.publicMessage }</ChatPanelMessageContentContainer>
        </ChatPanelMessageContainer>
    )
})
ChatPanelMessage.displayName = 'ChatPanelMessage'

export default ChatPanelMessage
