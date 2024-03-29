import {
    ADD_CHARACTER,
    UPDATE_CHARACTER,
    DELETE_CHARACTER,
    ASSIGN_CHARACTER,
    ASSIGN_CHARACTER_TO_USER,
    SET_CHARACTERS
} from '../redux/constants'
import Character from '../classes/Character'

export interface CharacterState {
    characters: Array<Character>,
    currentCharacterGuid: string,
}

export const initialCharacterState = (): CharacterState => {
    return {
        characters: [],
        currentCharacterGuid: '',
    }
}

interface CharacterAction {
    type: string,
    character?: Character,
    characterGuid?: string,
    username?: string,
    characters?: Array<Character>,
}

const characterReducer = (state = initialCharacterState(), action: CharacterAction): CharacterState => {
    let newCharacters = state.characters.map((character) => character.copy())
    switch (action.type) {
    case ADD_CHARACTER:
        if (action.character !== undefined)
            newCharacters = newCharacters.concat(action.character)
        return {
            ...state,
            characters: newCharacters,
        }
    case UPDATE_CHARACTER:
        if (action.character !== undefined)
            newCharacters = newCharacters.map((stateCharacter: Character) => {
                if ((stateCharacter.guid === action.character?.guid)) {
                    return action.character
                } else
                    return stateCharacter
            })
        return {
            ...state,
            characters: newCharacters,
        }
    case DELETE_CHARACTER:
        newCharacters = newCharacters.filter((character: Character) => character.guid !== action.characterGuid)
        return {
            ...state,
            characters: newCharacters,
            currentCharacterGuid: '',
        }
    case ASSIGN_CHARACTER:
        return {
            ...state,
            currentCharacterGuid: action.characterGuid !== undefined ? action.characterGuid : state.currentCharacterGuid,
        }
    case ASSIGN_CHARACTER_TO_USER:
        newCharacters = newCharacters.map((character: Character) => {
            if (character.guid === action.characterGuid) {
                if (action.username !== undefined)
                    character.username = action.username
                return character
            } else {
                return character
            }
        })
        return {
            ...state,
            characters: newCharacters,
        }
    case SET_CHARACTERS:
        if (action.characters !== undefined)
            return {
                ...state,
                characters: action.characters,
            }
        else
            return state
    default:
        return state
    }
}

//#region Action Creators
export const addCharacter = (newCharacter: Character): CharacterAction => {
    return {
        type: ADD_CHARACTER,
        character: newCharacter,
    }
}

export const updateCharacter = (updatedCharacter: Character): CharacterAction => {
    return {
        type: UPDATE_CHARACTER,
        character: updatedCharacter,
    }
}

export const deleteCharacter = (characterGuidToDelete: string): CharacterAction => {
    return {
        type: DELETE_CHARACTER,
        characterGuid: characterGuidToDelete,
    }
}

export const assignCharacter = (guidToAssign: string): CharacterAction => {
    return {
        type: ASSIGN_CHARACTER,
        characterGuid: guidToAssign,
    }
}

export const assignCharacterToUser = (username: string, guidToAssign: string): CharacterAction => {
    return {
        type: ASSIGN_CHARACTER_TO_USER,
        username: username,
        characterGuid: guidToAssign,
    }
}

export const setCharacters = (newCharacters: Array<Character>): CharacterAction => {
    return {
        type: SET_CHARACTERS,
        characters: newCharacters,
    }
}
//#endregion Action Creators

export default characterReducer
