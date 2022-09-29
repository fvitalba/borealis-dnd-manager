import React from 'react'
import { ChatCommand } from '../../utils/constants'

interface ChatPanelCommandProps {
    command: ChatCommand,
}

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
