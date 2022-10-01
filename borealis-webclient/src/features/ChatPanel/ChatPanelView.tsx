import React from 'react'
import Message from '@/classes/Message'
import { DiceRollButton } from '@/features/ChatPanel/DiceRollButton'
import MessageType from '@/enums/MessageType'
import { BorealisPlayIcon, BorealisCloseChatIcon, BorealisOpenChatIcon, BorealisChatHelpIcon } from '@/views/Icons'
import { ChatPanelCommandsHelp } from './ChatPanelCommandsHelp'
import { ChatPanelMessage } from './ChatPanelMessage'
import { ChatPanelWhisper } from './ChatPanelMessage'
import { ChatPanelCommand } from './ChatPanelMessage'
import { ChatPanelError } from './ChatPanelMessage'
import ChatPanelContainer from './ChatPanelContainer'
import ChatPanelHeaderContainer from './ChatPanelHeaderContainer'
import ChatPanelContentContainer from './ChatPanelContentContainer'
import ChatPanelInputContainer from './ChatPanelInputContainer'
import { TextInput } from '@/components/TextInput'
import { ActionButton } from '@/components/ActionButton'
import ChatPanelActionContainer from './ChatPanelActionContainer'
import ChatPanelPlayerPanel from './ChatPanelPlayerPanel'
import { ChatPanelViewProps } from './types'

const ChatPanelView = ({ username, chatPanelHidden, toggleHidden, showHelp, toggleHelp, chatCommands, showUserHover, toggleUserHover, noOfCurrentUsers, users, currentMessage, changeCurrentMessage, addMessage, chatMessages, inputOnKeyDown, endOfMessagesRef }: ChatPanelViewProps) => {
    const sortedChatMessages = chatMessages.sort((a, b) => a.timestamp - b.timestamp)

    return (
        chatPanelHidden
            ? <ChatPanelActionContainer state='collapsed'>
                <ActionButton value={ <BorealisOpenChatIcon /> } onClick={ toggleHidden } title='Show chat' />
            </ChatPanelActionContainer>
            : <ChatPanelContainer>
                { showHelp
                    ? <ChatPanelCommandsHelp commands={ chatCommands } />
                    : null
                }
                <ChatPanelActionContainer state='open'>
                    <ActionButton value={ <BorealisCloseChatIcon /> } onClick={ toggleHidden } title='Hide chat' />
                    <ActionButton value={ <BorealisChatHelpIcon /> } onClick={ toggleHelp } title='Show list of commands' />
                </ChatPanelActionContainer>
                <ChatPanelHeaderContainer>
                    <h5>Live Chat</h5>
                    <ChatPanelPlayerPanel onMouseEnter={ toggleUserHover } onMouseLeave={ toggleUserHover } users={ users } showUserList={ showUserHover } />
                </ChatPanelHeaderContainer>
                <ChatPanelContentContainer>
                    { sortedChatMessages.map((message: Message, index: number) => {
                        const isLastElement = index === (sortedChatMessages.length - 1)
                        switch (message.type) {
                        case MessageType.Message:
                            return (<ChatPanelMessage key={ message.guid } message={ message } username={ username } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null }/>)
                        case MessageType.Whisper:
                            return (<ChatPanelWhisper key={ message.guid } message={ message } username={ username } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case MessageType.Command:
                            return (<ChatPanelCommand key={ message.guid } message={ message } username={ username } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case MessageType.Error:
                            return (<ChatPanelError key={ message.guid } message={ message } username={ username } ref={ isLastElement ? endOfMessagesRef : null } />)
                        default: return <></>
                        }
                    })}
                </ChatPanelContentContainer>
                <ChatPanelInputContainer>
                    <DiceRollButton />
                    <TextInput title='Mesage' placeholder='Type your message...' value={ currentMessage } onChange={ changeCurrentMessage } onKeyDown={ inputOnKeyDown } />
                    <ActionButton title='Push refresh to players' value={ <BorealisPlayIcon /> } onClick={ addMessage } />
                </ChatPanelInputContainer>
                <div className='borealis-chat-panel-content-bottom' />
            </ChatPanelContainer>
    )
}

export default ChatPanelView
