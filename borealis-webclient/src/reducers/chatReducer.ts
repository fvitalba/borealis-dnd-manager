import {
    ADD_CHAT_MESSAGE,
    SET_CHAT_USERNAME,
    OVERWRITE_CHAT
} from '../redux/constants'
import Message from '../classes/Message'

export interface ChatState {
    username: string,
    messages: Array<Message>,
}

export const initialChatState = (): ChatState => {
    return {
        username: '',
        messages: [],
    }
}

interface ChatAction {
    type: string,
    message?: Message,
    username?: string,
    messages?: Array<Message>,
}

const chatReducer = (state = initialChatState(), action: ChatAction): ChatState => {
    switch (action.type) {
    case ADD_CHAT_MESSAGE:
        return {
            ...state,
            messages: action.message !== undefined ? state.messages.concat(action.message): state.messages,
        }
    case SET_CHAT_USERNAME:
        return {
            ...state,
            username: action.username !== undefined ? action.username : state.username,
        }
    case OVERWRITE_CHAT:
        return {
            ...state,
            messages: action.messages !== undefined ? action.messages : state.messages,
        }
    default:
        return state
    }
}

//#region Action Creators
export const addChatMessage = (newMessage: Message): ChatAction => {
    return {
        type: ADD_CHAT_MESSAGE,
        message: newMessage,
    }
}

export const setUsername = (newUsername: string): ChatAction => {
    return {
        type: SET_CHAT_USERNAME,
        username: newUsername,
    }
}

export const overwriteChat = (newMessages: Array<Message>): ChatAction => {
    return {
        type: OVERWRITE_CHAT,
        messages: newMessages,
    }
}
//#endregion Action Creators

export default chatReducer
