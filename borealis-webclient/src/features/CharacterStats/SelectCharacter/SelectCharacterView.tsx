import React from 'react'
import { ActionButton } from '@/components/ActionButton'
import { BorealisCreateCharacterIcon } from '@/styles/Icons'
import { SelectCharacterViewProps } from './types'
import { OptionSelector } from '@/components/OptionSelector'

const SelectCharacterView = ({ characters, isHost, selectedCharacterGuid, onCharacterSelect, addNewCharacter }: SelectCharacterViewProps) => {
    const characterOptions = [{
        key: '',
        value: '',
        caption: 'None',
    }].concat(
        characters.map((character) => {
            return {
                key: character.guid,
                value: character.guid,
                caption: `${character.name} (${character.getCharacterClassInfo()})` + (isHost ? `[${character.username}]` : ''),
            }
        })
    )

    return (
        <div className='borealis-character-selector-container'>
            <OptionSelector label='Select Character' options={ characterOptions } onChange={ onCharacterSelect } value={ selectedCharacterGuid } />
            <ActionButton title='Create new character' value={ <BorealisCreateCharacterIcon /> } onClick={ addNewCharacter } />
        </div>
    )
}

export default SelectCharacterView
