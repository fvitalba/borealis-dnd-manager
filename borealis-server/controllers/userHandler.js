import User from '../models/user.js'

export const saveUpdateRoomUser = async (room, guid, username) => {
    if (!room || !guid || !username)
        return undefined
    
    // Delete all the users that have not communicated since 10 Minutes
    User.deleteMany({
        roomName: room,
        lastOnline: { $lt: (new Date() - 600000) },
    })

    return User.findOneAndUpdate(
        { roomName: room, guid: guid, }, 
        { userName: username, lastOnline: new Date(), }, 
        { new: true, upsert: true, }
    ).then((newUser) => newUser)
}
