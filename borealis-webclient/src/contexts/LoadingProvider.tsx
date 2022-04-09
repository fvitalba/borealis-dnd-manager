import React, { createContext, useState } from 'react'

export interface ILoadingContext {
    isLoading: boolean,
    setIsLoading?: (arg0: boolean) => void,
}

export const LoadingContext = createContext<ILoadingContext>({
    isLoading: false
})

const LoadingProvider = ({ children } : { children: JSX.Element }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{ children }</LoadingContext.Provider>
    )
}

export default LoadingProvider
