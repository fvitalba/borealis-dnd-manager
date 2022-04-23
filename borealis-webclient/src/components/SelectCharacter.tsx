import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Character from '../classes/Character'
import UserType from '../enums/UserType'
import StateInterface from '../interfaces/StateInterface'
import { addCharacter, assignCharacter, CharacterState } from '../reducers/characterReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { SettingsState } from '../reducers/settingsReducer'
import guid from '../utils/guid'
import SelectCharacterView from '../views/CharacterStats/SelectCharacterView'

interface SelectCharacterProps {
    characterState: CharacterState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    assignCharacter: (arg0: string) => void,
    addCharacter: (arg0: Character) => void,
}

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
