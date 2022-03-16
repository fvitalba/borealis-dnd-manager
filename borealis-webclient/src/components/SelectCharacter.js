import { connect } from 'react-redux'
import guid from '../controllers/guid'
import { addChararacter, assignCharacter } from '../reducers/characterReducer'
import SelectCharacterView from '../views/SelectCharacterView'

const SelectCharacter = ({ character, metadata, assignCharacter, addChararacter }) => {
    const onCharacterSelect = (e) => {
        assignCharacter(e.target.value)
    }

    const addNewCharacter = () => {
        const newGuid = guid()
        addChararacter({ guid: newGuid, userGuid: metadata.userGuid, })
        assignCharacter(newGuid)
    }

    const filteredCharacters = character.characters.filter((stateCharacter) => (stateCharacter.userGuid === metadata.userGuid) || (metadata.isHost))

    return (
        <SelectCharacterView
            characters={ filteredCharacters }
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
    }
}

const mapDispatchToProps = {
    assignCharacter,
    addChararacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharacter)
