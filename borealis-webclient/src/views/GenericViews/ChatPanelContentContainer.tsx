import React, { ReactNode } from 'react'

interface ChatPanelContentContainerProps {
    children: ReactNode,
}

const ChatPanelContentContainer = ({ children }: ChatPanelContentContainerProps) => {
    return (<div className='borealis-chat-panel-content-container'>
        { children }
    </div>)
}

export default ChatPanelContentContainer
