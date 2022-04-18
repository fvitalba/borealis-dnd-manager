import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import Character from '../classes/Character'
import Message from '../classes/Message'
import User from '../classes/User'
import MessageType from '../enums/MessageType'
import UserType from '../enums/UserType'
import { sendChatMessage, useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { addChatMessage, ChatState } from '../reducers/chatReducer'
import { setUsersFromAPI, UserState } from '../reducers/userReducer'
import { SettingsState } from '../reducers/settingsReducer'
import { CharacterState } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { convertChatMessage } from '../utils/commandHandler'
import { getUsersFromDatabase } from '../utils/apiHandler'
import { ChatCommands } from '../utils/constants'
import ChatPanelView from '../views/ChatPanel/ChatPanelView'

interface ChatPanelState {
    hidden: boolean,
    showHelp: boolean,
    currentMessage: string,
}

const initialChatPanelState = (): ChatPanelState => {
    return {
        hidden: false,
        showHelp: false,
        currentMessage: ''
    }
}

interface ChatPanelProps {
    chatState: ChatState,
    settingsState: SettingsState,
    userState: UserState,
    characterState: CharacterState,
    metadataState: MetadataState,
    addChatMessage: (arg0: Message) => void,
    setUsersFromAPI: (arg0: Array<User>) => void,
}

const ChatPanel = ({ chatState, settingsState, userState, characterState, metadataState, addChatMessage, setUsersFromAPI }: ChatPanelProps) => {
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

    const changeCurrentMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatPanelState({
            ...chatPanelState,
            currentMessage: e.target.value,
        })
    }

    const inputOnKeyDown = (e: React.KeyboardEvent) => {
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
            if (webSocketContext.ws && webSocketContext.wsSettings && (convertedMessage.type !== MessageType.Error ))
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

    const loadUsers = useCallback(() => {
        if (webSocketContext.wsSettings)
            if (webSocketContext.wsSettings.room !== '') {
                getUsersFromDatabase(webSocketContext.wsSettings)
                    .then((result: any) => {
                        const users: Array<User> = result
                        setUsersFromAPI(users)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
    }, [ webSocketContext, chatPanelState, setChatPanelState ])

    useEffect(() => {
        scrollToBottom()
    }, [ chatState.messages ])

    useEffect(() => {
        const interval = setInterval(() => loadUsers(), 5000)
        return () => {
            clearInterval(interval)
        }
    },[ loadUsers ])

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
