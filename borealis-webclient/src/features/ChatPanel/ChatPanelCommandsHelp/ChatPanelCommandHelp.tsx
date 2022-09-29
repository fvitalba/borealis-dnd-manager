import React from 'react'
import { ChatPanelCommandProps } from './types'

const ChatPanelCommandHelp = ({ command }: ChatPanelCommandProps) => {
    return (
        <tr>
            <td className='chat-panel-help-td'>{ command.command }</td>
            <td className='chat-panel-help-td'>{ command.description }</td>
            <td className='chat-panel-help-td'>{ command.example }</td>
        </tr>
    )
}

export default ChatPanelCommandHelp
