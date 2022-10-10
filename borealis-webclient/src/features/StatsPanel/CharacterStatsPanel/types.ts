import Character from '@/classes/Character'
import { CharacterState } from '@/reducers/characterReducer'

export type PageToShow = 'Character Stats'

export interface CharacterStatsPanelProps {
    characterState: CharacterState
}

export interface CharacterStatsPanelViewProps {
    characters: Array<Character>,
    selectedCharacterGuid: string,
}

export interface CharacterStatsPanelRowProps {
    character: Character,
}
