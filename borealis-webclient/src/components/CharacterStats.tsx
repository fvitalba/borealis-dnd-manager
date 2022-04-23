import React, { useEffect, useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Character, { ClassNumberProperty } from '../classes/Character'
import CharacterClass from '../enums/CharacterClass'
import UserType from '../enums/UserType'
import { pushDeleteCharacter, pushUpdateCharacter, useWebSocket } from '../hooks/useSocket'
import { useLoading } from '../hooks/useLoading'
import StateInterface from '../interfaces/StateInterface'
import { updateCharacter, deleteCharacter, CharacterState } from '../reducers/characterReducer'
import { UserState } from '../reducers/userReducer'
import { MetadataState } from '../reducers/metadataReducer'
import { saveCharacterToDatabase } from '../utils/apiHandler'
import CharacterStatsView from '../views/CharacterStats/CharacterStatsView'
import { CHARACTER_SAVE } from '../utils/loadingTasks'

interface CharacterStatsProps {
    toggleOnCharacterStats: boolean,
    characterState: CharacterState,
    userState: UserState,
    metadataState: MetadataState,
    updateCharacter: (arg0: Character) => void,
    deleteCharacter: (arg0: string) => void,
}

const CharacterStats = ({ toggleOnCharacterStats, characterState, userState, metadataState, updateCharacter, deleteCharacter }: CharacterStatsProps) => {
    if (!toggleOnCharacterStats)
        return <></>

    const [selectedCharacter, setSelectedCharacter] = useState(new Character('','',0))
    const webSocketContext = useWebSocket()
    const loadingContext = useLoading()

    useEffect(() => {
        const currCharacter = characterState.characters.filter((stateCharacter: Character) => stateCharacter.guid === characterState.currentCharacterGuid)[0]
        if (currCharacter)
            setSelectedCharacter(currCharacter)
    }, [ characterState.currentCharacterGuid ])

    const modifiers = {
        strength: selectedCharacter.getFormattedModifier(0),
        dexterity: selectedCharacter.getFormattedModifier(1),
        constitution: selectedCharacter.getFormattedModifier(2),
        intelligence: selectedCharacter.getFormattedModifier(3),
        wisdom: selectedCharacter.getFormattedModifier(4),
        charisma: selectedCharacter.getFormattedModifier(5),
    }

    const setCharacterName = (newName: string) => {
        const updatedCharacter = selectedCharacter
        updatedCharacter.name = newName
        setSelectedCharacter(updatedCharacter)
    }

    const onStatChange = (attributeName: ClassNumberProperty, e: ChangeEvent<HTMLInputElement>) => {
        const updatedCharacter = selectedCharacter
        updatedCharacter.SetNumberAttributeValue(attributeName, parseInt(e.target.value))
        setSelectedCharacter(updatedCharacter)
    }

    const onSelectUser = (e: ChangeEvent<HTMLSelectElement>) => {
        const updatedCharacter = selectedCharacter
        updatedCharacter.username = e.target.value
        setSelectedCharacter(updatedCharacter)
    }

    const saveCurrCharacter = () => {
        if (webSocketContext.wsSettings) {
            loadingContext.startLoadingTask(CHARACTER_SAVE)
            updateCharacter(selectedCharacter)
            saveCharacterToDatabase(webSocketContext.wsSettings, JSON.stringify(selectedCharacter))
                .then(() => {
                    loadingContext.stopLoadingTask(CHARACTER_SAVE)
                    if (webSocketContext.ws && webSocketContext.wsSettings)
                        pushUpdateCharacter(webSocketContext.ws, webSocketContext.wsSettings, selectedCharacter)
                })
                .catch(() => loadingContext.stopLoadingTask(CHARACTER_SAVE))
        }
    }

    const deleteCurrCharacter = () => {
        if (!window.confirm('Are you sure you want to delete the character?'))
            return
        deleteCharacter(selectedCharacter.guid)
        if (webSocketContext.ws && webSocketContext.wsSettings)
            pushDeleteCharacter(webSocketContext.ws, webSocketContext.wsSettings, selectedCharacter.guid)
    }

    return (
        <CharacterStatsView
            showCharacterStats={ characterState.currentCharacterGuid !== '' }
            isHost={ metadataState.userType === UserType.host }
            character={ selectedCharacter }
            setSelectedCharacter={ setSelectedCharacter }
            users={ userState.users }
            modifiers={ modifiers }
            characterName={ selectedCharacter.name }
            setCharacterName={ setCharacterName }
            onStatChange={ onStatChange }
            onSelectUser={ onSelectUser }
            saveCharacter={ saveCurrCharacter }
            deleteCharacter={ deleteCurrCharacter } />
    )
}

const mapStateToProps = (state: StateInterface) => {
    return {
        characterState: state.character,
        metadataState: state.metadata,
        userState: state.user,
    }
}

const mapDispatchToProps = {
    updateCharacter,
    deleteCharacter,
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterStats)
