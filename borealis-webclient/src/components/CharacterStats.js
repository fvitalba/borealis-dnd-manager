//import { useEffect } from 'react'
import { connect } from 'react-redux'
import CharacterStatsView from '../views/CharacterStatsView'

const CharacterStats = ({ toggleOnCharacterStats, character }) => {
    if (!toggleOnCharacterStats || (character.myCharacterGuid === ''))
        return null

    const selectedCharacter = character.characters.filter((stateCharacter) => stateCharacter.guid === character.myCharacterGuid)[0]
    console.log(selectedCharacter)

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
        strength: modifierFromStat(selectedCharacter.strength),
        dexterity: modifierFromStat(selectedCharacter.dexterity),
        constitution: modifierFromStat(selectedCharacter.constitution),
        intelligence: modifierFromStat(selectedCharacter.intelligence),
        wisdom: modifierFromStat(selectedCharacter.wisdom),
        charisma: modifierFromStat(selectedCharacter.charisma)
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
            character={ selectedCharacter }
            modifiers={ modifiers }
            characterName={ selectedCharacter.name }
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
