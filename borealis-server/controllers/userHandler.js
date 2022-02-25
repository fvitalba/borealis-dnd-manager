import User from '../models/user.js'

export const saveUpdateRoomUser = (room, guid, username) => {
    console.log('saving user',room,guid,username)
    if (!room || !guid || !username)
        return undefined
    
    const newUpdatedUser = User.findOneAndUpdate({ roomName: room, guid: guid }, { userName: username, }, { new: true }).then((newUser) => newUser)
    return newUpdatedUser
}
