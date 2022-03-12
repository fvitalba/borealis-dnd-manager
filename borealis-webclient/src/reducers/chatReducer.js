import guid from '../controllers/guid'
import { ADD_CHAT_MESSAGE, SET_CHAT_USERNAME, OVERWRITE_CHAT } from '../redux/constants'

const initialChatState = () => {
    return {
        username: '',
        messages: [],
    }
}

const chatMessage = () => {
    return {
        guid: undefined,
        timestamp: undefined,
        username: '',
        playerInfo: undefined,
        publicMessage: '',
        privateMessage: '',
        typeOfMessage: '',
    }
}

const chatReducer = (state = initialChatState(), action) => {
    let message = chatMessage
    switch (action.type) {
    case ADD_CHAT_MESSAGE:
        message = {
            ...message,
            guid: guid(),
            username: action.username,
            timestamp: action.timestamp,
            privateMessage: action.privateMessageText,
            publicMessage: action.publicMessageText,
            typeOfMessage: action.typeOfMessage,
            playerInfo: action.playerInfo,
        }
        return {
            ...state,
            messages: state.messages.concat(message)
        }
    case SET_CHAT_USERNAME:
        return {
            ...state,
            username: action.username,
        }
    case OVERWRITE_CHAT:
        return {
            ...state,
            ...action.chat,
        }
    default:
        return state
    }
}

//#region Action Creators
export const addChatMessage = (username, playerInfo, publicMessageText, privateMessageText, timestamp, typeOfMessage) => {
    return {
        type: ADD_CHAT_MESSAGE,
        username: username,
        publicMessageText: publicMessageText,
        privateMessageText: privateMessageText,
        playerInfo: playerInfo,
        typeOfMessage: typeOfMessage,
        timestamp: timestamp ? timestamp : Date.now(),
    }
}

export const setUsername = (newUsername) => {
    return {
        type: SET_CHAT_USERNAME,
        username: newUsername,
    }
}

export const overwriteChat = (newChat) => {
    return {
        type: OVERWRITE_CHAT,
        chat: newChat,
    }
}
//#endregion Action Creators

export default chatReducer
