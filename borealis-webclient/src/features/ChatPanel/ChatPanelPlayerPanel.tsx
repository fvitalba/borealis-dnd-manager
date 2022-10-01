import React from 'react'
import UserType from '@/enums/UserType'
import { ChatPanelPlayerPanelProps } from './types'

const ChatPanelPlayerPanel = ({ onMouseEnter, onMouseLeave, users, showUserList }: ChatPanelPlayerPanelProps) => {
    return (
        <>
            <div className='borealis-chat-panel-player-text' onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave }>{ users.length } player(s) online</div>
            { (showUserList && (users.length > 0))
                ? <div className='borealis-chat-panel-player-list-container'>
                    { users.map((user) =>
                        <div className='borealis-chat-panel-player-entry' key={ user.name }>{ user.name } ({ UserType[user.type] })</div>
                    )}
                </div>
                : null
            }
        </>
    )
}

export default ChatPanelPlayerPanel
