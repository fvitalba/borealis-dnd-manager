import { deleteUsersAfterTimeout } from '../controllers/userHandler.js'

export const deleteOfflineUsers = (req, res, next) => {
    deleteUsersAfterTimeout()
    next()
}
