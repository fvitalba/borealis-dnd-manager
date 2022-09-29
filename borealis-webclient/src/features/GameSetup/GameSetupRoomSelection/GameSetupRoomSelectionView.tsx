import React, { ChangeEvent } from 'react'
import UserType from '../../../enums/UserType'
import ActionTextInput from '../../../views/GenericViews/ActionTextInput'
import FormContainer from '../../../views/GenericViews/FormContainer'
import FormRow from '../../../views/GenericViews/FormRow'
import { ActionButton } from '../../../components/ActionButton'
import TextInputSelector from '../../../views/GenericViews/TextInputSelector'
import { BorealisPlayIcon } from '../../../views/Icons'
import { Room } from './types'

interface GameSetupRoomSelectionViewProps {
    userName: string,
    newRoomName: string,
    onNewRoomNameChange: (newRoomName: ChangeEvent<HTMLInputElement>) => void,
    selectedRoomName: string,
    onRoomSelect: (roomIndex: number) => void,
    searchingRoom: boolean,
    roomFound: boolean,
    availableRooms: Array<Room>,
    onSubmitNewRoom: () => void,
    onSubmitSelectRoom: () => void,
    isSubmitNewEnabled: boolean,
    isSubmitSelectionEnabled: boolean,
}

const GameSetupRoomSelectionView = ({ userName, newRoomName, onNewRoomNameChange, selectedRoomName, onRoomSelect, availableRooms, onSubmitNewRoom, onSubmitSelectRoom, isSubmitNewEnabled, isSubmitSelectionEnabled }: GameSetupRoomSelectionViewProps) => {
    const roomOptions = availableRooms.map((room, index) => {
        return {
            index: index,
            caption: `${room.name} (${UserType[room.userRole]})`,
        }
    }).filter((option) => option.caption !== undefined)

    const onSelectElement = (elementIndex: number) => {
        onRoomSelect(elementIndex)
    }

    return (
        <FormContainer>
            <h1>Borealis D&D - Select Room</h1>
            <h3>{ `Welcome back ${userName}, what would you like to do?` }</h3>
            <FormRow>
                <ActionTextInput title='New Room Name' placeholder='New Room Name' value={ newRoomName } onChange={ onNewRoomNameChange } label='New room:' buttonValue={ <BorealisPlayIcon className='w-8 h-8' /> } onClick={ onSubmitNewRoom } disabled={ !isSubmitNewEnabled } autofocus={ true } />
            </FormRow>
            <FormRow>
                <TextInputSelector title='Select Room' placeholder='Select Room' value={ selectedRoomName } onSelectElement={ onSelectElement } label='Select existing Room:' options={ roomOptions } />
                <ActionButton title='Load game' value={ <BorealisPlayIcon /> } onClick={ onSubmitSelectRoom } disabled={ !isSubmitSelectionEnabled } />
            </FormRow>
        </FormContainer>
    )
}

export default GameSetupRoomSelectionView
