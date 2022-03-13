import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import { convertChatMessage } from '../controllers/commandHandler'
import { getUsersFromDatabase } from '../controllers/apiHandler'
import { addChatMessage } from '../reducers/chatReducer'
import ChatPanelView from '../views/ChatPanelView'

const initialChatPanelState = () => {
    return {
        hidden: false,
        showHelp: false,
        currentMessage: '',
        noOfCurrentUsers: 0,
        users: [],
    }
}

const chatCommands = [{
    command: '/roll <NO. OF DICE>d<DICE TYPE>',
    shortcut: '/r',
    description: 'Rolls the specified dice.',
    example: '/roll 3d6',
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

const ChatPanel = ({ chat, settings, addChatMessage }) => {
    const [chatPanelState, setChatPanelState] = useState(initialChatPanelState)
    const [showUserHover, setShowUserHover] = useState(false)
    const [webSocket, wsSettings] = useWebSocket()

    const toggleHidden = () => {
        setChatPanelState({
            ...chatPanelState,
            hidden: !chatPanelState.hidden,
        })
    }

    const toggleHelp = () => {
        setChatPanelState({
            ...chatPanelState,
            showHelp: !chatPanelState.showHelp,
        })
    }

    const toggleUserHover = () => {
        setShowUserHover(!showUserHover)
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
        const convertedMessage = convertChatMessage(settings.username, chatPanelState.currentMessage)
        if (convertedMessage.publicMessage.length > 0) {
            const timestamp = Date.now()
            addChatMessage(settings.username, playerInfo, convertedMessage.publicMessage, convertedMessage.privateMessage, timestamp, convertedMessage.messageType)
            sendChatMessage(webSocket, wsSettings, settings.username, playerInfo, convertedMessage.publicMessage, convertedMessage.privateMessage, timestamp, convertedMessage.messageType)
            setChatPanelState({
                ...chatPanelState,
                currentMessage: '',
            })
        }
    }

    const loadUsers = useCallback(() => {
        if (wsSettings.room) {
            getUsersFromDatabase(wsSettings)
                .then((users) => {
                    if (users.length !== chatPanelState.noOfCurrentUsers) {
                        setChatPanelState({
                            ...chatPanelState,
                            noOfCurrentUsers: users.length,
                            users: users,
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [ wsSettings, chatPanelState, setChatPanelState ])

    useEffect(() => {
        const interval = setInterval(() => loadUsers(), 5000)
        return () => {
            clearInterval(interval)
        }
    },[ loadUsers ])

    return (
        <ChatPanelView
            username={ settings.username }
            chatPanelHidden={ chatPanelState.hidden }
            toggleHidden={ toggleHidden }
            showHelp={ chatPanelState.showHelp }
            toggleHelp={ toggleHelp }
            chatCommands={ chatCommands }
            showUserHover={ showUserHover }
            toggleUserHover={ toggleUserHover }
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
