import Button from './Button'
import { PlaySolidIcon, XCircleOutlineIcon, ChatOutlineIcon } from './Icons'

const ChatPanelMessage = ({ message, playerInfo }) => {
    return (
        <div className='chat-panel-message'>
            <div className='chat-panel-message-info'>
                <div className='chat-panel-message-username' >{ message.username }</div>
                { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
            </div>
            <div className='chat-panel-message-content'>{ message.publicMessage }</div>
        </div>
    )
}

const ChatPanelCommand = ({ username, message }) => {
    const textToShow = message.username === username ? message.privateMessage : message.publicMessage
    return (
        <div className='chat-panel-command'>
            <div className='chat-panel-command-content'>{ textToShow }</div>
        </div>
    )
}

const ChatPanelError = ({ message }) => {
    return (
        <div className='chat-panel-error'>
            <div className='chat-panel-error-content'>{ message.publicMessage }</div>
        </div>
    )
}

const ChatPanelView = ({ username, chatPanelHidden, toggleHidden, showUserHover, toggleUserHover, noOfCurrentUsers, users, currentMessage, changeCurrentMessage, addMessage, chatMessages, inputOnKeyDown }) => {
    const playerInfo = 'lvl. XX Barbarian'
    const sortedChatMessages = chatMessages.sort((a, b) => a.timestamp - b.timestamp)

    return (
        chatPanelHidden
            ? <div className='chat-panel-collapsed-container'>
                <div className='chat-panel-header-close'>
                    <Button value={ <ChatOutlineIcon /> } onClick={ toggleHidden } title='show/hide chat panel' />
                </div>
            </div>
            : <div className='chat-panel-container'>
                <div className='chat-panel-collapsed-container'>
                    <div className='chat-panel-header-close'>
                        <Button value={ <XCircleOutlineIcon /> } onClick={ toggleHidden } title='show/hide chat panel' />
                    </div>
                </div>
                <div className='chat-panel-header'>
                    <div className='chat-panel-header-title'>Live Chat</div>
                    <div className='chat-panel-header-subtitle' onMouseEnter={ toggleUserHover } onMouseLeave={ toggleUserHover }>{ noOfCurrentUsers } player(s) online</div>
                    { (showUserHover && (users.length > 0))
                        ? <div className='chat-panel-users'>
                            { users.map((user) =>
                                <div className='chat-panel-user' key={ user.guid }>{ user.userName }</div>
                            )}
                        </div>
                        : null
                    }
                </div>
                <div className='chat-panel-content'>
                    { sortedChatMessages.map((message) => {
                        switch (message.typeOfMessage) {
                        case 'message':
                            return (<ChatPanelMessage key={ message.guid } message={ message } playerInfo={ playerInfo } />)
                        case 'command':
                            return (<ChatPanelCommand key={ message.guid } message={ message } username={ username } />)
                        case 'error':
                            return (<ChatPanelError key={ message.guid } message={ message } />)
                        default: return null
                        }
                    })}
                    <div className='chat-panel-input'>
                        <input title='Mesage' placeholder='Type your message...' value={ currentMessage } onChange={ changeCurrentMessage } className='chat-panel-input-input' onKeyDown={ inputOnKeyDown } />
                        <Button title='Push refresh to players' value={ <PlaySolidIcon /> } onClick={ addMessage } />
                    </div>
                </div>
            </div>
    )
}

export default ChatPanelView
