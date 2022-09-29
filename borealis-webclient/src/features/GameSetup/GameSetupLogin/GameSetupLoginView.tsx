import React from 'react'
import { BorealisPlayIcon } from '@/views/Icons'
import { TextInput } from '@/components/TextInput'
import { MaskedTextInput } from '@/components/MaskedTextInput'
import { CheckboxInput } from '@/components/CheckboxInput'
import { FormContainer } from '@/components/Form'
import { FormRow } from '@/components/Form'
import { ActionButton } from '@/components/ActionButton'
import { GameSetupLoginViewProps } from './types'

export const GameSetupLoginView = ({ userName, onUserNameChange, password, onPasswordChange, email, onEmailChange, newUser, toggleNewUser, isGuest, toggleIsGuest, rememberUser, toggleRememberUser, onSubmitSetup, isSubmitEnabled }: GameSetupLoginViewProps) => {
    return (
        <FormContainer>
            <h1>Borealis D&D - Login</h1>
            <FormRow>
                <TextInput title='User name' placeholder='User name' value={ userName } onChange={ onUserNameChange } autofocus={ true } />
            </FormRow>
            <FormRow>
                <MaskedTextInput title='Password' placeholder='Password' value={ password } onChange={ onPasswordChange } disabled={ isGuest } />
                { !newUser && <CheckboxInput title='Continue as guest' value={ isGuest } onChange={ toggleIsGuest } label='Guest' /> }
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
                <ActionButton title='Login' value={ <BorealisPlayIcon /> } onClick={ onSubmitSetup } disabled={ !isSubmitEnabled } />
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
