import {
    ADD_TOKEN,
    UPDATE_TOKENS,
    DELETE_TOKEN,
    COPY_TOKEN,
    UPDATE_TOKEN_TEXT_VALUE,
    TOGGLE_TOKEN_VALUE,
    SET_TOKEN_ORIGIN,
    UPDATE_TOKEN_NUMBER_VALUE,
} from '../redux/constants'
import guid from '../utils/guid'
import Token, { TokenTextProperty, TokenNumberProperty, TokenBooleanProperty } from '../classes/Token'

export interface TokenState {
    tokens: Array<Token>,
}

export const initialTokenState = (): TokenState => {
    return {
        tokens: new Array<Token>(),
    }
}

interface TokenAction {
    type: string,
    tokens?: Array<Token>,
    token?: Token,
    guid?: string,
    textKey?: TokenTextProperty,
    numberKey?: TokenNumberProperty,
    booleanKey?: TokenBooleanProperty,
    textValue?: string,
    numberValue?: number,
    mapId?: number,
    xOrigin?: number,
    yOrigin?: number,
}

const tokenReducer = (state = initialTokenState(), action: TokenAction): TokenState => {
    let newTokens = state.tokens
    let newToken: Token

    switch(action.type) {
    case ADD_TOKEN:
        if (action.token)
            newTokens = newTokens.concat(action.token)
        return {
            ...state,
            tokens: newTokens,
        }
    case UPDATE_TOKENS:
        if (action.tokens)
            newTokens = action.tokens
        return {
            ...state,
            tokens: newTokens,
        }
    case DELETE_TOKEN:
        if (action.guid)
            newTokens = newTokens.filter((token: Token) => token.guid !== action.guid)
        return {
            ...state,
            tokens: newTokens,
        }
    case COPY_TOKEN:
        if (action.guid) {
            const tokenToCopy = newTokens.filter((token) => token.guid === action.guid)
            if (tokenToCopy.length > 0) {
                newToken = new Token(tokenToCopy[0].name, tokenToCopy[0].imageUrl, tokenToCopy[0].mapId, tokenToCopy[0].x, tokenToCopy[0].y, tokenToCopy[0].condition, tokenToCopy[0].type, guid(), tokenToCopy[0].size, false, tokenToCopy[0].hidden, tokenToCopy[0].showLabel, 0, 0)
                newTokens = newTokens.concat(newToken)
            }
        }
        return {
            ...state,
            tokens: newTokens
        }
    case UPDATE_TOKEN_TEXT_VALUE:
        if ((action.guid) && (action.textKey) && (action.textValue))
            newTokens = updateSingleTokenTextAttribute(state.tokens, action.guid, action.textKey, action.textValue)
        return {
            ...state,
            tokens: newTokens,
        }
    case UPDATE_TOKEN_NUMBER_VALUE:
        if ((action.guid) && (action.numberKey) && (action.numberValue))
            newTokens = updateSingleTokenNumberAttribute(state.tokens, action.guid, action.numberKey, action.numberValue)
        return {
            ...state,
            tokens: newTokens,
        }
    case TOGGLE_TOKEN_VALUE:
        if ((action.guid) && (action.booleanKey))
            newTokens = toggleSingleTokenAttribute(newTokens, action.guid, action.booleanKey)
        return {
            ...state,
            tokens: newTokens,
        }
    case SET_TOKEN_ORIGIN:
        if ((action.guid) && (action.xOrigin) && (action.yOrigin))
            newTokens = updateSingleTokenOrigin(newTokens, action.guid, action.xOrigin, action.yOrigin)
        return {
            ...state,
            tokens: newTokens,
        }
    default:
        return state
    }
}

const toggleSingleTokenAttribute = (tokens: Array<Token>, guidToUpdate: string, attributeKey: TokenBooleanProperty): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.toggleValue(attributeKey)
        }
        return token
    })
}

const updateSingleTokenTextAttribute = (tokens: Array<Token>, guidToUpdate: string, key: TokenTextProperty, newValue: string): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.setTextValue(key, newValue)
        }
        return token
    })
}

const updateSingleTokenNumberAttribute = (tokens: Array<Token>, guidToUpdate: string, key: TokenNumberProperty, newValue: number): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.setNumberValue(key, newValue)
        }
        return token
    })
}

const updateSingleTokenOrigin = (tokens: Array<Token>, guidToUpdate: string, xOrigin: number, yOrigin: number): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.x0 = xOrigin
            token.y0 = yOrigin
        }
        return token
    })
}

//#region Action Creators
export const addToken = (newToken: Token): TokenAction => {
    return {
        type: ADD_TOKEN,
        token: newToken,
    }
}

export const updateTokens = (newTokens: Array<Token>): TokenAction => {
    return {
        type: UPDATE_TOKENS,
        tokens: newTokens,
    }
}

export const deleteToken = (tokenGuidToDelete: string): TokenAction => {
    return {
        type: DELETE_TOKEN,
        guid: tokenGuidToDelete,
    }
}

export const copyToken = (tokenGuidToCopy: string): TokenAction => {
    return {
        type: COPY_TOKEN,
        guid: tokenGuidToCopy,
    }
}

export const updateTokenTextValue = (tokenGuidToUpdate: string, key: TokenTextProperty, newValue: string): TokenAction => {
    return {
        type: UPDATE_TOKEN_TEXT_VALUE,
        guid: tokenGuidToUpdate,
        textKey: key,
        textValue: newValue,
    }
}

export const updateTokenNumberValue = (tokenGuidToUpdate: string, key: TokenNumberProperty, newValue: number): TokenAction => {
    return {
        type: UPDATE_TOKEN_NUMBER_VALUE,
        guid: tokenGuidToUpdate,
        numberKey: key,
        numberValue: newValue,
    }
}

export const toggleTokenValue = (tokenGuidToUpdate: string, key: TokenBooleanProperty): TokenAction => {
    return {
        type: TOGGLE_TOKEN_VALUE,
        guid: tokenGuidToUpdate,
        booleanKey: key,
    }
}

export const setTokenOrigin = (tokenGuidToUpdate: string, xOrigin: number, yOrigin: number): TokenAction => {
    return {
        type: SET_TOKEN_ORIGIN,
        guid: tokenGuidToUpdate,
        xOrigin: xOrigin,
        yOrigin: yOrigin,
    }
}
//#endregion Action Creators

export default tokenReducer
