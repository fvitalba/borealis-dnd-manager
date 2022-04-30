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

export const saveUpdateRoomUsers = async (roomId, newRoomUsers) => {
    if (!roomId || !newRoomUsers)
        return undefined

    // Set all users to inactive, then reactivate only the received users
    return RoomUser.updateMany({ roomId: roomId, }, { active: false, })
        .then(() => {
            return newRoomUsers.map(async (newRoomUser) => {
                return RoomUser.findOneAndUpdate(
                    { roomId: roomId, guid: newRoomUser.guid }, 
                    { ...newRoomUser, roomId: roomId, timestamp: new Date(), active: true, }, 
                    { new: true, upsert: true, }
                ).then((updatedRoomUser) => {
                    return updatedRoomUser
                })
                .catch(() => null)
            })
        })
        .catch(() => null)
}

export const saveUpdateRoomUser = async (roomId, newRoomUser) => {
    if (!roomId || !newRoomUser)
        return undefined

    return RoomUser.findOneAndUpdate(
            { roomId: roomId, guid: newRoomUser.guid }, 
            { ...newRoomUser, roomId: roomId, timestamp: new Date(), active: true, lastOnline: new Date(), }, 
            { new: true, upsert: true, }
        ).then((updatedRoomUser) => {
            return updatedRoomUser
        })
        .catch(() => null)
}

export const setAllRoomUserStatus = async (roomId, newStatus) => {
    if (!roomId || (newStatus === undefined))
        return undefined
    
    return RoomUser.updateMany({ roomId: roomId, }, { active: newStatus })
        .then((updatedRoomUsers) => updatedRoomUsers)
        .catch(() => null)
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
