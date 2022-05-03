import React, { ChangeEvent } from 'react'
import { PlaySolidIcon } from '../Icons'
import TextInput from '../GenericViews/TextInput'
import MaskedTextInput from '../GenericViews/MaskedTextInput'
import CheckboxInput from '../GenericViews/CheckboxInput'
import FormContainer from '../GenericViews/FormContainer'
import FormRow from '../GenericViews/FormRow'
import ActionButton from '../GenericViews/ActionButton'

interface GameSetupLoginViewProps {
    userName: string,
    onUserNameChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    password: string,
    onPasswordChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    email: string,
    onEmailChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    newUser: boolean,
    toggleNewUser: () => void,
    isGuest: boolean,
    toggleIsGuest: () => void,
    rememberUser: boolean,
    toggleRememberUser: () => void,
    onSubmitSetup: () => void,
    isSubmitEnabled: boolean,
}

const GameSetupLoginView = ({ userName, onUserNameChange, password, onPasswordChange, email, onEmailChange, newUser, toggleNewUser, isGuest, toggleIsGuest, rememberUser, toggleRememberUser, onSubmitSetup, isSubmitEnabled }: GameSetupLoginViewProps) => {
    return (
        <FormContainer>
            <h1>Borealis D&D - Login</h1>
            <FormRow>
                <TextInput title='User name' placeholder='User name' value={ userName } onChange={ onUserNameChange } autofocus={ true } />
            </FormRow>
            <FormRow>
                <MaskedTextInput title='Password' placeholder='Password' value={ password } onChange={ onPasswordChange } disabled={ isGuest } />
                <CheckboxInput title='Continue as guest' value={ isGuest } onChange={ toggleIsGuest } label='Guest' />
            </FormRow>
            { newUser
                ? <FormRow>
                    <TextInput title='Email' placeholder='Email' value={ email } onChange={ onEmailChange }/>
                </FormRow>
                : null
            }
            <FormRow>
                <CheckboxInput title='Remember me' value={ rememberUser } onChange={ toggleRememberUser } label='Remember me' disabled={ isGuest } />
            </FormRow>
            <FormRow reverseDirection={ true } >
                <ActionButton title='Login' value={ <PlaySolidIcon /> } onClick={ onSubmitSetup } disabled={ !isSubmitEnabled } />
            </FormRow>
            <FormRow>
                { newUser
                    ? <p className='borealis-tooltip'>{ 'Already have an account? ' }<a href='#' onClick={ toggleNewUser }>Log in!</a></p>
                    : <p className='borealis-tooltip'>{ 'Don\'t have an account? ' }<a href='#' onClick={ toggleNewUser }>Sign up!</a></p>
                }
            </FormRow>
        </FormContainer>
    )
}

export default GameSetupLoginView
