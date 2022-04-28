import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'

export const registerUser = async (user) => {
    if (!user)
        return undefined

    //TODO: implement salting
    const userSecret = await argon2.hash(user.secret)

    return User.findOne({ $or: [{ 'guid': user.guid, }, { 'name': user.userName }, { 'email': user.email }] })
        .then((existingUser) => {
            if ((existingUser !== null) && ((existingUser.guid !== undefined) && (existingUser.guid !== ''))) {
                return argon2.verify(existingUser.secret, user.secret)
                    .then((passwordsMatch) => {
                        if (passwordsMatch)
                            return cleanUserBeforeSending(existingUser)
                        else {
                            const newUser = new User({
                                guid: (user.userGuid !== undefined) && (user.userGuid !== '') ? user.userGuid : randomUUID(),
                                name: user.userName,
                                secret: userSecret,
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
                        }
                    })
            } else {
                const newUser = new User({
                    guid: (user.userGuid !== undefined) && (user.userGuid !== '') ? user.userGuid : randomUUID(),
                    name: user.userName,
                    secret: userSecret,
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
            }
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
