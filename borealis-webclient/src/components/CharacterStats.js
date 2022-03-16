import { useEffect } from 'react'
import { connect } from 'react-redux'
import CharacterStatsView from '../views/CharacterStatsView'

const CharacterStats = ({ toggleOnCharacterStats, /* user, character */ }) => {
    if (!toggleOnCharacterStats)
        return null

    useEffect(() => {

    }, [])

    const character = {
        name: '',
        strength: 16,
        dexterity: 6,
        constitution: 20,
        intelligence: 3,
        wisdom: 10,
        charisma: 17,
        proficiency: 2,
        armorclass: 10,
        passivePerception: 10,
        maxHealth: 12,
        currHealth: 12,
        tempHealth: 0,
        level: 1,
        class: 'Paladin',
        maxNoOfHitDice: 1,
        currNoOfHitDice: 1,
        hitDiceType: 12,
    }

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
        strength: modifierFromStat(character.strength),
        dexterity: modifierFromStat(character.dexterity),
        constitution: modifierFromStat(character.constitution),
        intelligence: modifierFromStat(character.intelligence),
        wisdom: modifierFromStat(character.wisdom),
        charisma: modifierFromStat(character.charisma)
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
            character={ character }
            modifiers={ modifiers }
            characterName={ character.name }
            setCharacterName={ setCharacterName }
            setCharacterClass={ setCharacterClass }
            onStatChange={ onStatChange } />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        character: state.character,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats)
