import Notification from '@/classes/Notification'

export interface SingleNotificationProps {
    notification: Notification,
    deleteNotification: () => void,
}

export interface NotificationOverlayViewProps {
    notifications: Array<Notification>,
    deleteNotification: (notificationId: number) => void,
}
