const ChatPanelView = () => {
    return (
        <div className='chat-panel-container'>
            <div className='chat-panel-header'>
                <div className='chat-panel-header-title'>Live Chat</div>
                <div className='chat-panel-header-subtitle'>2 players online</div>
            </div>
            <div className='chat-panel-content'>
                <div className='chat-panel-message'><b>Tobia</b>| lvl. 13 Paladin:<br />LEEEROY JENKINS!</div>
                <div className='chat-panel-message'><b>Fabio</b>| lvl. 12 Ranger:<br />DARF ICH SEINEN DÖDEL VERGOLDEN?</div>
                <input title='Mesage' placeholder='Type your message...' className='chat-panel-input' />
            </div>
        </div>
    )
}

export default ChatPanelView
