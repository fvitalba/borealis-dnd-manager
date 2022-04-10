import {
    ADD_TOKEN,
    UPDATE_TOKENS,
    DELETE_TOKEN,
    COPY_TOKEN,
    UPDATE_TOKEN_NAME,
    UPDATE_TOKEN_IMAGEURL,
    UPDATE_TOKEN_MAPID,
    TOGGLE_TOKEN_VALUE,
    SET_TOKEN_ORIGIN
} from '../redux/constants'
import guid from '../utils/guid'
import Token from '../classes/Token'

export interface TokenState {
    tokens: Array<Token>,
}

const initialTokenState = (): TokenState => {
    return {
        tokens: new Array<Token>(),
    }
}

interface TokenAction {
    type: string,
    tokens?: Array<Token>,
    token?: Token,
    guid?: string,
    key?: string,
    value?: string,
    mapId?: number,
    xOrigin?: number,
    yOrigin?: number,
}

const tokenReducer = (state: TokenState = initialTokenState(), action: TokenAction): TokenState => {
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
    case UPDATE_TOKEN_NAME:
        if ((action.guid) && (action.value))
            newTokens = updateSingleTokenName(state.tokens, action.guid, action.value)
        return {
            ...state,
            tokens: newTokens,
        }
    case UPDATE_TOKEN_IMAGEURL:
        if ((action.guid) && (action.value))
            newTokens = updateSingleTokenImageUrl(state.tokens, action.guid, action.value)
        return {
            ...state,
            tokens: newTokens
        }
    case UPDATE_TOKEN_MAPID:
        if ((action.guid) && (action.mapId))
            newTokens = updateSingleTokenMapId(state.tokens, action.guid, action.mapId)
        return {
            ...state,
            tokens: newTokens
        }
    case TOGGLE_TOKEN_VALUE:
        if ((action.guid) && (action.key))
            newTokens = toggleSingleAttributeInTokens(newTokens, action.guid, action.key)
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

const toggleSingleAttributeInTokens = (tokens: Array<Token>, guidToUpdate: string, attributeKey: string): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.toggleTokenValue(attributeKey)
        }
        return token
    })
}

const updateSingleTokenName = (tokens: Array<Token>, guidToUpdate: string, newName: string): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.name = newName
        }
        return token
    })
}

const updateSingleTokenImageUrl = (tokens: Array<Token>, guidToUpdate: string, newImageUrl: string): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.imageUrl = newImageUrl
        }
        return token
    })
}

const updateSingleTokenMapId = (tokens: Array<Token>, guidToUpdate: string, newMapId: number): Array<Token> => {
    return tokens.map((token) => {
        if (token.guid === guidToUpdate) {
            token.mapId = newMapId
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
export const addToken = (tokenName: string, imageUrl: string, mapId: number): TokenAction => {
    const newToken = new Token(tokenName, imageUrl, mapId, 0, 0)

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

export const updateTokenName = (tokenGuidToUpdate: string, name: string): TokenAction => {
    return {
        type: UPDATE_TOKEN_NAME,
        guid: tokenGuidToUpdate,
        value: name,
    }
}

export const updateTokenImageUrl = (tokenGuidToUpdate: string, imageUrl: string): TokenAction => {
    return {
        type: UPDATE_TOKEN_IMAGEURL,
        guid: tokenGuidToUpdate,
        value: imageUrl,
    }
}

export const updateTokenMapId = (tokenGuidToUpdate: string, mapId: number): TokenAction => {
    return {
        type: UPDATE_TOKEN_MAPID,
        guid: tokenGuidToUpdate,
        mapId: mapId,   
    }
}

export const toggleTokenValue = (tokenGuidToUpdate: string, key: string): TokenAction => {
    return {
        type: TOGGLE_TOKEN_VALUE,
        guid: tokenGuidToUpdate,
        key: key,
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
