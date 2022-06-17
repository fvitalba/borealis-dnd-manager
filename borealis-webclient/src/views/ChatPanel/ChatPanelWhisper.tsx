import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'
import MessageType from '../../enums/MessageType'
import ChatPanelMessageContainer from '../GenericViews/ChatPanelMessageContainer'
import ChatPanelMessageContentContainer from '../GenericViews/ChatPanelMessageContentContainer'
import ChatPanelMessageInfo from './ChatPanelMessageInfo'

interface ChatPanelWhisperProps {
    message: Message,
    username: string,
    playerInfo: string,
}

const ChatPanelWhisper = forwardRef(({ message, username, playerInfo }: ChatPanelWhisperProps, ref: ForwardedRef<HTMLDivElement>) => {
    let textToShow = ''
    if (message.username === username)
        textToShow = `To ${message.targetUsername}: ` + message.privateMessage
    else if (message.targetUsername === username)
        textToShow = `From ${message.username}: ` + message.privateMessage

    if (textToShow === '')
        return <></>

    return (
        <ChatPanelMessageContainer ref={ ref } property={ username === message.username ? 'own' : 'other'}>
            <ChatPanelMessageInfo message={ message } username={ username } playerInfo={ playerInfo } />
            <ChatPanelMessageContentContainer messageType={ MessageType.Whisper }>{ textToShow }</ChatPanelMessageContentContainer>
        </ChatPanelMessageContainer>
    )
})
ChatPanelWhisper.displayName = 'ChatPanelWhisper'

export default ChatPanelWhisper
