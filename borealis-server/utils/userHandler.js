import User from '../models/user.js'

export const saveUpdateRoomUser = async (user) => {
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
