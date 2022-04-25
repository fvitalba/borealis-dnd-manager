import React, { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import UserType from '../enums/UserType'
import { useLoading } from '../hooks/useLoading'
import { useWebSocket } from '../hooks/useSocket'
import StateInterface from '../interfaces/StateInterface'
import { MetadataState, setGameSettings, setSessionToken } from '../reducers/metadataReducer'
import { setUsername } from '../reducers/settingsReducer'
import { API_AUTHENTICATING_USER, API_REGISTERING_USER, API_STARTING_SESSION } from '../utils/loadingTasks'
import { authenticateUser, registerUser, startSession } from '../utils/loginHandler'
import GameSetupLoginView from '../views/GameSetup/GameSetupLoginView'

interface GameSetupLoginState {
    userName: string,
    userGuid: string,
    password: string,
    email: string,
    sessionToken: string,
    newUser: boolean,
    isGuest: boolean,
    rememberUser: boolean,
}

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

interface GameSetupLoginProps {
    metadataState: MetadataState,
    setGameSettings: (userType: UserType | undefined, userGuid: string, isGuest: boolean, roomName: string, roomGuid: string) => void,
    setUsername: (username: string) => void,
    setSessionToken: (sessionToken: string) => void,
}

const GameSetupLogin = ({ metadataState, setGameSettings, setUsername, setSessionToken }: GameSetupLoginProps) => {
    const [gameSetupLoginState, setGameSetupLoginState] = useState(initialGameSetupLoginState())
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

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
        const authenticationParameters = {
            userGuid: gameSetupLoginState.userGuid,
            userName: gameSetupLoginState.userName,
            secret: gameSetupLoginState.password,   //TODO: hash password
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
                .catch(() => {
                    loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
                    return null
                })
            loadingContext.stopLoadingTask(API_AUTHENTICATING_USER)
        }
        if (currentUser === null)
            throw new Error('User could not be authenticated!')
        else {
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
            }
            // TODO: notify user that the authentication failed
        }
    }

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
