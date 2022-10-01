import  { Ref } from 'react'
import Message from '@/classes/Message'
import { SettingsState } from '@/reducers/settingsReducer'
import { CharacterState } from '@/reducers/characterReducer'
import { MetadataState } from '@/reducers/metadataReducer'
import DiceType from '@/enums/DiceType'

export interface DiceRollButtonProps {
    settingsState: SettingsState,
    characterState: CharacterState,
    metadataState: MetadataState,
    addChatMessage: (newMessage: Message) => void,
}

export interface SelectorPosition {
    top: number,
    left: number,
}

export interface DiceRollButtonViewProps {
    rollDice: (diceType: DiceType) => void,
    selectorPosition: SelectorPosition,
    showSelector: boolean,
    toggleSelector: () => void,
    selectorRef: Ref<HTMLDivElement>,
    rollDiceButtonRef: Ref<HTMLButtonElement>,
}
