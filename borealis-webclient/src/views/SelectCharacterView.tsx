import React, { ChangeEvent } from 'react'
import Character from '../classes/Character'
import Button from './Button'
import { PlusSquareSolidIcon } from './Icons'

interface SelectCharacterViewProps {
    characters: Array<Character>,
    isHost: boolean,
    selectedCharacterGuid: string,
    onCharacterSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    addNewCharacter: () => void,
}

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
                <Button title='Create new character' value={ <PlusSquareSolidIcon /> } onClick={ addNewCharacter } />
            </div>
        </div>
    )
}

export default SelectCharacterView
