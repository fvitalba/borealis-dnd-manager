import {
    API_LOAD_CHARACTERS,
    API_LOAD_CHAT,
    API_LOAD_MAPS,
    API_LOAD_ROOM,
    API_LOAD_TOKENS,
    API_LOAD_USERS,
    API_AUTHENTICATING_USER,
    API_REGISTERING_USER,
    API_STARTING_SESSION,
    CHARACTER_SAVE,
    GAME_LOAD_MAP,
    GAME_REQUEST_REFRESH,
    WEBSOCKET_OPEN_CONNECTION,
    API_SAVE_ROOM,
    API_SAVE_MAPS,
    API_SAVE_TOKENS,
    API_SAVE_CHAT,
    API_SAVE_CHARACTERS,
    API_SAVE_USERS
} from './loadingTasks'

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

export const LoadingTaskDescriptions = [
    {
        code: WEBSOCKET_OPEN_CONNECTION,
        description: 'Connecting to server',
    },
    {
        code: CHARACTER_SAVE,
        description: 'Saving character',
    },
    {
        code: GAME_REQUEST_REFRESH,
        description: 'Requesting update from host',
    },
    {
        code: GAME_LOAD_MAP,
        description: 'Loading Map',
    },
    {
        code: API_LOAD_ROOM,
        description: 'Loading Room from Database',
    },
    {
        code: API_LOAD_MAPS,
        description: 'Loading Maps from Database',
    },
    {
        code: API_LOAD_TOKENS,
        description: 'Loading Tokens from Database',
    },
    {
        code: API_LOAD_CHAT,
        description: 'Loading Chat from Database',
    },
    {
        code: API_LOAD_CHARACTERS,
        description: 'Loading Characters from Database',
    },
    {
        code: API_LOAD_USERS,
        description: 'Loading Users from Database',
    },
    {
        code: API_AUTHENTICATING_USER,
        description: 'Authenticating user',
    },
    {
        code: API_SAVE_ROOM,
        description: 'Saving Room to Database',
    },
    {
        code: API_SAVE_MAPS,
        description: 'Saving Maps to Database',
    },
    {
        code: API_SAVE_TOKENS,
        description: 'Saving Tokens to Database',
    },
    {
        code: API_SAVE_CHAT,
        description: 'Saving Chat to Database',
    },
    {
        code: API_SAVE_CHARACTERS,
        description: 'Saving Characters to Database',
    },
    {
        code: API_SAVE_USERS,
        description: 'Saving Users to Database',
    },
    {
        code: API_STARTING_SESSION,
        description: 'Starting session'
    },
    {
        code: API_REGISTERING_USER,
        description: 'Registering new user',
    }
]
