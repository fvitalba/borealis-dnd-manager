import { SET_USERS_FROM_API } from '../redux/constants'
import User from '../classes/User'

interface UserState {
    users: Array<User>,
}

const initialUserReducer = (): UserState => {
    return {
        users: [],
    }
}

interface UserAction {
    type: string,
    newUsers: Array<User>,
}

const userReducer = (state: UserState = initialUserReducer(), action: UserAction) => {
    let newUsers = []
    switch (action.type) {
    case SET_USERS_FROM_API:
        newUsers = action.newUsers.map((actionUser: User) => {
            const currUser = state.users.filter((stateUser: User) => stateUser.guid === actionUser.guid)
            if ((currUser.length > 0) && (currUser[0].guid)) {
                return {
                    ...currUser,
                    name: actionUser.name,
                    type: actionUser.type,
                    lastOnline: actionUser.lastOnline,
                }
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
