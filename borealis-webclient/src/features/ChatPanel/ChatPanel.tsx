import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { connect } from 'react-redux'
import Character from '@/classes/Character'
import MessageType from '@/enums/MessageType'
import UserType from '@/enums/UserType'
import { sendChatMessage, useWebSocket } from '@/hooks/useSocket'
import StateInterface from '@/interfaces/StateInterface'
import { addChatMessage } from '@/reducers/chatReducer'
import { setUsersFromAPI } from '@/reducers/userReducer'
import { convertChatMessage } from '@/utils/commandHandler'
import { ChatCommands } from '@/utils/constants'
import ChatPanelView from './ChatPanelView'
import { ChatPanelState, ChatPanelProps } from './types'

const initialChatPanelState = (): ChatPanelState => {
    return {
        hidden: false,
        showHelp: false,
        currentMessage: ''
    }
}

const ChatPanel = ({ chatState, settingsState, userState, characterState, metadataState, addChatMessage }: ChatPanelProps) => {
    const [chatPanelState, setChatPanelState] = useState(initialChatPanelState())
    const [showUserHover, setShowUserHover] = useState(false)
    const endOfMessagesRef = useRef<HTMLDivElement>(null)
    const webSocketContext = useWebSocket()

    const currentCharacter = characterState.currentCharacterGuid
        ? characterState.characters.filter((currCharacter) => currCharacter.guid === characterState.currentCharacterGuid)[0]
        : new Character('', '', 0)

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

    const changeCurrentMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setChatPanelState({
            ...chatPanelState,
            currentMessage: e.target.value,
        })
    }

    const inputOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addMessage()
        }
    }

    const getPlayerInfo = () => {
        if (metadataState.userType === UserType.host)
            return 'Dungeon Master'
        else {
            return currentCharacter ? currentCharacter.getCharacterClassInfo() : ''
        }
    }

    const addMessage = () => {
        const playerInfo = getPlayerInfo()
        const convertedMessage = convertChatMessage(settingsState.username, chatPanelState.currentMessage, currentCharacter, playerInfo)
        if ((convertedMessage.publicMessage.length > 0) || (convertedMessage.privateMessage.length > 0)) {
            addChatMessage(convertedMessage)
            if (webSocketContext.ws && (convertedMessage.type !== MessageType.Error ))
                sendChatMessage(webSocketContext.ws, webSocketContext.wsSettings, convertedMessage)
            setChatPanelState({
                ...chatPanelState,
                currentMessage: '',
            })
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [ chatState.messages ])

    return (
        <ChatPanelView
            username={ settingsState.username }
            chatPanelHidden={ chatPanelState.hidden }
            toggleHidden={ toggleHidden }
            showHelp={ chatPanelState.showHelp }
            toggleHelp={ toggleHelp }
            chatCommands={ ChatCommands }
            showUserHover={ showUserHover }
            toggleUserHover={ toggleUserHover }
            noOfCurrentUsers={ userState.users.length }
            users={ userState.users }
            currentMessage={ chatPanelState.currentMessage }
            changeCurrentMessage={ changeCurrentMessage }
            addMessage={ addMessage }
            chatMessages={ chatState.messages }
            inputOnKeyDown={ inputOnKeyDown }
            endOfMessagesRef={ endOfMessagesRef } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
        settingsState: state.settings,
        chatState: state.chat,
        userState: state.user,
        characterState: state.character,
    }
}

const mapDispatchToProps = {
    addChatMessage,
    setUsersFromAPI,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanel)
