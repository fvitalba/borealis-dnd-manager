export interface ChatCommand {
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

interface ColorSelection {
    bg: string,
    css: string,
}

export const ColorSelections: Array<ColorSelection> = [{
    bg: 'bg-violet-600',
    css: '#7c3aed',
},
{
    bg: 'bg-blue-600',
    css: '#2564eb',
},
{
    bg: 'bg-cyan-600',
    css: '#0890b2',
},
{
    bg: 'bg-green-600',
    css: '#16a34a',
},
{
    bg: 'bg-yellow-400',
    css: '#facc15',
},
{
    bg: 'bg-red-600',
    css: '#dc2626',
},
{
    bg: 'bg-neutral-500',
    css: '#737373',
},
{
    bg: 'bg-neutral-50',
    css: '#fafafa',
}]
