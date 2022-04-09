export const getMyUserInfo = (users, myGuid, myUsername) => {
    const myUsers = users.filter((user) => (user.guid === myGuid) || (user.username === myUsername))
    if (myUsers.length > 0)
        return myUsers[0]
    else
        return undefined
}
