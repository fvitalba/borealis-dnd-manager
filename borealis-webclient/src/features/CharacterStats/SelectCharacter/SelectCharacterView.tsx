import React from 'react'
import ActionButton from '../../../views/GenericViews/ActionButton'
import { BorealisCreateCharacterIcon } from '../../../views/Icons'
import { SelectCharacterViewProps } from './types'

const SelectCharacterView = ({ characters, isHost, selectedCharacterGuid, onCharacterSelect, addNewCharacter }: SelectCharacterViewProps) => {
    return (
        <div className='select-character-container'>
            <div className='select-character-input-container'>
                <label className='select-character-label'>Select Character</label>
                <select value={ selectedCharacterGuid } onChange={ onCharacterSelect } title='Which character' className='select-character-select'>
                    <option key='' value=''>None</option>
                    { characters.map((character) => (
                        <option key={ character.guid } value={ character.guid } >
                            { `${character.name} (${character.getCharacterClassInfo()})` }
                            { isHost ? `[${character.username}]` : ''}
                        </option>
                    ))}
                </select>
            </div>
            <div className='select-character-input-container'>
                <ActionButton title='Create new character' value={ <BorealisCreateCharacterIcon /> } onClick={ addNewCharacter } />
            </div>
        </div>
    )
}

export default SelectCharacterView
