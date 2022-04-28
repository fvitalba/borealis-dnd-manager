import React from 'react'
import { useLoading } from '../hooks/useLoading'
import { LoadingOverlayView } from '../views/LoadingOverlayView'

const LoadingOverlay = () => {
    const loadingContext = useLoading()
    return (
        loadingContext.loadingTasks.length > 0
            ? <LoadingOverlayView tasks={ loadingContext.loadingTasks } />
            : null
    )
}

export default LoadingOverlay
