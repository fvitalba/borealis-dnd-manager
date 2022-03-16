import { connect } from 'react-redux'
import { assignCharacter } from '../reducers/characterReducer'
import SelectCharacterView from '../views/SelectCharacterView'

const SelectCharacter = ({ character, metadata, assignCharacter }) => {
    const onCharacterSelect = (e) => {
        assignCharacter(e.target.value)
    }

    const filteredCharacters = character.characters.filter((stateCharacter) => (stateCharacter.userGuid === metadata.userGuid) || (metadata.isHost))

    return (
        <SelectCharacterView
            characters={ filteredCharacters }
            selectedCharacterGuid={ character.myCharacterGuid }
            onCharacterSelect={ onCharacterSelect }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharacter)
