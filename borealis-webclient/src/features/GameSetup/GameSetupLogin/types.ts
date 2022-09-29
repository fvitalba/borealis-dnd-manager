import { ChangeEvent } from 'react'
import UserType from '@/enums/UserType'
import { MetadataState } from '@/reducers/metadataReducer'

export interface GameSetupLoginState {
    userName: string,
    userGuid: string,
    password: string,
    email: string,
    sessionToken: string,
    newUser: boolean,
    isGuest: boolean,
    rememberUser: boolean,
}

export interface GameSetupLoginProps {
    metadataState: MetadataState,
    setGameSettings: (userType: UserType | undefined, userGuid: string, isGuest: boolean, roomName: string, roomGuid: string) => void,
    setUsername: (username: string) => void,
    setSessionToken: (sessionToken: string) => void,
}

export interface GameSetupLoginViewProps {
    userName: string,
    onUserNameChange: (event: ChangeEvent<HTMLInputElement>) => void,
    password: string,
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void,
    email: string,
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void,
    newUser: boolean,
    toggleNewUser: () => void,
    isGuest: boolean,
    toggleIsGuest: () => void,
    rememberUser: boolean,
    toggleRememberUser: () => void,
    onSubmitSetup: () => void,
    isSubmitEnabled: boolean,
}
