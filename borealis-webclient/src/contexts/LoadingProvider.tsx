import React, { createContext, ReactElement, useReducer } from 'react'
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

const LoadingProvider = ({ children } : { children: ReactElement }) => {
    const [loadingState, dispatch] = useReducer(loadingReducer, { loadingTasks: [], })

    const startLoadingTask = (taskCode: string) => {
        console.log('starting', taskCode)
        dispatch(startTask(taskCode))
    }

    const stopLoadingTask = (taskCode: string) => {
        console.log('stopping', taskCode)
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
