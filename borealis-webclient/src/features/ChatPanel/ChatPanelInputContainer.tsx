import React from 'react'
import { ChatPanelInputContainerProps } from './types'

const ChatPanelInputContainer = ({ children }: ChatPanelInputContainerProps) => {
    return (<div className='borealis-chat-panel-input-container'>
        { children }
    </div>)
}

export default ChatPanelInputContainer
