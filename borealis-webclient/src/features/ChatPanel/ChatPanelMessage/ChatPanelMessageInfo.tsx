import React from 'react'
import { ChatPanelMessageInfoProps } from './types'

const ChatPanelMessageInfo = ({ message, username, playerInfo }: ChatPanelMessageInfoProps) => {
    return (
        <div className='borealis-chat-panel-message-info'>
            <div className={ username === message.username ? 'borealis-chat-panel-message-info-username-own' : 'borealis-chat-panel-message-info-username-other' } >{ message.username }</div>
            { playerInfo ? <div className='borealis-chat-panel-message-player-info'>| { playerInfo }</div> : null }
        </div>
    )
}

export default ChatPanelMessageInfo
