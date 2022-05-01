import React, { ChangeEvent } from 'react'
import { Room } from '../../components/GameSetupRoomSelection'
import UserType from '../../enums/UserType'
import ActionTextInput from '../GenericViews/ActionTextInput'
import FormContainer from '../GenericViews/FormContainer'
import FormRow from '../GenericViews/FormRow'
import ActionButton from '../GenericViews/ActionButton'
import OptionSelector from '../GenericViews/OptionSelector'
import { PlaySolidIcon } from '../Icons'

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

const GameSetupRoomSelectionView = ({ userName, newRoomName, onNewRoomNameChange, selectedRoomName, onRoomSelect, availableRooms, onSubmitNewRoom, onSubmitSelectRoom, isSubmitNewEnabled, isSubmitSelectionEnabled }: GameSetupRoomSelectionViewProps) => {
    let rooomSelectorOptions = [<option key={ '' } value={ 'None' } >{ 'No room selected' }</option>]
    rooomSelectorOptions = rooomSelectorOptions.concat(availableRooms.map((room) => <option key={ room.id } value={ room.name } >{ `${room.name} (${UserType[room.userRole]})` }</option>))

    return (
        <FormContainer>
            <h1>Borealis D&D - Select Room</h1>
            <h3>{ `Welcome back ${userName}, what would you like to do?` }</h3>
            <FormRow>
                <ActionTextInput title='New Room Name' placeholder='New Room Name' value={ newRoomName } onChange={ onNewRoomNameChange } label='New room:' buttonValue={ <PlaySolidIcon className='w-8 h-8' /> } onClick={ onSubmitNewRoom } disabled={ !isSubmitNewEnabled } />
            </FormRow>
            <FormRow>
                <OptionSelector title='Select Room' label='Select existing Room:' value={ selectedRoomName } onChange={ onRoomSelect } options={ rooomSelectorOptions } />
                <ActionButton title='Load game' value={ <PlaySolidIcon className='w-10 h-10 text-primary-dark' /> } onClick={ onSubmitSelectRoom } disabled={ !isSubmitSelectionEnabled } />
            </FormRow>
        </FormContainer>
    )
}

export default GameSetupRoomSelectionView
