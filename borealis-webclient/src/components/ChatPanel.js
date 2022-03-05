import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import { usersUrl } from '../contexts/WebSocketProvider'
import { addChatMessage } from '../reducers/chatReducer'
import ChatPanelView from '../views/ChatPanelView'

const initialChatPanelState = () => {
    return {
        hidden: false,
        currentMessage: '',
        currentUsers: 0,
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

    const loadUsers = useCallback(() => {
        if (wsSettings.room) {
            const requestUrl = usersUrl(wsSettings.room)
            console.log(requestUrl)
            fetch(requestUrl)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    if (data.length !== chatPanelState.currentUsers) {
                        setChatPanelState({
                            ...chatPanelState,
                            currentUsers: data.length,
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [ wsSettings.room ])

    useEffect(() => {
        const interval = setInterval(() => loadUsers(), 5000)
        return () => {
            clearInterval(interval)
        }
    },[ loadUsers ])

    return (
        <ChatPanelView
            chatPanelHidden={ chatPanelState.hidden }
            toggleHidden={ toggleHidden }
            currentUsers={ chatPanelState.currentUsers }
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
