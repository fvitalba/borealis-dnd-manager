import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'
import { randomUUID } from 'crypto'

export const registerUser = async (user) => {
    if (!user)
        return undefined

    const foundUser = await User.findOne({ 'guid': user.guid, 'secret': user.secret })
    if (foundUser !== null)
        if ((foundUser.guid !== undefined) && (foundUser.guid !== ''))
            return foundUser

    return User.findOne({ $or: [{ 'guid': user.guid, }, { 'name': user.userName }, { 'email': user.email }] })
        .then((existingUser) => {
            if (existingUser !== null)
                if ((existingUser.guid !== undefined) && (existingUser.guid !== ''))
                    return undefined

        const newUser = new User({
            guid: (user.userGuid !== undefined) && (user.userGuid !== '') ? user.userGuid : randomUUID(),
            name: user.userName,
            secret: user.secret,
            email: user.email,
            guest: user.isGuest,
            lastOnline: new Date(),
            active: true,
        })
        return newUser.save((error, document) => {
            if (!error)
                return cleanUserBeforeSending(document)
            else
                return undefined
        })
    })    
}

export const saveUpdateRoomUsers = async (roomUsers) => {
    if (!roomUsers)
        return undefined

    //TODO: boh, dunno
}

export const cleanUserBeforeSending = (user) => {
    return {
        guid: user.guid,
        name: user.name,
        email: user.guest ? '' : user.email,
        guest: user.guest,
        lastOnline: user.guest ? 0 : user.lastOnline,
        active: user.guest ? true : user.active,
    }
}
