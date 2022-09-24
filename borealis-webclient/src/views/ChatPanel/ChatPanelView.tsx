import React, { ChangeEvent, Ref, KeyboardEvent } from 'react'
import User from '../../classes/User'
import Message from '../../classes/Message'
import { DiceRollButton } from '../../components/DiceRollButton'
import MessageType from '../../enums/MessageType'
import { BorealisPlayIcon, BorealisCloseChatIcon, BorealisOpenChatIcon, BorealisChatHelpIcon } from './../Icons'
import ChatPanelCommandsHelp from './ChatPanelCommandsHelp'
import ChatPanelMessage from './ChatPanelMessage'
import ChatPanelWhisper from './ChatPanelWhisper'
import ChatPanelCommand from './ChatPanelCommand'
import ChatPanelError from './ChatPanelError'
import { ChatCommand } from '../../utils/constants'
import ChatPanelContainer from '../GenericViews/ChatPanelContainer'
import ChatPanelHeaderContainer from '../GenericViews/ChatPanelHeaderContainer'
import ChatPanelContentContainer from '../GenericViews/ChatPanelContentContainer'
import ChatPanelInputContainer from '../GenericViews/ChatPanelInputContainer'
import TextInput from '../GenericViews/TextInput'
import ActionButton from '../GenericViews/ActionButton'
import ChatPanelActionContainer from '../GenericViews/ChatPanelActionContainer'
import ChatPanelPlayerPanel from './ChatPanelPlayerPanel'

interface ChatPanelViewProps {
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
    changeCurrentMessage: (arg0: ChangeEvent<HTMLInputElement>) => void,
    addMessage: () => void,
    chatMessages: Array<Message>,
    inputOnKeyDown: (arg0: KeyboardEvent) => void,
    endOfMessagesRef: Ref<HTMLDivElement>,
}

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
                <div className='chat-panel-content-bottom' />
            </ChatPanelContainer>
    )
}

export default ChatPanelView
