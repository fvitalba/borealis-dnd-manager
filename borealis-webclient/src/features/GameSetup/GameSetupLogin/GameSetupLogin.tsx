import React, { ChangeEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SHA256 } from 'crypto-js'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'
import { useLoading } from '@/hooks/useLoading'
import { useWebSocket } from '@/hooks/useSocket'
import { useNotification } from '@/hooks/useNotification'
import StateInterface from '@/interfaces/StateInterface'
import { setGameSettings, setSessionToken } from '@/reducers/metadataReducer'
import { setUsername } from '@/reducers/settingsReducer'
import { API_AUTHENTICATING_USER, API_REGISTERING_USER, API_STARTING_SESSION } from '@/utils/loadingTasks'
import { authenticateUser, getloginFromLocalStorage, registerUser, saveLoginToLocalStorage, startSession } from '@/utils/loginHandler'
import { GameSetupLoginView } from './GameSetupLoginView'
import NotificationType from '@/enums/NotificationType'
import { GameSetupLoginState, GameSetupLoginProps } from './types'

const SERVER_KEY = process.env.REACT_APP_SERVER_KEY

const initialGameSetupLoginState = (): GameSetupLoginState => {
    return {
        userName: '',
        userGuid: '',
        email: '',
        password: '',
        sessionToken: '',
        newUser: false,
        isGuest: false,
        rememberUser: false,
    }
}

const GameSetupLogin = ({ metadataState, setGameSettings, setUsername, setSessionToken }: GameSetupLoginProps) => {
    const [gameSetupLoginState, setGameSetupLoginState] = useState(initialGameSetupLoginState())
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()
    const notificationContext = useNotification()

    const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUserName = e.target.value
        setGameSetupLoginState({
            ...gameSetupLoginState,
            userName: newUserName,
        })
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        setGameSetupLoginState({
            ...gameSetupLoginState,
            password: newPassword,
        })
    }

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setGameSetupLoginState({
            ...gameSetupLoginState,
            email: newEmail,
        })
    }

    const toggleNewUser = () => {
        setGameSetupLoginState({
            ...gameSetupLoginState,
            newUser: !gameSetupLoginState.newUser,
        })
    }

    const toggleIsGuest = () => {
        setGameSetupLoginState({
            ...gameSetupLoginState,
            isGuest: !gameSetupLoginState.isGuest,
            rememberUser: gameSetupLoginState.rememberUser ? gameSetupLoginState.isGuest : gameSetupLoginState.rememberUser,
        })
    }

    const toggleRememberUser = () => {
        setGameSetupLoginState({
            ...gameSetupLoginState,
            rememberUser: !gameSetupLoginState.rememberUser,
        })
    }

    const onSubmitSetup = async () => {
        const hashedPassword = SHA256(gameSetupLoginState.password)
        const hmacDigest = Base64.stringify(hmacSHA512(hashedPassword, SERVER_KEY === undefined ? '' : SERVER_KEY))
        const authenticationParameters = {
            userGuid: gameSetupLoginState.userGuid,
            userName: gameSetupLoginState.userName,
            secret: gameSetupLoginState.isGuest ? '' : hmacDigest,
            email: gameSetupLoginState.email,
            isGuest: gameSetupLoginState.isGuest,
        }
        let currentUser
        if (gameSetupLoginState.newUser) {
            loadingContext.startLoadingTask(API_REGISTERING_USER)
            currentUser = await registerUser(webSocketContext.wsSettings, authenticationParameters)
                .catch(() => {
                    loadingContext.stopLoadingTask(API_REGISTERING_USER)
                    return null
                })
            loadingContext.stopLoadingTask(API_REGISTERING_USER)
        } else {
            loadingContext.startLoadingTask(API_AUTHENTICATING_USER)
            currentUser = await authenticateUser(webSocketContext.wsSettings, authenticationParameters)
                .then((result) => result)
                .catch(() => {
                    loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
                    return null
                })
            loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
        }
        if (currentUser === null) {
            notificationContext.addNotification('User not authenticated', 'Your provided credentials were not valid.', NotificationType.Error)
        } else {
            loadingContext.startLoadingTask(API_STARTING_SESSION)
            const sessionParameters = {
                userGuid: currentUser.guid,
                currentSessionId: metadataState.sessionGuid,
                secret: authenticationParameters.secret,
                isGuest: currentUser.guest,
            }
            const sessionToken = await startSession(webSocketContext.wsSettings, sessionParameters)
                .catch(() => {
                    loadingContext.stopLoadingTask(API_STARTING_SESSION)
                    return null
                })
            loadingContext.stopLoadingTask(API_STARTING_SESSION)
            if ((sessionToken !== '') && (sessionToken !== null)) {
                // Success!
                setGameSettings(undefined, currentUser.guid, currentUser.guest, metadataState.roomName, metadataState.roomGuid)
                setUsername(currentUser.name)
                setSessionToken(sessionToken)
                webSocketContext.setWsSettings({
                    ...webSocketContext.wsSettings,
                    userGuid: currentUser.guid,
                    sessionToken: sessionToken,
                })
                saveLoginToLocalStorage(currentUser.guid, sessionToken)
            } else {
                notificationContext.addNotification('Session could not be started', 'Your session was not able to be started. Try again later.', NotificationType.Error)
            }
        }
    }

    useEffect(() => {
        const [userGuid, sessionToken] = getloginFromLocalStorage()
        const authenticationParameters = {
            userGuid: userGuid,
            userName: '',
            secret: '',
            email: '',
            isGuest: false,
            sessionToken: sessionToken,
        }
        loadingContext.startLoadingTask(API_AUTHENTICATING_USER)
        authenticateUser(webSocketContext.wsSettings, authenticationParameters)
            .then((currentUser) => {
                loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
                if (currentUser !== null) {
                    setGameSettings(undefined, currentUser.guid, currentUser.guest, metadataState.roomName, metadataState.roomGuid)
                    setUsername(currentUser.name)
                    setSessionToken(sessionToken)
                    webSocketContext.setWsSettings({
                        ...webSocketContext.wsSettings,
                        userGuid: currentUser.guid,
                        sessionToken: sessionToken,
                    })
                    saveLoginToLocalStorage(currentUser.guid, sessionToken)
                }
            })
            .catch(() => {
                loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
            })
    }, [])

    const isSubmitEnabled = ((gameSetupLoginState.userName !== '') && ((gameSetupLoginState.password !== '') || (gameSetupLoginState.isGuest)))

    return (
        <GameSetupLoginView
            userName={ gameSetupLoginState.userName }
            onUserNameChange={ onUserNameChange }
            password={ gameSetupLoginState.password }
            onPasswordChange={ onPasswordChange }
            email={ gameSetupLoginState.email }
            onEmailChange={ onEmailChange }
            newUser={ gameSetupLoginState.newUser }
            toggleNewUser={ toggleNewUser }
            isGuest={ gameSetupLoginState.isGuest }
            toggleIsGuest={ toggleIsGuest }
            rememberUser={ gameSetupLoginState.rememberUser }
            toggleRememberUser={ toggleRememberUser }
            onSubmitSetup={ onSubmitSetup }
            isSubmitEnabled={ isSubmitEnabled }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        metadataState: state.metadata,
    }
}

const mapDispatchToProps = {
    setGameSettings,
    setUsername,
    setSessionToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSetupLogin)
