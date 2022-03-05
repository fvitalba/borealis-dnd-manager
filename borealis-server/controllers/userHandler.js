import User from '../models/user.js'

export const saveUpdateRoomUser = async (room, guid, username) => {
    if (!room || !guid || !username)
        return undefined

    return User.findOneAndUpdate(
        { roomName: room, guid: guid, }, 
        { userName: username, lastOnline: new Date(), }, 
        { new: true, upsert: true, }
    ).then((newUser) => newUser)
}

export const deleteUsersAfterTimeout = () => {
    // Delete all the users that have not communicated since 10 Minutes
    User.deleteMany({
        lastOnline: { $lt: (new Date() - 600000) },
    })
    .then((result) => {})
    .catch((error) => {
        console.error(error)
    })
}
