import Button from './Button'
import { PlusSquareSolidIcon } from './Icons'

const SelectCharacterView = ({ characters, isHost, selectedCharacterGuid, onCharacterSelect, addNewCharacter }) => {
    return (
        <div className='select-character-container'>
            <div className='select-character-input-container'>
                <label className='select-character-label'>Select Character</label>
                <select value={ selectedCharacterGuid } onChange={ onCharacterSelect } title='Which character' className='select-character-select'>
                    <option key='' value=''>None</option>
                    { characters.map((character) => (
                        <option key={ character.guid } value={ character.guid } >
                            { `${character.name} ( Lvl. ${character.level}, ${character.class})` }
                            { isHost ? `[${character.username}]` : ''}
                        </option>
                    ))}
                </select>
            </div>
            <div className='select-character-input-container'>
                <Button title='Create new character' value={ <PlusSquareSolidIcon /> } onClick={ addNewCharacter } />
            </div>
        </div>
    )
}

export default SelectCharacterView
