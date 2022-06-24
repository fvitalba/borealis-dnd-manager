import React, { ReactNode } from 'react'

type StateType = 'open' | 'collapsed'

interface ChatPanelActionContainerProps {
    children: ReactNode,
    state: StateType,
}

const ChatPanelActionContainer = ({ children, state }: ChatPanelActionContainerProps) => {
    return (<div className={ state === 'open' ? 'borealis-chat-panel-action-container' : 'borealis-chat-panel-action-container-collapsed'}>
        { children }
    </div>)
}

export default ChatPanelActionContainer
