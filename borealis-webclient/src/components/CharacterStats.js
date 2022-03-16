import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { characterTemplate, updateCharacter, deleteCharacter } from '../reducers/characterReducer'
import { useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import { saveCharacterToDatabase } from '../controllers/apiHandler'
import CharacterStatsView from '../views/CharacterStatsView'

const CharacterStats = ({ toggleOnCharacterStats, character, user, metadata, updateCharacter, deleteCharacter }) => {
    if (!toggleOnCharacterStats)
        return null

    const [selectedCharacter, setSelectedCharacter] = useState(characterTemplate)
    // eslint-disable-next-line no-unused-vars
    const [_webSocket, wsSettings] = useWebSocket()
    // eslint-disable-next-line no-unused-vars
    const [_isLoading, setIsLoading] = useLoading()

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

    useEffect(() => {
        const currCharacter = character.characters.filter((stateCharacter) => stateCharacter.guid === character.myCharacterGuid)[0]
        if (currCharacter)
            setSelectedCharacter(currCharacter)
    }, [ character.myCharacterGuid ])

    const modifiers = {
        strength: modifierFromStat(selectedCharacter.strength),
        dexterity: modifierFromStat(selectedCharacter.dexterity),
        constitution: modifierFromStat(selectedCharacter.constitution),
        intelligence: modifierFromStat(selectedCharacter.intelligence),
        wisdom: modifierFromStat(selectedCharacter.wisdom),
        charisma: modifierFromStat(selectedCharacter.charisma),
    }

    const setCharacterName = (newName) => {
        setSelectedCharacter({
            ...selectedCharacter,
            name: newName,
        })
    }

    const setCharacterClass = (newClass) => {
        setSelectedCharacter({
            ...selectedCharacter,
            class: newClass,
        })
    }

    const onStatChange = (attributeName, e) => {
        setSelectedCharacter({
            ...selectedCharacter,
            [attributeName]: parseInt(e.target.value),
        })
    }

    const onSelectUser = (e) => {
        setSelectedCharacter({
            ...selectedCharacter,
            userGuid: e.target.value,
        })
    }

    const saveCurrCharacter = () => {
        setIsLoading(true)
        updateCharacter(selectedCharacter)
        saveCharacterToDatabase(wsSettings, JSON.stringify(selectedCharacter))
            .then(() => {
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }

    const deleteCurrCharacter = () => {
        if (!window.confirm('Are you sure you want to delete the character?'))
            return
        deleteCharacter(selectedCharacter.guid)
    }

    return (
        <CharacterStatsView
            showCharacterStats={ character.myCharacterGuid !== '' }
            isHost={ metadata.isHost }
            character={ selectedCharacter }
            users={ user.users }
            modifiers={ modifiers }
            characterName={ selectedCharacter.name }
            setCharacterName={ setCharacterName }
            setCharacterClass={ setCharacterClass }
            onStatChange={ onStatChange }
            onSelectUser={ onSelectUser }
            saveCharacter={ saveCurrCharacter }
            deleteCharacter={ deleteCurrCharacter } />
    )
}

const mapStateToProps = (state) => {
    return {
        character: state.character,
        metadata: state.metadata,
        user: state.user,
    }
}

const mapDispatchToProps = {
    updateCharacter,
    deleteCharacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats)
