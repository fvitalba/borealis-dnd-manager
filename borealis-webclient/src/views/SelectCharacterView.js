
const SelectCharacterView = ({ characters, selectedCharacterGuid, onCharacterSelect }) => {
    return (
        <div className='select-character-container'>
            <div className='select-character-input-container'>
                <label className='select-character-label'>Select Character</label>
                <select value={ selectedCharacterGuid } onChange={ onCharacterSelect } title='Which character' className='select-character-select'>
                    <option key='' value=''>None</option>
                    { characters.map((character) => (
                        <option key={ character.guid } value={ character.guid } >{ character.name + '( Level ' + character.level + ' ' + character.class + ')' }</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SelectCharacterView
