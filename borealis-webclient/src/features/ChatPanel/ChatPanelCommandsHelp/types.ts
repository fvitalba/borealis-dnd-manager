import { ChatCommand } from '@/utils/constants'

export interface ChatPanelCommandProps {
    command: ChatCommand,
}

export interface ChatPanelCommandsHelpProps {
    commands: Array<ChatCommand>,
}
