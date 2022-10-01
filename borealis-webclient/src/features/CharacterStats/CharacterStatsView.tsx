import React from 'react'
import { CharacterClassLevelInput } from './CharacterClassLevelInput'
import { CharacterHitDiceInput } from './CharacterHitDiceInput'
import { SelectCharacter } from './SelectCharacter'
import CharacterMainStatInput from './CharacterMainStatInput'
import { ActionButton } from '@/components/ActionButton'
import { BorealisSaveCharacterIcon, BorealisDeleteCharacterIcon } from '@/styles/Icons'
import { CharacterStatsViewProps } from './types'
import CharacterTextInput from './CharacterTextInput'
import CharacterStatsContainer from './CharacterStatsContainer'
import CharacterStatsRow from './CharacterStatsRow'
import CharacterNumberInput from './CharacterNumberInput'
import CharacterOptionSelector from './CharacterOptionSelector'

const CharacterStatsView = ({ showCharacterStats, isHost, character, setSelectedCharacter, users, modifiers, characterName, setCharacterName, onStatChange, onSelectUser, saveCharacter, deleteCharacter }: CharacterStatsViewProps) => {
    const userOptions = [{
        key: '',
        value: '',
        caption: 'None',
    }].concat(
        users.map((user) => {
            return {
                key: user.name,
                value: user.name,
                caption: `${user.name}`,
            }
        })
    )

    return (
        <CharacterStatsContainer>
            <CharacterStatsRow>
                <SelectCharacter />
            </CharacterStatsRow>
            { showCharacterStats
                ? <CharacterStatsContainer>
                    <CharacterStatsRow>
                        <CharacterTextInput label='Character Name' statFullname='name' statValue={ characterName } onStatChange={ setCharacterName } />
                        { isHost
                            ? <CharacterOptionSelector label='Assigned User' statValue={ character.username } title='Which user' valueOptions={ userOptions } onSelectValue={ onSelectUser } />
                            : null
                        }
                        <ActionButton title='Save your character' value={ <BorealisSaveCharacterIcon /> } onClick={ saveCharacter } />
                        <ActionButton title='Delete your character' value={ <BorealisDeleteCharacterIcon /> } onClick={ deleteCharacter } />
                    </CharacterStatsRow>
                    <CharacterClassLevelInput character={ character } setSelectedCharacter={ setSelectedCharacter } />
                    <CharacterStatsRow>
                        <CharacterMainStatInput statFullname='strength' statAbbreviation='STR' statModifier={ modifiers.strength } statValue={ character.strength } onStatChange={ onStatChange } />
                        <CharacterMainStatInput statFullname='dexterity' statAbbreviation='DEX' statModifier={ modifiers.dexterity } statValue={ character.dexterity } onStatChange={ onStatChange } />
                        <CharacterMainStatInput statFullname='constitution' statAbbreviation='CON' statModifier={ modifiers.constitution } statValue={ character.constitution } onStatChange={ onStatChange } />
                        <CharacterMainStatInput statFullname='intelligence' statAbbreviation='INT' statModifier={ modifiers.intelligence } statValue={ character.intelligence } onStatChange={ onStatChange } />
                        <CharacterMainStatInput statFullname='wisdom' statAbbreviation='WIS' statModifier={ modifiers.wisdom } statValue={ character.wisdom } onStatChange={ onStatChange } />
                        <CharacterMainStatInput statFullname='charisma' statAbbreviation='CHA' statModifier={ modifiers.charisma } statValue={ character.charisma } onStatChange={ onStatChange } />
                    </CharacterStatsRow>
                    <CharacterStatsRow>
                        <CharacterNumberInput label='AC' statFullname='armorclass' statValue={ character.armorclass } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                        <CharacterNumberInput label='HP' statFullname='currHealth' statValue={ character.currHealth } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                        <CharacterNumberInput label='Max. HP' statFullname='maxHealth' statValue={ character.maxHealth } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                        <CharacterNumberInput label='Temp. HP' statFullname='tempHealth' statValue={ character.tempHealth } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                        <CharacterNumberInput label='Proficiency' statFullname='proficiency' statValue={ character.proficiency } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                        <CharacterNumberInput label='Pass. Perc.' statFullname='passivePerception' statValue={ character.passivePerception } minValue={ 0 } maxValue={ 20 } valueStep={ 1 } onStatChange={ onStatChange } />
                    </CharacterStatsRow>
                    <CharacterHitDiceInput character={ character } setSelectedCharacter={ setSelectedCharacter } />
                </CharacterStatsContainer>
                : null
            }
        </CharacterStatsContainer>
    )
}

export default CharacterStatsView
