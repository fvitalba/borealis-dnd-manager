import React from 'react'
import { LoadingTaskDescriptions } from '../utils/constants'
import { BorealisLoadingIcon } from './Icons'

interface LoadingOverlayViewProps {
    tasks: Array<string>,
}

const LoadingOverlayView = ({ tasks }: LoadingOverlayViewProps) => {
    return (
        <div className='borealis-loading-overlay'>
            <BorealisLoadingIcon className='animate-reverse-spin' />
            <div className='borealis-loading-task-list'>
                { tasks.map((task) => {
                    const descriptions = LoadingTaskDescriptions.filter((taskDescription) => taskDescription.code === task)
                    const taskDescription = descriptions.length > 0 ? descriptions[0].description : task
                    return (<div key={ task } className='borealis-loading-task'>
                        <div>{ taskDescription }</div>
                        <div className='dot-elastic'></div>
                    </div>)
                }
                )}
            </div>
        </div>
    )
}

export default LoadingOverlayView
