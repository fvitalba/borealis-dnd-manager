import React from 'react'
import Notification from '../classes/Notification'
import NotificationType from '../enums/NotificationType'
import ActionButton from './GenericViews/ActionButton'
import { BorealisCloseNotificationIcon, BorealisErrorNotificationIcon, BorealisMessageNotificationIcon, BorealisWarningNotificationIcon } from './Icons'

interface SingleNotificationProps {
    notification: Notification,
    deleteNotification: () => void,
}

const MessageNotification = ({ notification, deleteNotification }:  SingleNotificationProps) => {
    return (<div className='borealis-message-notification-container'>
        <div className='borealis-notification-title-container'>
            <div className='borealis-notification-title'>
                <BorealisMessageNotificationIcon />
                <div className='borealis-notification-title-text'>{ notification.title }</div>
            </div>
            <ActionButton title='Dismiss Notification' value={ <BorealisCloseNotificationIcon /> } onClick={ deleteNotification } />
        </div>
        <div className='borealis-notification-content'>{ notification.content }</div>
    </div>)
}

const WarningNotification = ({ notification, deleteNotification }: SingleNotificationProps) => {
    return (<div className='borealis-warning-notification-container'>
        <div className='borealis-notification-title-container'>
            <div className='borealis-notification-title'>
                <BorealisWarningNotificationIcon />
                <div className='borealis-notification-title-text'>{ notification.title }</div>
            </div>
            <ActionButton title='Dismiss Notification' value={ <BorealisCloseNotificationIcon /> } onClick={ deleteNotification } />
        </div>
        <div className='borealis-notification-content'>{ notification.content }</div>
    </div>)
}

const ErrorNotification = ({ notification, deleteNotification }: SingleNotificationProps) => {
    return (<div className='borealis-error-notification-container'>
        <div className='borealis-notification-title-container'>
            <div className='borealis-notification-title'>
                <BorealisErrorNotificationIcon />
                <div className='borealis-notification-title-text'>{ notification.title }</div>
            </div>
            <ActionButton title='Dismiss Notification' value={ <BorealisCloseNotificationIcon /> } onClick={ deleteNotification } />
        </div>
        <div className='borealis-notification-content'>{ notification.content }</div>
    </div>)
}

interface NotificationOverlayViewProps {
    notifications: Array<Notification>,
    deleteNotification: (notificationId: number) => void,
}

const NotificationOverlayView = ({ notifications, deleteNotification }: NotificationOverlayViewProps) => {
    return (
        <div className='borealis-notification-overlay'>
            <div className='borealis-notifications-list'>
                { notifications.map((notification, index) => {
                    switch(notification.type) {
                    case NotificationType.Message:
                        return <MessageNotification key={ index } notification={ notification } deleteNotification={ () => deleteNotification(index) } />
                    case NotificationType.Warning:
                        return <WarningNotification key={ index } notification={ notification } deleteNotification={ () => deleteNotification(index) } />
                    case NotificationType.Error:
                        return <ErrorNotification key={ index } notification={ notification } deleteNotification={ () => deleteNotification(index) } />
                    }
                }
                )}
            </div>
        </div>
    )
}

export default NotificationOverlayView
