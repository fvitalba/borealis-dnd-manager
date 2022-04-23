import User from '../models/user.js'

export const saveUpdateRoomUser = async (roomId, userGuid, userType) => {
    if (!roomId || !userGuid)
        return undefined

    if (userType === undefined || userType === '')
        userType = 'player'

    return User.findOneAndUpdate(
        { roomId: roomId, guid: userGuid, }, 
        { lastOnline: new Date(), type: userType, active: true, }, 
        { new: true, upsert: true, }
    ).then((newUser) => {
        return newUser
    })
}

export const assignCharacter = async (roomId, userGuid, characterGuid) => {
    if (!roomId || !userGuid || !characterGuid)
        return undefined

    return User.findOneAndUpdate(
        { roomId: roomId, guid: userGuid, }, 
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
