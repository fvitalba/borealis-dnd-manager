import { randomUUID } from 'crypto'
import argon2 from 'argon2'
import User from '../models/user.js'
import RoomUser from '../models/roomUser.js'

export const registerUser = async (user) => {
    if (!user)
        return undefined

    //TODO: implement salting
    const userSecret = await argon2.hash(user.secret)

    return await User.findOne({ $or: [{ 'guid': user.guid, }, { 'name': user.userName }, { 'email': user.email, 'guest': false, }] })
        .then(async (existingUser) => {
            if ((existingUser !== null) && ((existingUser.guid !== undefined) && (existingUser.guid !== ''))) {
                if (existingUser.guest) {
                    return cleanUserBeforeSending(existingUser)
                } else {
                    return argon2.verify(existingUser.secret, user.secret)
                        .then(async (passwordsMatch) => {
                            if (passwordsMatch) {
                                const updatedUser = new User({
                                    guid: existingUser.guid,
                                    name: existingUser.name,
                                    secret: existingUser.secret,
                                    email: existingUser.email,
                                    guest: existingUser.guest,
                                    lastOnline: new Date(),
                                    active: true,
                                })
                                return await updatedUser.save((error, newUser) => {
                                    if (!error)
                                        // Saving of User update successful, so we return the updated user
                                        return cleanUserBeforeSending(newUser)
                                    else
                                        // Saving of User update failed
                                        return undefined
                                })
                            } else {
                                // User already exists and wrong secret was provided
                                return undefined
                            }
                        })
                }
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
                return await newUser.save()
                    .then((document) => cleanUserBeforeSending(document))
                    .catch(() => undefined)
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
