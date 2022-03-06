import Button from '../views/Button'
import { PlaySolidIcon } from './Icons'

const GameSetupToggleButton = ({ title, value, isSelected, onClick }) => {
    return (
        <button title={ title } onClick={ onClick } className={ isSelected ? 'game-setup-selected-button' : 'game-setup-button' }>
            <span>{ value }</span>
        </button>
    )
}

const GameSetupView = ({ roomName, onRoomNameChange, userName, onUserNameChange, onToggleUserButton, onSubmitSetup, isHost, isPlayer, isSubmitEnabled }) => {
    return (
        <div className='game-setup-container'>
            <div className='game-setup-form'>
                <div className='game-setup-room-input'>
                    <input title='Room name' placeholder='Room name' value={ roomName } onChange={ onRoomNameChange } className='game-setup-input' />
                </div>
                <div className='game-setup-user-selection'>
                    <GameSetupToggleButton title='DM' value='DM' isSelected={ isHost } onClick={ onToggleUserButton } />
                    <GameSetupToggleButton title='PC' value='PC' isSelected={ isPlayer } onClick={ onToggleUserButton }/>
                </div>
                <div className='game-setup-user-input'>
                    <input title='User name' placeholder='User name' value={ userName } onChange={ onUserNameChange } className='game-setup-input' />
                </div>
                <div className='game-setup-submit'>
                    <Button title='Load game' value={ <PlaySolidIcon /> } onClick={ onSubmitSetup } disabled={ !isSubmitEnabled } />
                </div>
            </div>
        </div>
    )
}

export default GameSetupView
