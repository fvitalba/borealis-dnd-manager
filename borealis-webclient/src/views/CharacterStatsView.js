const CharacterStatsView = ({ character, characterName, setCharacterName, setCharacterClass, onStatChange }) => {
    /*
    const character = {
        proficiency: 2,
        passivePerception: 10,
        maxNoOfHitDice: 1,
        currNoOfHitDice: 1,
        hitDiceType: 12,
    }
    */
    return (
        <div className='character-stats-view-container'>
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Name</label>
                    <input title='Character name' placeholder='Character name' value={ characterName } onChange={ (e) => setCharacterName(e.target.value) } className='control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Level</label>
                    <input value={ character.level } placeholder='Level' onChange={ (e) => onStatChange('level', e) } type='number' min='0' max='20' step='1' title='level' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Class</label>
                    <input title='Class' placeholder='Class' value={ character.class } onChange={ (e) => setCharacterClass(e.target.value) } className='control-panel-input' />
                </div>
            </div>
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>STR</label>
                    <input value={ character.strength } placeholder='Strength' onChange={ (e) => onStatChange('strength', e) } type='number' min='0' max='20' step='1' title='strength' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>DEX</label>
                    <input value={ character.dexterity } placeholder='Dexterity' onChange={ (e) => onStatChange('dexterity', e) } type='number' min='0' max='20' step='1' title='dexterity' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>CON</label>
                    <input value={ character.constitution } placeholder='Constitution' onChange={ (e) => onStatChange('constitution', e) } type='number' min='0' max='20' step='1' title='constitution' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>INT</label>
                    <input value={ character.intelligence } placeholder='Intelligence' onChange={ (e) => onStatChange('intelligence', e) } type='number' min='0' max='20' step='1' title='intelligence' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>WIS</label>
                    <input value={ character.wisdom } placeholder='Wisdom' onChange={ (e) => onStatChange('wisdom', e) } type='number' min='0' max='20' step='1' title='wisdom' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>CHA</label>
                    <input value={ character.charisma } placeholder='Charisma' onChange={ (e) => onStatChange('charisma', e) } type='number' min='0' max='20' step='1' title='charisma' className='w-12 control-panel-input' />
                </div>
            </div>
            <div className='character-stats-view-row'>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>AC</label>
                    <input value={ character.armorclass } placeholder='Armor Class' onChange={ (e) => onStatChange('armorclass', e) } type='number' min='0' max='20' step='1' title='armorclass' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>HP</label>
                    <input value={ character.currHealth } placeholder='Health' onChange={ (e) => onStatChange('currHealth', e) } type='number' min='0' max='20' step='1' title='currHealth' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Max. HP</label>
                    <input value={ character.maxHealth } placeholder='Max. Health' onChange={ (e) => onStatChange('maxHealth', e) } type='number' min='0' max='20' step='1' title='maxHealth' className='w-12 control-panel-input' />
                </div>
                <div className='character-stat-input-container'>
                    <label className='character-stats-label'>Temp. HP</label>
                    <input value={ character.tempHealth } placeholder='Temp. Health' onChange={ (e) => onStatChange('tempHealth', e) } type='number' min='0' max='20' step='1' title='tempHealth' className='w-12 control-panel-input' />
                </div>
            </div>
        </div>
    )
}

export default CharacterStatsView
