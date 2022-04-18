import { SET_USERS_FROM_API } from '../redux/constants'
import User from '../classes/User'

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
    newUsers: Array<User>,
}

const userReducer = (state: UserState = initialUserState(), action: UserAction): UserState => {
    let newUsers = state.users
    switch (action.type) {
    case SET_USERS_FROM_API:
        if (action.newUsers)
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
//#endregion Action Creators

export default userReducer
