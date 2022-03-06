import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import { usersUrl } from '../contexts/WebSocketProvider'
import { convertChatMessage } from '../controllers/commandHandler'
import { addChatMessage } from '../reducers/chatReducer'
import ChatPanelView from '../views/ChatPanelView'

const initialChatPanelState = () => {
    return {
        hidden: false,
        currentMessage: '',
        noOfCurrentUsers: 0,
        users: [],
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

    const inputOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            addMessage()
        }
    }

    const addMessage = () => {
        const playerInfo = {}
        const [convertedMessage, typeOfMessage] = convertChatMessage(settings.username, chatPanelState.currentMessage)
        if (convertedMessage.length > 0) {
            const timestamp = Date.now()
            addChatMessage(settings.username, playerInfo, convertedMessage, timestamp, typeOfMessage)
            sendChatMessage(webSocket, wsSettings, settings.username, playerInfo, convertedMessage, timestamp, typeOfMessage)
            setChatPanelState({
                ...chatPanelState,
                currentMessage: '',
            })
        }
    }

    const loadUsers = useCallback(() => {
        if (wsSettings.room) {
            const requestUrl = usersUrl(wsSettings.room)
            fetch(requestUrl)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    if (data.length !== chatPanelState.noOfCurrentUsers) {
                        setChatPanelState({
                            ...chatPanelState,
                            noOfCurrentUsers: data.length,
                            users: data,
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [ wsSettings.room, chatPanelState, setChatPanelState ])

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
            noOfCurrentUsers={ chatPanelState.noOfCurrentUsers }
            users={ chatPanelState.users }
            currentMessage={ chatPanelState.currentMessage }
            changeCurrentMessage={ changeCurrentMessage }
            addMessage={ addMessage }
            chatMessages={ chat.messages }
            inputOnKeyDown={ inputOnKeyDown } />
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
