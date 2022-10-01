import React from 'react'
import ChatPanelCommandHelp from './ChatPanelCommandHelp'
import { ChatPanelCommandsHelpProps } from './types'

const ChatPanelCommandsHelp = ({ commands }: ChatPanelCommandsHelpProps) => {
    return (
        <div className='chat-panel-help-container'>
            <table className='chat-panel-help-table'>
                <thead>
                    <tr>
                        <th className='chat-panel-help-th'>Command</th>
                        <th className='chat-panel-help-th'>Description</th>
                        <th className='chat-panel-help-th'>Example</th>
                    </tr>
                </thead>
                <tbody>
                    { commands.map((command) =>
                        <ChatPanelCommandHelp key={ command.shortcut } command={ command } />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ChatPanelCommandsHelp
