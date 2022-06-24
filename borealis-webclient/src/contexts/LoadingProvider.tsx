import React, { createContext, ReactNode, useReducer } from 'react'
import loadingReducer, { startTask, stopTask } from '../reducers/loadingReducer'

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

const LoadingProvider = ({ children } : { children: ReactNode }) => {
    const [loadingState, dispatch] = useReducer(loadingReducer, { loadingTasks: [], })

    const startLoadingTask = (taskCode: string) => {
        dispatch(startTask(taskCode))
    }

    const stopLoadingTask = (taskCode: string) => {
        dispatch(stopTask(taskCode))
    }

    const contextPayload = {
        loadingTasks: loadingState.loadingTasks,
        startLoadingTask: startLoadingTask,
        stopLoadingTask: stopLoadingTask,
    }

    return (
        <LoadingContext.Provider value={ contextPayload }>{ children }</LoadingContext.Provider>
    )
}

export default LoadingProvider
