import React from 'react'
import { useLoading } from '../hooks/useLoading'
import { API_LOAD_USERS } from '../utils/loadingTasks'
import LoadingOverlayView from '../views/LoadingOverlayView'

const LoadingOverlay = () => {
    const loadingContext = useLoading()
    const filteredLoadingTasks = loadingContext.loadingTasks.filter((task) => task !== API_LOAD_USERS)

    return (
        filteredLoadingTasks.length > 0
            ? <LoadingOverlayView tasks={ filteredLoadingTasks } />
            : null
    )
}

export default LoadingOverlay
