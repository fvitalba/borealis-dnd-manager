import React, { MouseEvent, ChangeEvent } from 'react'
import LoadingOverlay from '../components/LoadingOverlay'
import Button from './Button'
import { PlaySolidIcon, CheckAltOutlineIcon, XAltOutlineIcon, RepeatOutlineIcon } from './Icons'

interface GameSetupToggleButtonProps {
    title: string,
    value: string,
    isSelected: boolean,
    onClick: (arg0: MouseEvent<HTMLButtonElement>) => void,
}

const GameSetupToggleButton = ({ title, value, isSelected, onClick }: GameSetupToggleButtonProps) => {
    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? 'game-setup-selected-button' : 'game-setup-button' }>
            <span>{ value }</span>
        </button>
    )
}

interface GameSetupViewProps {
    roomName: string,
    onRoomNameChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    searchingRoom: boolean,
    roomFound: boolean,
    userName: string,
    onUserNameChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    onToggleUserButton: (arg0: MouseEvent<HTMLButtonElement>) => void,
    onSubmitSetup: () => void,
    isHost: boolean,
    isPlayer: boolean,
    isSubmitEnabled: boolean,
}

const GameSetupView = ({ roomName, onRoomNameChange, searchingRoom, roomFound, userName, onUserNameChange, onToggleUserButton, onSubmitSetup, isHost, isPlayer, isSubmitEnabled }: GameSetupViewProps) => {
    return (
        <div className='game-setup-container'>
            <div className='game-setup-form'>
                <h1>Borealis D&D</h1>
                <div className='game-setup-room-input'>
                    <input title='Room name' placeholder='Room name' value={ roomName } onChange={ onRoomNameChange } className='game-setup-input' />
                    { !searchingRoom
                        ? ( roomFound ? <CheckAltOutlineIcon className='text-green-700' /> : <XAltOutlineIcon className='text-red-700' /> )
                        : <RepeatOutlineIcon className='animate-reverse-spin' />
                    }
                </div>
                <div className='game-setup-user-selection'>
                    <GameSetupToggleButton title='DM' value='DM' isSelected={ isHost } onClick={ onToggleUserButton } />
                    <GameSetupToggleButton title='PC' value='PC' isSelected={ isPlayer } onClick={ onToggleUserButton }/>
                </div>
                <div className='game-setup-user-input'>
                    <input title='User name' placeholder='User name' value={ userName } onChange={ onUserNameChange } className='game-setup-input' />
                    <Button title='Load game' value={ <PlaySolidIcon /> } onClick={ onSubmitSetup } disabled={ !isSubmitEnabled } />
                </div>
            </div>
            <LoadingOverlay />
        </div>
    )
}

export default GameSetupView
