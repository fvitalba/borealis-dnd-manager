import { connect } from 'react-redux'
import guid from '../controllers/guid'
import { addChararacter, assignCharacter } from '../reducers/characterReducer'
import SelectCharacterView from '../views/SelectCharacterView'

const SelectCharacter = ({ character, metadata, settings, assignCharacter, addChararacter }) => {
    const onCharacterSelect = (e) => {
        assignCharacter(e.target.value)
    }

    const addNewCharacter = () => {
        const newGuid = guid()
        addChararacter({ guid: newGuid, username: settings.username, })
        assignCharacter(newGuid)
    }

    const filteredCharacters = character.characters.filter((stateCharacter) => (stateCharacter.username === settings.username) || (metadata.isHost))

    return (
        <SelectCharacterView
            characters={ filteredCharacters }
            isHost={ metadata.isHost }
            selectedCharacterGuid={ character.myCharacterGuid }
            onCharacterSelect={ onCharacterSelect }
            addNewCharacter={ addNewCharacter }
        />
    )
}

const mapStateToProps = (state) => {
    return {
        character: state.character,
        metadata: state.metadata,
        settings: state.settings,
    }
}

const mapDispatchToProps = {
    assignCharacter,
    addChararacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharacter)
