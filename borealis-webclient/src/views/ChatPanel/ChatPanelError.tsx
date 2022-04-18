import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'

interface ChatPanelErrorProps {
    message: Message,
}

const ChatPanelError = forwardRef(({ message }: ChatPanelErrorProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className='chat-panel-error' ref={ ref }>
            <div className='chat-panel-error-content'>{ message.publicMessage }</div>
        </div>
    )
})
ChatPanelError.displayName = 'ChatPanelError'

export default ChatPanelError
