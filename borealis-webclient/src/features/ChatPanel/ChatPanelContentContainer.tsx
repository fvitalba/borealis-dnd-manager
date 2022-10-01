import React from 'react'
import { ChatPanelContentContainerProps } from './types'

const ChatPanelContentContainer = ({ children }: ChatPanelContentContainerProps) => {
    return (<div className='borealis-chat-panel-content-container'>
        { children }
    </div>)
}

export default ChatPanelContentContainer
