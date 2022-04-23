import React, { ChangeEvent, Ref, KeyboardEvent } from 'react'
import DiceRollButton from '../../components/DiceRollButton'
import Button from './../Button'
import { PlaySolidIcon, XCircleOutlineIcon, ChatOutlineIcon, HelpCircleSolidIcon } from './../Icons'
import ChatPanelCommandsHelp from './ChatPanelCommandsHelp'
import ChatPanelMessage from './ChatPanelMessage'
import ChatPanelWhisper from './ChatPanelWhisper'
import ChatPanelCommand from './ChatPanelCommand'
import ChatPanelError from './ChatPanelError'
import { ChatCommand } from '../../utils/constants'
import User from '../../classes/User'
import Message from '../../classes/Message'
import MessageType from '../../enums/MessageType'

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
            ? <div className='chat-panel-collapsed-container'>
                <div className='chat-panel-header-close'>
                    <Button value={ <ChatOutlineIcon /> } onClick={ toggleHidden } title='Show chat' />
                </div>
            </div>
            : <div className='chat-panel-container'>
                { showHelp
                    ? <ChatPanelCommandsHelp commands={ chatCommands } />
                    : null
                }
                <div className='chat-panel-expanded-container'>
                    <div className='chat-panel-header-close'>
                        <Button value={ <XCircleOutlineIcon /> } onClick={ toggleHidden } title='Hide chat' />
                        <Button value={ <HelpCircleSolidIcon /> } onClick={ toggleHelp } title='Show list of commands' />
                    </div>
                </div>
                <div className='chat-panel-header'>
                    <div className='chat-panel-header-title'>Live Chat</div>
                    <div className='chat-panel-header-subtitle' onMouseEnter={ toggleUserHover } onMouseLeave={ toggleUserHover }>{ noOfCurrentUsers } player(s) online</div>
                    { (showUserHover && (users.length > 0))
                        ? <div className='chat-panel-users'>
                            { users.map((user) =>
                                <div className='chat-panel-user' key={ user.name }>{ user.name } ({ user.type })</div>
                            )}
                        </div>
                        : null
                    }
                </div>
                <div className='chat-panel-content'>
                    { sortedChatMessages.map((message: Message, index: number) => {
                        const isLastElement = index === (sortedChatMessages.length - 1)
                        switch (message.type) {
                        case MessageType.Message:
                            return (<ChatPanelMessage key={ message.guid } message={ message } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null }/>)
                        case MessageType.Whisper:
                            return (<ChatPanelWhisper key={ message.guid } message={ message } username={ username } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case MessageType.Command:
                            return (<ChatPanelCommand key={ message.guid } message={ message } username={ username } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case MessageType.Error:
                            return (<ChatPanelError key={ message.guid } message={ message } ref={ isLastElement ? endOfMessagesRef : null } />)
                        default: return null
                        }
                    })}
                </div>
                <div className='chat-panel-input'>
                    <DiceRollButton />
                    <input title='Mesage' placeholder='Type your message...' value={ currentMessage } onChange={ changeCurrentMessage } className='chat-panel-input-input' onKeyDown={ inputOnKeyDown } />
                    <Button title='Push refresh to players' value={ <PlaySolidIcon /> } onClick={ addMessage } />
                </div>
                <div className='chat-panel-content-bottom' />
            </div>
    )
}

export default ChatPanelView
