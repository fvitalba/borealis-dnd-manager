import React, { createContext, ReactNode, useReducer } from 'react'
import Notification from '../classes/Notification'
import NotificationType from '../enums/NotificationType'
import notificationReducer, { addNotification, removeNotification } from '../reducers/notificationReducer'

export interface INotificationContext {
    notifications: Array<Notification>,
    addNotification: (arg0: string, arg1: string, arg2: NotificationType) => void,
    removeNotification: (arg0: number) => void,
}

export const NotificationContext = createContext<INotificationContext>({
    notifications: [],
    addNotification: () => null,
    removeNotification: () => null,
})

const NotificationProvider = ({ children } : { children: ReactNode }) => {
    const [notificationState, dispatch] = useReducer(notificationReducer, { notifications: [], })

    const addNewNotification = (newTitle: string, newContent: string, newType: NotificationType) => {
        dispatch(addNotification(newTitle, newContent, newType))
    }

    const removeNewNotification = (notificationId: number) => {
        dispatch(removeNotification(notificationId))
    }

    const contextPayload = {
        notifications: notificationState.notifications,
        addNotification: addNewNotification,
        removeNotification: removeNewNotification,
    }

    return (
        <NotificationContext.Provider value={ contextPayload }>{ children }</NotificationContext.Provider>
    )
}

export default NotificationProvider
