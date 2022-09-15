import Notification from '../classes/Notification'
import NotificationType from '../enums/NotificationType'
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../redux/constants'

interface NotificationState {
    notifications: Array<Notification>,
}

const initialNotificationState = (): NotificationState => {
    return {
        notifications: [],
    }
}

interface NotificationAction {
    type: string,
    notificationTitle?: string,
    notificationContent?: string,
    notificationType?: NotificationType,
    notificationId?: number,
}

const notificationReducer = (state = initialNotificationState(), action: NotificationAction): NotificationState => {
    let newNotifications = state.notifications
    switch (action.type) {
    case ADD_NOTIFICATION:
        if ((action.notificationTitle !== undefined) && (action.notificationContent !== undefined) && (action.notificationType !== undefined))
            newNotifications = newNotifications.concat(new Notification(action.notificationTitle, action.notificationContent, action.notificationType))
        return {
            ...state,
            notifications: newNotifications,
        }
    case DELETE_NOTIFICATION:
        if (action.notificationId !== undefined)
            newNotifications = newNotifications.filter((notification, index) => index !== action.notificationId)
        return {
            ...state,
            notifications: newNotifications,
        }
    default:
        return state
    }
}

//#region Action Creators
export const addNotification = (newTitle: string, newContent: string, newType: NotificationType): NotificationAction => {
    return {
        type: ADD_NOTIFICATION,
        notificationTitle: newTitle,
        notificationContent: newContent,
        notificationType: newType,
    }
}

export const removeNotification = (notificationId: number) => {
    return {
        type: DELETE_NOTIFICATION,
        notificationId: notificationId,
    }
}
//#endregion Action Creators

export default notificationReducer
