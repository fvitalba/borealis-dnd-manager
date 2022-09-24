import React from 'react'
import UserType from '../../enums/UserType'
import { DebugOverlayViewProps } from './types'

const DebugOverlayView = ({ userType, userGuid, userName, roomId, roomName, socketGuid, sessionGuid, isGuest }: DebugOverlayViewProps) => {
    return (<div className='debug-overlay-container'>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>User Type</label>
            <div className='debug-overlay-value'>{ `${UserType[userType]} ${ isGuest ? 'Guest' : '' }` }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>User Guid</label>
            <div className='debug-overlay-value'>{ userGuid }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>Username</label>
            <div className='debug-overlay-value'>{ userName }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>Room ID</label>
            <div className='debug-overlay-value'>{ roomId }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>Room Name</label>
            <div className='debug-overlay-value'>{ roomName }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>Socket Guid</label>
            <div className='debug-overlay-value'>{ socketGuid }</div>
        </div>
        <div className='debug-overlay-row'>
            <label className='debug-overlay-label'>Session Guid</label>
            <div className='debug-overlay-value'>{ sessionGuid }</div>
        </div>
    </div>)
}

export default DebugOverlayView
