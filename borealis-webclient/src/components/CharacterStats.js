import CharacterStatsView from '../views/CharacterStatsView'

const CharacterStats = ({ toggleOnCharacterStats }) => {
    if (!toggleOnCharacterStats)
        return null

    const character = {
        name: '',
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
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
            characterName={ character.name }
            setCharacterName={ setCharacterName }
            setCharacterClass={ setCharacterClass }
            onStatChange={ onStatChange } />
    )
}

export default CharacterStats
