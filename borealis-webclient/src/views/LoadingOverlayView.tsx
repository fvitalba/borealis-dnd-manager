import React from 'react'
import { RepeatOutlineIcon } from './Icons'

export const LoadingOverlayView = () => {
    return (
        <div className='loading-overlay'>
            <RepeatOutlineIcon className='animate-reverse-spin' />
        </div>
    )
}
