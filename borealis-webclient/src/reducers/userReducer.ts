import User from '../classes/User'
import {
    DELETE_ROOM_USERS,
    ADD_ROOM_USER,
    SET_USERS_FROM_API
} from '../redux/constants'

export interface UserState {
    users: Array<User>,
}

export const initialUserState = (): UserState => {
    return {
        users: new Array<User>(),
    }
}

interface UserAction {
    type: string,
    newUsers?: Array<User>,
    user?: User,
}

const userReducer = (state = initialUserState(), action: UserAction): UserState => {
    let newUsers = state.users.map((user) => user.copy())
    switch (action.type) {
    case SET_USERS_FROM_API:
        if (action.newUsers !== undefined)
            newUsers = action.newUsers.map((actionUser: User) => {
                const currUser = state.users.filter((stateUser: User) => stateUser.guid === actionUser.guid)
                if ((currUser.length > 0) && (currUser[0].guid)) {
                    currUser[0].name = actionUser.name
                    currUser[0].type = actionUser.type
                    currUser[0].lastOnline = actionUser.lastOnline
                    return currUser[0]
                } else {
                    return new User(actionUser.guid, actionUser.name, actionUser.type)
                }
            })
        return {
            ...state,
            users: newUsers,
        }
    case ADD_ROOM_USER:
        if (action.user !== undefined) {
            newUsers = newUsers.concat(action.user)
            return {
                ...state,
                users: newUsers,
            }
        } else
            return state
    case DELETE_ROOM_USERS:
        return {
            ...state,
            users: [],
        }
    default:
        return state
    }
}

//#region Action Creators
export const setUsersFromAPI = (newUsers: Array<User>): UserAction => {
    return {
        type: SET_USERS_FROM_API,
        newUsers: newUsers,
    }
}

export const addRoomUser = (newUser: User): UserAction => {
    return {
        type: ADD_ROOM_USER,
        user: newUser,
    }
}

export const deleteRoomUsers = (): UserAction => {
    return {
        type: DELETE_ROOM_USERS,
    }
}
//#endregion Action Creators

export default userReducer
