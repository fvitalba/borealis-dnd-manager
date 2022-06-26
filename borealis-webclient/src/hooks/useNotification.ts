import { useContext } from 'react'
import { NotificationContext, INotificationContext } from '../contexts/NotificationProvider'

export const useNotification = (): INotificationContext => {
    const context = useContext<INotificationContext>(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider')
    }
    return context
}
