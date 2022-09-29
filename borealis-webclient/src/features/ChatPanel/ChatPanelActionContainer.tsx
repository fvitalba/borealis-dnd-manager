import React from 'react'
import { ChatPanelActionContainerProps } from './types'

const ChatPanelActionContainer = ({ children, state }: ChatPanelActionContainerProps) => {
    return (<div className={ state === 'open' ? 'borealis-chat-panel-action-container' : 'borealis-chat-panel-action-container-collapsed'}>
        { children }
    </div>)
}

export default ChatPanelActionContainer
