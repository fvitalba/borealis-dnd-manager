import React from 'react'
import { useNotification } from '../hooks/useNotification'
import NotificationOverlayView from '../views/NotificationOverlayView'

const NotificationOverlay = () => {
    const notificationContext = useNotification()

    const deleteNotification = (notificationId: number) => {
        notificationContext.removeNotification(notificationId)
    }

    return (
        notificationContext.notifications.length > 0
            ? <NotificationOverlayView notifications={ notificationContext.notifications } deleteNotification={ deleteNotification } />
            : null
    )
}

export default NotificationOverlay
