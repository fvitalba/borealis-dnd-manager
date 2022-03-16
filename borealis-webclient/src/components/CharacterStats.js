//import { useEffect } from 'react'
import { connect } from 'react-redux'
import CharacterStatsView from '../views/CharacterStatsView'

const CharacterStats = ({ toggleOnCharacterStats, character }) => {
    if (!toggleOnCharacterStats)
        return null

    const selectedCharacter = character.characters.filter((stateCharacter) => stateCharacter.guid === character.myCharacterGuid)[0]

    const modifierFromStat = (statValue) => {
        const modifier = Math.floor((statValue - 10) / 2)
        switch(true) {
        case modifier === 0:
            return modifier
        case modifier > 0:
            return '+' + modifier
        case modifier < 0:
            return modifier
        }
    }

    const modifiers = {
        strength: selectedCharacter ? modifierFromStat(selectedCharacter.strength) : 0,
        dexterity: selectedCharacter ? modifierFromStat(selectedCharacter.dexterity) : 0,
        constitution: selectedCharacter ? modifierFromStat(selectedCharacter.constitution) : 0,
        intelligence: selectedCharacter ? modifierFromStat(selectedCharacter.intelligence) : 0,
        wisdom: selectedCharacter ? modifierFromStat(selectedCharacter.wisdom) : 0,
        charisma: selectedCharacter ? modifierFromStat(selectedCharacter.charisma) : 0,
    }

    const setCharacterName = () => {
        //TODO: implement setCharacterName
    }

    const setCharacterClass = () => {

    }

    const onStatChange = () => {
        //TODO: implement onStatChange
    }

    return (
        <CharacterStatsView
            showCharacterStats={ character.myCharacterGuid !== '' }
            character={ selectedCharacter }
            modifiers={ modifiers }
            characterName={ selectedCharacter ? selectedCharacter.name : '' }
            setCharacterName={ setCharacterName }
            setCharacterClass={ setCharacterClass }
            onStatChange={ onStatChange } />
    )
}

const mapStateToProps = (state) => {
    return {
        character: state.character,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats)
