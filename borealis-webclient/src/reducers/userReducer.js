import { SET_USERS_FROM_API } from '../redux/constants'

const initialUserReducer = () => {
    return {
        users: [],
    }
}

const userTemplate = {
    guid: '',
    username: '',
    isHost: false,
    selectedCharacterGuid: '',
    lastOnline: 0,
}

const userReducer = (state = initialUserReducer(), action) => {
    let newUsers = []
    switch (action.type) {
    case SET_USERS_FROM_API:
        newUsers = action.newUsers.map((actionUser) => {
            const currUser = state.users.filter((stateUser) => stateUser.guid === actionUser.guid)
            if ((currUser.length > 0) && (currUser[0].guid)) {
                return {
                    ...currUser,
                    lastOnline: actionUser.lastOnline,
                    username: actionUser.userName,
                    isHost: actionUser.isHost,
                }
            } else {
                return {
                    ...userTemplate,
                    guid: actionUser.guid,
                    lastOnline: actionUser.lastOnline,
                    username: actionUser.userName,
                    isHost: actionUser.isHost,
                }
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
export const setUsersFromAPI = (newUsers) => {
    return {
        type: SET_USERS_FROM_API,
        newUsers: newUsers,
    }
}
//#endregion Action Creators

export default userReducer
