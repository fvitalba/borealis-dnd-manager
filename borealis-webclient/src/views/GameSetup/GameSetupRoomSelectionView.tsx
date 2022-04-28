import React, { ChangeEvent } from 'react'
import { Room } from '../../components/GameSetupRoomSelection'
import Button from '../Button'
import { CheckAltOutlineIcon, PlaySolidIcon, RepeatOutlineIcon, XAltOutlineIcon } from '../Icons'

interface GameSetupRoomSelectionViewProps {
    userName: string,
    newRoomName: string,
    onNewRoomNameChange: (arg0: ChangeEvent<HTMLInputElement>) => void,
    selectedRoomName: string,
    onRoomSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    searchingRoom: boolean,
    roomFound: boolean,
    availableRooms: Array<Room>,
    onSubmitNewRoom: () => void,
    onSubmitSelectRoom: () => void,
    isSubmitNewEnabled: boolean,
    isSubmitSelectionEnabled: boolean,
}

const GameSetupRoomSelectionView = ({ userName, newRoomName, onNewRoomNameChange, selectedRoomName, onRoomSelect, searchingRoom, roomFound, availableRooms, onSubmitNewRoom, onSubmitSelectRoom, isSubmitNewEnabled, isSubmitSelectionEnabled }: GameSetupRoomSelectionViewProps) => {
    return (
        <div className='game-setup-form'>
            <h1>Borealis D&D - Select Room</h1>
            <h4>{ `Welcome ${userName}, what would you like to do?` }</h4>
            <div className='game-setup-user-input'>
                <label className='character-stats-label'>New room: </label>
                <input title='Room name' placeholder='Room name' value={ newRoomName } onChange={ onNewRoomNameChange } className='game-setup-input' />
                { !searchingRoom
                    ? ( roomFound ? <CheckAltOutlineIcon className='text-green-700' /> : <XAltOutlineIcon className='text-red-700' /> )
                    : <RepeatOutlineIcon className='animate-reverse-spin' />
                }
                <Button title='Load game' value={ <PlaySolidIcon /> } onClick={ onSubmitNewRoom } disabled={ !isSubmitNewEnabled } />
            </div>
            <div className='game-setup-user-input'>
                <label className='character-stats-label'>Select existing: </label>
                <select value={ selectedRoomName } onChange={ onRoomSelect } title='which room' className='game-setup-input'>
                    <option key={ '' } value={ 'None' } >{ 'No room selected' }</option>
                    { availableRooms.map((room) => (
                        <option key={ room.id } value={ room.name } >{ `${room.name} (${room.userRole})` }</option>
                    ))}
                </select>
                <Button title='Load game' value={ <PlaySolidIcon /> } onClick={ onSubmitSelectRoom } disabled={ !isSubmitSelectionEnabled } />
            </div>
        </div>
    )
}

export default GameSetupRoomSelectionView
