import React, { createContext, ReactElement, useState } from 'react'

export interface ILoadingContext {
    loadingTasks: Array<string>,
    startLoadingTask: (arg0: string) => void,
    stopLoadingTask: (arg0: string) => void,
}

export const LoadingContext = createContext<ILoadingContext>({
    loadingTasks: [],
    startLoadingTask: () => null,
    stopLoadingTask: () => null,
})

const LoadingProvider = ({ children } : { children: ReactElement }) => {
    const [loadingState, setLoadingState] = useState(new Array<string>())

    const startLoadingTask = (taskCode: string) => {
        const existingTask = loadingState.map((task) => task === taskCode)
        if (existingTask.length === 0) {
            const newTasks = loadingState.concat(taskCode)
            setLoadingState(newTasks)
        }
    }

    const stopLoadingTask = (taskCode: string) => {
        const newTasks = loadingState.filter((task) => task !== taskCode)
        setLoadingState(newTasks)
    }

    const contextPayload = {
        loadingTasks: loadingState,
        startLoadingTask: startLoadingTask,
        stopLoadingTask: stopLoadingTask,
    }

    return (
        <LoadingContext.Provider value={ contextPayload }>{ children }</LoadingContext.Provider>
    )
}

export default LoadingProvider
