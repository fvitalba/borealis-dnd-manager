import React from 'react'
import { ChatPanelHeaderContainerProps } from './types'

const ChatPanelHeaderContainer = ({ children }: ChatPanelHeaderContainerProps) => {
    return (<div className='borealis-chat-panel-header-container'>
        { children }
    </div>)
}

export default ChatPanelHeaderContainer
