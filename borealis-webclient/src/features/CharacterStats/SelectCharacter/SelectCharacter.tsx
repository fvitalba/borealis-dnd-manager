import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Character from '@/classes/Character'
import UserType from '@/enums/UserType'
import StateInterface from '@/interfaces/StateInterface'
import { addCharacter, assignCharacter } from '@/reducers/characterReducer'
import guid from '@/utils/guid'
import SelectCharacterView from './SelectCharacterView'
import { SelectCharacterProps } from './types'

const SelectCharacter = ({ characterState, metadataState, settingsState, assignCharacter, addCharacter }: SelectCharacterProps) => {
    const onCharacterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        assignCharacter(e.target.value)
    }

    const addNewCharacter = () => {
        const newCharacter = new Character(guid(), '', 0)
        addCharacter(newCharacter)
        assignCharacter(newCharacter.guid)
    }

    const filteredCharacters = characterState.characters.filter((stateCharacter) => (stateCharacter.username === settingsState.username) || (metadataState.userType === UserType.host))

    return (
        <SelectCharacterView
            characters={ filteredCharacters }
            isHost={ metadataState.userType === UserType.host }
            selectedCharacterGuid={ characterState.currentCharacterGuid }
            onCharacterSelect={ onCharacterSelect }
            addNewCharacter={ addNewCharacter }
        />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        characterState: state.character,
        metadataState: state.metadata,
        settingsState: state.settings,
    }
}

const mapDispatchToProps = {
    assignCharacter,
    addCharacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharacter)
