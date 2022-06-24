import React, { ReactNode } from 'react'

interface ChatPanelHeaderContainerProps {
    children: ReactNode,
}

const ChatPanelHeaderContainer = ({ children }: ChatPanelHeaderContainerProps) => {
    return (<div className='borealis-chat-panel-header-container'>
        { children }
    </div>)
}

export default ChatPanelHeaderContainer
