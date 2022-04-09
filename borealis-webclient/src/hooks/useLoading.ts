import React, { useContext } from 'react'
import { LoadingContext, ILoadingContext } from '../contexts/LoadingProvider'

export const useLoading = (): ILoadingContext => {
    const context = useContext<ILoadingContext>(LoadingContext)
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider')
    }
    return context
}
