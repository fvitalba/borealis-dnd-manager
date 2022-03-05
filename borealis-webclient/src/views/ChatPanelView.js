import Button from './Button'
import { PlaySolidIcon } from './Icons'

const ChatPanelView = ({ /* chatPanelHidden, toggleHidden, */ noOfCurrentUsers, /* users, */ currentMessage, changeCurrentMessage, addMessage, chatMessages }) => {
    const playerInfo = 'lvl. XX Barbarian'
    const sortedChatMessages = chatMessages.sort((a, b) => a.timestamp - b.timestamp)
    return (
        <div className='chat-panel-container'>
            <div className='chat-panel-header'>
                <div className='chat-panel-header-title'>Live Chat</div>
                <div className='chat-panel-header-subtitle'>{ noOfCurrentUsers } player(s) online</div>
            </div>
            <div className='chat-panel-content'>
                { sortedChatMessages.map((message) =>
                    <div key={ message.guid } className='chat-panel-message'>
                        <div className='chat-panel-message-info'>
                            <div className='chat-panel-message-username' >{ message.username }</div>
                            { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
                        </div>
                        <div className='chat-panel-message-content'>{ message.message }</div>
                    </div>
                )}
                <div className='chat-panel-input'>
                    <input title='Mesage' placeholder='Type your message...' value={ currentMessage } onChange={ changeCurrentMessage } className='chat-panel-input-input' />
                    <Button title='Push refresh to players' value={ <PlaySolidIcon /> } onClick={ addMessage } />
                </div>
            </div>
        </div>
    )
}

export default ChatPanelView
