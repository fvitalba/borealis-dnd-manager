const CharacterStatsView = ({ character, modifiers, characterName, setCharacterName, setCharacterClass, onStatChange }) => {
    return (
        <div className='character-stats-view-container'>
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Name</label>
                    <input title='Character name' placeholder='Character name' value={ characterName } onChange={ (e) => setCharacterName(e.target.value) } className='character-stats-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Level</label>
                    <input value={ character.level } placeholder='Level' onChange={ (e) => onStatChange('level', e) } type='number' min='0' max='20' step='1' title='level' className='w-12 character-stats-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Class</label>
                    <input title='Class' placeholder='Class' value={ character.class } onChange={ (e) => setCharacterClass(e.target.value) } className='character-stats-input' />
                </div>
            </div>
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>STR</label>
                    <input value={ character.strength } placeholder='Strength' onChange={ (e) => onStatChange('strength', e) } type='number' min='0' max='20' step='1' title='strength' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.strength }</label>
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>DEX</label>
                    <input value={ character.dexterity } placeholder='Dexterity' onChange={ (e) => onStatChange('dexterity', e) } type='number' min='0' max='20' step='1' title='dexterity' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.dexterity }</label>
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>CON</label>
                    <input value={ character.constitution } placeholder='Constitution' onChange={ (e) => onStatChange('constitution', e) } type='number' min='0' max='20' step='1' title='constitution' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.constitution }</label>
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>INT</label>
                    <input value={ character.intelligence } placeholder='Intelligence' onChange={ (e) => onStatChange('intelligence', e) } type='number' min='0' max='20' step='1' title='intelligence' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.intelligence }</label>
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>WIS</label>
                    <input value={ character.wisdom } placeholder='Wisdom' onChange={ (e) => onStatChange('wisdom', e) } type='number' min='0' max='20' step='1' title='wisdom' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.wisdom }</label>
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>CHA</label>
                    <input value={ character.charisma } placeholder='Charisma' onChange={ (e) => onStatChange('charisma', e) } type='number' min='0' max='20' step='1' title='charisma' className='w-12 character-main-stats-input' />
                    <label className='character-stats-modifier-label'>{ modifiers.charisma }</label>
                </div>
            </div>
            <div className='character-stats-view-row'>
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
                <div className='character-stats-view-row-subgroup'>
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
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Remaining Hit Dice</label>
                    <input value={ character.currNoOfHitDice } placeholder='Remaining Hit Dice' onChange={ (e) => onStatChange('currNoOfHitDice', e) } type='number' min='0' max='20' step='1' title='currNoOfHitDice' className='w-12 character-stats-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Max. Hit Dice</label>
                    <input value={ character.maxNoOfHitDice } placeholder='Maximum Hit Dice' onChange={ (e) => onStatChange('maxNoOfHitDice', e) } type='number' min='0' max='20' step='1' title='maxNoOfHitDice' className='w-12 character-stats-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Hit Dice Type</label>
                    <input value={ character.hitDiceType } placeholder='Hit Dice Type' onChange={ (e) => onStatChange('hitDiceType', e) } type='number' min='0' max='20' step='1' title='hitDiceType' className='w-12 character-stats-input' />
                </div>
            </div>
        </div>
    )
}

export default CharacterStatsView
