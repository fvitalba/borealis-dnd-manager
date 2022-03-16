import guid from '../controllers/guid'
import { ADD_CHARACTER, UPDATE_CHARACTER, DELETE_CHARACTER, ASSIGN_CHARACTER, SET_CHARACTERS } from '../redux/constants'

const initialCharacterReducer = () => {
    return {
        characters: [],
        myCharacterGuid: '',
    }
}

const characterTemplate = {
    guid: '',
    name: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    proficiency: 0,
    armorclass: 0,
    passivePerception: 0,
    maxHealth: 0,
    currHealth: 0,
    tempHealth: 0,
    level: 0,
    class: '',
    maxNoOfHitDice: 0,
    currNoOfHitDice: 0,
    hitDiceType: 0,
    userGuid: '',
}

const characterReducer = (state = initialCharacterReducer(), action) => {
    let newCharacters = []
    switch (action.type) {
    case ADD_CHARACTER:
        newCharacters = state.characters.push({
            ...characterTemplate,
            ...action.newCharacter,
            guid: guid(),
        })
        return {
            ...state,
            characters: newCharacters,
        }
    case UPDATE_CHARACTER:
        newCharacters = state.characters.map((stateCharacter) => {
            if (stateCharacter.guid === action.updatedCharacter.guid) {
                return {
                    ...stateCharacter,
                    ...action.updatedCharacter,
                }
            } else
                return stateCharacter
        })
        return {
            ...state,
            characters: newCharacters,
        }
    case DELETE_CHARACTER:
        newCharacters = state.characters.filter((character) => character.guid !== action.characterGuidToDelete)
        return {
            ...state,
            characters: newCharacters,
        }
    case ASSIGN_CHARACTER:
        return {
            ...state,
            myCharacterGuid: action.guidToAssign,
        }
    case SET_CHARACTERS:
        newCharacters = action.newCharacters.map((actionCharacter) => {
            const stateCharacter = state.characters.filter((character) => character.guid === actionCharacter.guid)
            if ((stateCharacter.length > 0) && (stateCharacter[0].guid)) {
                return ({
                    ...stateCharacter,
                    ...actionCharacter,
                })
            } else {
                return ({
                    ...characterTemplate,
                    ...actionCharacter,
                })
            }
        })
        return {
            ...state,
            characters: newCharacters,
        }
    default:
        return state
    }
}

//#region Action Creators
export const addChararacter = (newCharacter) => {
    return {
        type: ADD_CHARACTER,
        newCharacter: newCharacter,
    }
}

export const updateCharacter = (updatedCharacter) => {
    return {
        type: UPDATE_CHARACTER,
        updatedCharacter: updatedCharacter,
    }
}

export const deleteCharacter = (characterGuidToDelete) => {
    return {
        type: DELETE_CHARACTER,
        characterGuidToDelete: characterGuidToDelete,
    }
}

export const assignCharacter = (guidToAssign) => {
    return {
        type: ASSIGN_CHARACTER,
        guidToAssign: guidToAssign,
    }
}

export const setCharacters = (newCharacters) => {
    return {
        type: SET_CHARACTERS,
        newCharacters: newCharacters,
    }
}
//#endregion Action Creators

export default characterReducer
