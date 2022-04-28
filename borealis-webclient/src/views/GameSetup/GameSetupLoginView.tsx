import React, { ChangeEvent } from 'react'
import Button from '../Button'
import { PlaySolidIcon } from '../Icons'

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
        <div className='game-setup-form'>
            <h1>Borealis D&D - Login</h1>
            <div className='game-setup-user-input'>
                <input title='User name' placeholder='User name' type={ 'text' } value={ userName } onChange={ onUserNameChange } className='game-setup-input' />
            </div>
            <div className='game-setup-user-input'>
                <input title='Password' placeholder='Password' type={ 'password' } value={ password } onChange={ onPasswordChange } className='game-setup-input' disabled={ isGuest } />
                <input title='Continue as guest' type={ 'checkbox' } checked={ isGuest } onChange={ toggleIsGuest } className='game-setup-input' />
                <label className='character-stats-label'>Continue as guest</label>
            </div>
            { newUser
                ? <div className='game-setup-user-input'>
                    <input title='Email' placeholder='Email' type={ 'text' } value={ email } onChange={ onEmailChange } className='game-setup-input' />
                </div>
                : null
            }
            <div className='game-setup-user-input'>
                <input title='Remember me' type={ 'checkbox' } checked={ rememberUser } onChange={ toggleRememberUser } className='game-setup-input' disabled={ isGuest } />
                <label className='character-stats-label'>Remember me</label>
                <Button title='Login' value={ <PlaySolidIcon /> } onClick={ onSubmitSetup } disabled={ !isSubmitEnabled } />
            </div>
            <div className='game-setup-user-input' >
                { newUser
                    ? <p>{ 'Already have an account? ' }<a href='#' onClick={ toggleNewUser }>Log in!</a></p>
                    : <p>{ 'Don\'t have an account? ' }<a href='#' onClick={ toggleNewUser }>Sign up!</a></p>
                }
            </div>
        </div>
    )
}

export default GameSetupLoginView
