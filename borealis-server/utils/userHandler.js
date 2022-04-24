import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'

export const saveUpdateUser = async (user) => {
    if (!user)
        return undefined

    if (user.type === undefined || user.type === '')
        user.type = 1

    return User.findOneAndUpdate(
        { guid: user.guid, }, 
        { ...user, lastOnline: new Date(), active: true, }, 
        { new: true, upsert: true, }
    ).then((newUser) => {
        return newUser
    })
}

export const saveUpdateRoomUsers = async (roomUsers) => {
    if (!roomUsers)
        return undefined

    //TODO: boh, dunno
}
