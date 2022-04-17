import React from 'react'
import { useLoading } from '../hooks/useLoading'
import { LoadingOverlayView } from '../views/LoadingOverlayView'

const LoadingOverlay = () => {
    const loadingContext = useLoading()
    return (
        loadingContext.isLoading
            ? <LoadingOverlayView />
            : null
    )
}

export default LoadingOverlay
