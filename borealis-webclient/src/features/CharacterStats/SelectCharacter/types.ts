import { ChangeEvent } from 'react'
import Character from '../../../classes/Character'
import { CharacterState } from '../../../reducers/characterReducer'
import { MetadataState } from '../../../reducers/metadataReducer'
import { SettingsState } from '../../../reducers/settingsReducer'

export interface SelectCharacterProps {
    characterState: CharacterState,
    metadataState: MetadataState,
    settingsState: SettingsState,
    assignCharacter: (arg0: string) => void,
    addCharacter: (arg0: Character) => void,
}

export interface SelectCharacterViewProps {
    characters: Array<Character>,
    isHost: boolean,
    selectedCharacterGuid: string,
    onCharacterSelect: (arg0: ChangeEvent<HTMLSelectElement>) => void,
    addNewCharacter: () => void,
}
