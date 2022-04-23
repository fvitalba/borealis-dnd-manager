import { deleteUsersAfterTimeout } from '../utils/userHandler.js'

export const deleteOfflineUsers = (req, res, next) => {
    deleteUsersAfterTimeout()
    next()
}
