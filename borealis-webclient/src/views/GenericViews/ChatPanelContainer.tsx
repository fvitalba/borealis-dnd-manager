import React, { ReactNode } from 'react'

interface ChatPanelContainerProps {
    children: ReactNode,
}

const ChatPanelContainer = ({ children }: ChatPanelContainerProps) => {
    return (<div className='borealis-chat-panel-container'>
        { children }
    </div>)
}

export default ChatPanelContainer
