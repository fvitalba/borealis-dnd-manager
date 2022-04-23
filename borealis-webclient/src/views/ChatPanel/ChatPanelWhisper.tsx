import React, { forwardRef, ForwardedRef } from 'react'
import Message from '../../classes/Message'

interface ChatPanelWhisperProps {
    message: Message,
    username: string,
    playerInfo: string,
}

const ChatPanelWhisper = forwardRef(({ message, username, playerInfo }: ChatPanelWhisperProps, ref: ForwardedRef<HTMLDivElement>) => {
    let textToShow = ''
    if (message.username === username)
        textToShow = `To ${message.targetUsername}: ` + message.privateMessage
    else if (message.targetUsername === username)
        textToShow = `From ${message.username}: ` + message.privateMessage

    if (textToShow === '')
        return <></>

    return (
        <div className='chat-panel-message' ref={ ref }>
            <div className='chat-panel-message-info'>
                <div className='chat-panel-message-username' >{ message.username }</div>
                { playerInfo ? <div className='chat-panel-message-player-info'>| { playerInfo }</div> : null }
            </div>
            <div className='chat-panel-message-content'>{ textToShow }</div>
        </div>
    )
})
ChatPanelWhisper.displayName = 'ChatPanelWhisper'

export default ChatPanelWhisper
