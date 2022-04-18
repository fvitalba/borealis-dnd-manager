import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'

interface ChatPanelMessageProps {
    message: Message,
    playerInfo: string,
}

const ChatPanelMessage = forwardRef(({ message, playerInfo }: ChatPanelMessageProps, ref: ForwardedRef<HTMLDivElement>) => {
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

export default ChatPanelMessage
