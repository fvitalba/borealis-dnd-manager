import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'

interface ChatPanelCommandProps {
    message: Message,
    username: string,
}

const ChatPanelCommand = forwardRef(({ message, username }: ChatPanelCommandProps, ref: ForwardedRef<HTMLDivElement>) => {
    const textToShow = message.username === username ? message.privateMessage : message.publicMessage
    return (
        <div className='chat-panel-command' ref={ ref }>
            <div className='chat-panel-command-content'>{ textToShow }</div>
        </div>
    )
})
ChatPanelCommand.displayName = 'ChatPanelCommand'

export default ChatPanelCommand
