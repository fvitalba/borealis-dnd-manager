import React, { ReactNode } from 'react'

interface ChatPanelInputContainerProps {
    children: ReactNode,
}

const ChatPanelInputContainer = ({ children }: ChatPanelInputContainerProps) => {
    return (<div className='borealis-chat-panel-input-container'>
        { children }
    </div>)
}

export default ChatPanelInputContainer
