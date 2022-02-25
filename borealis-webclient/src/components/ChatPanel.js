import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import { addChatMessage } from '../reducers/chatReducer'
import ChatPanelView from '../views/ChatPanelView'

const initialChatPanelState = () => {
    return {
        hidden: false,
        currentMessage: ''
    }
}

const ChatPanel = ({ chat, settings, addChatMessage }) => {
    const [chatPanelState, setChatPanelState] = useState(initialChatPanelState)
    const [webSocket, wsSettings] = useWebSocket()

    const toggleHidden = () => {
        setChatPanelState({
            ...chatPanelState,
            hidden: !chatPanelState.hidden,
        })
    }

    const changeCurrentMessage = (e) => {
        setChatPanelState({
            ...chatPanelState,
            currentMessage: e.target.value,
        })
    }

    const addMessage = () => {
        const playerInfo = {}
        addChatMessage(settings.username, playerInfo, chatPanelState.currentMessage)
        sendChatMessage(webSocket, wsSettings, settings.username, playerInfo, chatPanelState.currentMessage, Date.now())
        setChatPanelState({
            ...chatPanelState,
            currentMessage: '',
        })
    }

    return (
        <ChatPanelView
            chatPanelHidden={ chatPanelState.hidden }
            toggleHidden={ toggleHidden }
            currentMessage={ chatPanelState.currentMessage }
            changeCurrentMessage={ changeCurrentMessage }
            addMessage={ addMessage }
            chatMessages={ chat.messages } />
    )
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
        chat: state.chat,
    }
}

const mapDispatchToProps = {
    addChatMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel)
