import User from '../models/user.js'

export const saveUpdateRoomUser = async (room, guid, username) => {
    if (!room || !guid || !username)
        return undefined
    
        return User.findOneAndUpdate(
            { roomName: room, guid: guid, }, 
            { userName: username, }, 
            { new: true, upsert: true, }
        ).then((newUser) => newUser)
}
