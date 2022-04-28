import React from 'react'
import { LoadingTaskDescriptions } from '../utils/constants'
import { RepeatOutlineIcon } from './Icons'

interface LoadingOverlayViewProps {
    tasks: Array<string>,
}

export const LoadingOverlayView = ({ tasks }: LoadingOverlayViewProps) => {
    return (
        <div className='loading-overlay'>
            <RepeatOutlineIcon className='animate-reverse-spin' />
            <div className='loading-task-list'>
                { tasks.map((task) => {
                    const descriptions = LoadingTaskDescriptions.filter((taskDescription) => taskDescription.code === task)
                    const taskDescription = descriptions.length > 0 ? descriptions[0].description : task
                    return (<div key={ task } className='loading-task'>
                        <div>{ taskDescription }</div>
                        <div className='dot-elastic'></div>
                    </div>)
                }
                )}
            </div>
        </div>
    )
}
