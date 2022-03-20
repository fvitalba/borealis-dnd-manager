import { forwardRef } from 'react'
import Button from './Button'
import { PlaySolidIcon, XCircleOutlineIcon, ChatOutlineIcon, HelpCircleSolidIcon } from './Icons'

const ChatPanelMessage = forwardRef(({ message, playerInfo }, ref) => {
    return (
        <div className='chat-panel-message' ref={ ref }>
            <div className='chat-panel-message-info'>
                <div className='chat-panel-message-username' >{ message.username }</div>
                { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
            </div>
            <div className='chat-panel-message-content'>{ message.publicMessage }</div>
        </div>
    )
})
ChatPanelMessage.displayName = 'ChatPanelMessage'

const ChatPanelWhisper = forwardRef(({ message, username, playerInfo }, ref) => {
    let textToShow = ''
    if (message.username === username)
        textToShow = `To ${message.targetUsername}: ` + message.privateMessage
    else if (message.targetUsername === username)
        textToShow = `From ${message.username}: ` + message.privateMessage

    if (textToShow === '')
        return null

    return (
        <div className='chat-panel-message' ref={ ref }>
            <div className='chat-panel-message-info'>
                <div className='chat-panel-message-username' >{ message.username }</div>
                { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
            </div>
            <div className='chat-panel-message-content'>{ textToShow }</div>
        </div>
    )
})
ChatPanelWhisper.displayName = 'ChatPanelWhisper'

const ChatPanelCommand = forwardRef(({ username, message }, ref) => {
    const textToShow = message.username === username ? message.privateMessage : message.publicMessage
    return (
        <div className='chat-panel-command' ref={ ref }>
            <div className='chat-panel-command-content'>{ textToShow }</div>
        </div>
    )
})
ChatPanelCommand.displayName = 'ChatPanelCommand'

const ChatPanelError = forwardRef(({ message }, ref) => {
    return (
        <div className='chat-panel-error' ref={ ref }>
            <div className='chat-panel-error-content'>{ message.publicMessage }</div>
        </div>
    )
})
ChatPanelError.displayName = 'ChatPanelError'

const ChatCommandsHelp = ({ commands }) => {
    return (
        <div className='chat-panel-help-container'>
            <table className='chat-panel-help-table'>
                <thead>
                    <tr>
                        <th className='chat-panel-help-th'>Command</th>
                        <th className='chat-panel-help-th'>Description</th>
                        <th className='chat-panel-help-th'>Example</th>
                    </tr>
                </thead>
                <tbody>
                    { commands.map((command) =>
                        <ChatCommand key={ command.shortcut } command={ command } />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const ChatCommand = ({ command }) => {
    return (
        <tr>
            <td className='chat-panel-help-td'>{ command.command }</td>
            <td className='chat-panel-help-td'>{ command.description }</td>
            <td className='chat-panel-help-td'>{ command.example }</td>
        </tr>
    )
}

const ChatPanelView = ({ username, chatPanelHidden, toggleHidden, showHelp, toggleHelp, chatCommands, showUserHover, toggleUserHover, noOfCurrentUsers, users, currentMessage, changeCurrentMessage, addMessage, chatMessages, inputOnKeyDown, endOfMessagesRef }) => {
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
                    ? <ChatCommandsHelp commands={ chatCommands } />
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
                                <div className='chat-panel-user' key={ user.username }>{ user.username } ({ user.isHost ? 'DM' : 'Player' })</div>
                            )}
                        </div>
                        : null
                    }
                </div>
                <div className='chat-panel-content'>
                    { sortedChatMessages.map((message, index) => {
                        const isLastElement = index === (sortedChatMessages.length - 1)
                        switch (message.typeOfMessage) {
                        case 'message':
                            return (<ChatPanelMessage key={ message.guid } message={ message } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null }/>)
                        case 'whisper':
                            return (<ChatPanelWhisper key={ message.guid } message={ message } username={ username } playerInfo={ message.playerInfo } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case 'command':
                            return (<ChatPanelCommand key={ message.guid } message={ message } username={ username } ref={ isLastElement ? endOfMessagesRef : null } />)
                        case 'error':
                            return (<ChatPanelError key={ message.guid } message={ message } ref={ isLastElement ? endOfMessagesRef : null } />)
                        default: return null
                        }
                    })}
                </div>
                <div className='chat-panel-input'>
                    <input title='Mesage' placeholder='Type your message...' value={ currentMessage } onChange={ changeCurrentMessage } className='chat-panel-input-input' onKeyDown={ inputOnKeyDown } />
                    <Button title='Push refresh to players' value={ <PlaySolidIcon /> } onClick={ addMessage } />
                </div>
                <div className='chat-panel-content-bottom' />
            </div>
    )
}

export default ChatPanelView
