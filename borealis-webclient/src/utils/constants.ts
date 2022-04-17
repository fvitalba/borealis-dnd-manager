interface ChatCommand {
    command: string,
    shortcut: string,
    description: string,
    example: string,
}

export const ChatCommands: Array<ChatCommand> = [{
    command: '/roll <NO. OF DICE>d<DICE TYPE>',
    shortcut: '/r',
    description: 'Rolls the specified dice.',
    example: '/roll 3d6, /roll 1d20 + DEX, /roll 1d12 + 5 DADV',
},
{
    command: '/hiddenroll <NO. OF DICE>d<DICE TYPE>',
    shortcut: '/hr',
    description: 'Rolls the specified dice, only shows the results to self.',
    example: '/hiddenroll 2d12',
},
{
    command: '/whisper <TARGET USERNAME> <MESSAGE>',
    shortcut: '/w',
    description: 'Sends a message only to the specified target.',
    example: '/whisper PC be careful with that!',
}]

