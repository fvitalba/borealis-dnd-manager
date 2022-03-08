import Button from './Button'
import { PlaySolidIcon } from './Icons'

const ChatPanelMessage = ({ message, playerInfo }) => {
    return (
        <div className='chat-panel-message'>
            <div className='chat-panel-message-info'>
                <div className='chat-panel-message-username' >{ message.username }</div>
                { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
            </div>
            <div className='chat-panel-message-content'>{ message.message }</div>
        </div>
    )
}

const ChatPanelCommand = ({ message }) => {
    return (
        <div className='chat-panel-command'>
            <div className='chat-panel-command-content'>{ message.message }</div>
        </div>
    )
}

const ChatPanelError = ({ message }) => {
    return (
        <div className='chat-panel-error'>
            <div className='chat-panel-error-content'>{ message.message }</div>
        </div>
    )
}

const ChatPanelView = ({ /* chatPanelHidden, toggleHidden, */ noOfCurrentUsers, /* users, */ currentMessage, changeCurrentMessage, addMessage, chatMessages, inputOnKeyDown }) => {
    const playerInfo = 'lvl. XX Barbarian'
    const sortedChatMessages = chatMessages.sort((a, b) => a.timestamp - b.timestamp)
    return (
        <div className='chat-panel-container'>
            <div className='chat-panel-header'>
                <div className='chat-panel-header-title'>Live Chat</div>
                <div className='chat-panel-header-subtitle'>{ noOfCurrentUsers } player(s) online</div>
            </div>
            <div className='chat-panel-content'>
                { sortedChatMessages.map((message) => {
                    switch (message.typeOfMessage) {
                    case 'message':
                        return (<ChatPanelMessage key={ message.guid } message={ message } playerInfo={ playerInfo } />)
                    case 'command':
                        return (<ChatPanelCommand key={ message.guid } message={ message } />)
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
