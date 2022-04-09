import { useLoading } from '../hooks/useLoading'
import { LoadingOverlayView } from '../views/LoadingOverlayView'

const LoadingOverlay = () => {
    const [isLoading] = useLoading()
    return (
        isLoading
            ? <LoadingOverlayView />
            : null
    )
}

export default LoadingOverlay
