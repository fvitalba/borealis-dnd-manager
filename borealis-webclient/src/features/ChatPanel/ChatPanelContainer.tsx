import React from 'react'
import { ChatPanelContainerProps } from './types'

const ChatPanelContainer = ({ children }: ChatPanelContainerProps) => {
    return (<div className='borealis-chat-panel-container'>
        { children }
    </div>)
}

export default ChatPanelContainer
