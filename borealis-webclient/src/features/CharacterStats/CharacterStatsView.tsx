import React from 'react'
import { CharacterClassLevelInput } from './CharacterClassLevelInput'
import { CharacterHitDiceInput } from './CharacterHitDiceInput'
import { SelectCharacter } from './SelectCharacter'
import CharacterStatInput from './CharacterStatInput'
import { ActionButton } from '@/components/ActionButton'
import { BorealisSaveCharacterIcon, BorealisDeleteCharacterIcon } from '@/views/Icons'
import { CharacterStatsViewProps } from './types'

const CharacterStatsView = ({ showCharacterStats, isHost, character, setSelectedCharacter, users, modifiers, characterName, setCharacterName, onStatChange, onSelectUser, saveCharacter, deleteCharacter }: CharacterStatsViewProps) => {
    return (
        <div className='borealis-character-stats-container'>
            <div className='borealis-character-stats-row'>
                <SelectCharacter />
            </div>
            { showCharacterStats
                ? <div className='borealis-character-stats-container'>
                    <div className='borealis-character-stats-row'>
                        { isHost
                            ? <div className='character-stat-input-container'>
                                <label className='character-stats-label'>Assigned User</label>
                                <select value={ character.username } onChange={ onSelectUser } title='Which user' className='character-stats-view-select'>
                                    <option key='' value=''>None</option>
                                    { users.map((user) => (
                                        <option key={ user.name } value={ user.name } >{ user.name }</option>
                                    ))}
                                </select>
                            </div>
                            : null
                        }
                        <ActionButton title='Save your character' value={ <BorealisSaveCharacterIcon /> } onClick={ saveCharacter } />
                        <ActionButton title='Delete your character' value={ <BorealisDeleteCharacterIcon /> } onClick={ deleteCharacter } />
                    </div>
                    <div className='borealis-character-stats-row'>
                        <div className='character-stat-input-container'>
                            <label className='character-stats-label'>Name</label>
                            <input title='Character name' placeholder='Character name' value={ characterName } onChange={ (e) => setCharacterName(e.target.value) } className='character-stats-input' />
                        </div>
                    </div>
                    <CharacterClassLevelInput character={ character } setSelectedCharacter={ setSelectedCharacter } />
                    <div className='borealis-character-stats-row'>
                        <CharacterStatInput statFullname='strength' statAbbreviation='STR' statModifier={ modifiers.strength } statValue={ character.strength } onStatChange={ onStatChange } />
                        <CharacterStatInput statFullname='dexterity' statAbbreviation='DEX' statModifier={ modifiers.dexterity } statValue={ character.dexterity } onStatChange={ onStatChange } />
                        <CharacterStatInput statFullname='constitution' statAbbreviation='CON' statModifier={ modifiers.constitution } statValue={ character.constitution } onStatChange={ onStatChange } />
                        <CharacterStatInput statFullname='intelligence' statAbbreviation='INT' statModifier={ modifiers.intelligence } statValue={ character.intelligence } onStatChange={ onStatChange } />
                        <CharacterStatInput statFullname='wisdom' statAbbreviation='WIS' statModifier={ modifiers.wisdom } statValue={ character.wisdom } onStatChange={ onStatChange } />
                        <CharacterStatInput statFullname='charisma' statAbbreviation='CHA' statModifier={ modifiers.charisma } statValue={ character.charisma } onStatChange={ onStatChange } />
                    </div>
                    <div className='borealis-character-stats-row'>
                        <div className='character-stats-view-row-subgroup'>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>AC</label>
                                <input value={ character.armorclass } placeholder='Armor Class' onChange={ (e) => onStatChange('armorclass', e) } type='number' min='0' max='20' step='1' title='armorclass' className='w-12 character-stats-input' />
                            </div>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>HP</label>
                                <input value={ character.currHealth } placeholder='Health' onChange={ (e) => onStatChange('currHealth', e) } type='number' min='0' max='20' step='1' title='currHealth' className='w-12 character-stats-input' />
                            </div>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>Max. HP</label>
                                <input value={ character.maxHealth } placeholder='Max. Health' onChange={ (e) => onStatChange('maxHealth', e) } type='number' min='0' max='20' step='1' title='maxHealth' className='w-12 character-stats-input' />
                            </div>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>Temp. HP</label>
                                <input value={ character.tempHealth } placeholder='Temp. Health' onChange={ (e) => onStatChange('tempHealth', e) } type='number' min='0' max='20' step='1' title='tempHealth' className='w-12 character-stats-input' />
                            </div>
                        </div>
                        <div className='borealis-character-stats-row'>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>Proficiency</label>
                                <input value={ character.proficiency } placeholder='Proficiency' onChange={ (e) => onStatChange('proficiency', e) } type='number' min='0' max='20' step='1' title='proficiency' className='w-12 character-stats-input' />
                            </div>
                            <div className='character-stat-input-container'>
                                <label className='character-stats-label'>Passive Perception</label>
                                <input value={ character.passivePerception } placeholder='Passive Perception' onChange={ (e) => onStatChange('passivePerception', e) } type='number' min='0' max='20' step='1' title='passivePerception' className='w-12 character-stats-input' />
                            </div>
                        </div>
                    </div>
                    <CharacterHitDiceInput character={ character } setSelectedCharacter={ setSelectedCharacter } />
                </div>
                : null
            }
        </div>
    )
}

export default CharacterStatsView
