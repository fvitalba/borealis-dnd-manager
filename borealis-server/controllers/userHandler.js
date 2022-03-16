import User from '../models/user.js'

export const saveUpdateRoomUser = async (room, guid, username, isHost) => {
    if (!room || !username)
        return undefined

    return User.findOneAndUpdate(
        { roomName: room, userName: username, }, 
        { guid: guid, lastOnline: new Date(), isHost: isHost, active: true, }, 
        { new: true, upsert: true, }
    ).then((newUser) => {
        return newUser
    })
}

export const assignCharacter = async (room, username, characterGuid) => {
    if (!room || !username || !characterGuid)
        return undefined

    return User.findOneAndUpdate(
        { roomName: room, userName: username, }, 
        { characterGuid: characterGuid, active: true, }, 
        { new: true, upsert: false, }
    ).then((newUser) => {
        return newUser
    })
}

export const deleteUsersAfterTimeout = () => {
    // Delete all the users that have not communicated since 10 Minutes
    User.updateMany({
        lastOnline: { $lt: (new Date() - 600000) },
        active: true,
    },
    {
        '$set': { active: false, },
    })
    .then((result) => {})
    .catch((error) => {
        console.error(error)
    })
}
