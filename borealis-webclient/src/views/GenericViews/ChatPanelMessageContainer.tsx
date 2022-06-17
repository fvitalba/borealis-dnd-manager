import React, { forwardRef, ForwardedRef, ReactNode } from 'react'

type MessageProperty = 'own' | 'other'

interface ChatPanelMessageContainerProps {
    children: ReactNode,
    property: MessageProperty,
}

const ChatPanelMessageContainer = forwardRef(({ children, property }: ChatPanelMessageContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className={ property === 'own' ? 'borealis-chat-panel-own-message-container' : 'borealis-chat-panel-other-message-container'} ref={ ref }>
            { children }
        </div>
    )
})
ChatPanelMessageContainer.displayName = 'ChatPanelMessage'

export default ChatPanelMessageContainer
