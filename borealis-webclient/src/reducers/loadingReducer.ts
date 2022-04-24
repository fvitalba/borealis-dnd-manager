import { START_LOADING_TASK, STOP_LOADING_TASK } from '../redux/constants'

interface LoadingState {
    loadingTasks: Array<string>,
}

const initialLoadingState = (): LoadingState => {
    return {
        loadingTasks: [],
    }
}

interface LoadingAction {
    type: string,
    taskCode: string,
}

const loadingReducer = (state = initialLoadingState(), action: LoadingAction): LoadingState => {
    let newTasks = []
    switch (action.type) {
    case START_LOADING_TASK:
        newTasks = state.loadingTasks.filter((task) => task === action.taskCode)
        if (newTasks.length === 0) {
            newTasks = state.loadingTasks.concat(action.taskCode)
        }
        return {
            ...state,
            loadingTasks: newTasks,
        }
    case STOP_LOADING_TASK:
        newTasks = state.loadingTasks.filter((task) => task !== action.taskCode)
        return {
            ...state,
            loadingTasks: newTasks,
        }
    default:
        return state
    }
}

//#region Action Creators
export const startTask = (taskCode: string): LoadingAction => {
    return {
        type: START_LOADING_TASK,
        taskCode: taskCode,
    }
}

export const stopTask = (taskCode: string): LoadingAction => {
    return {
        type: STOP_LOADING_TASK,
        taskCode: taskCode,
    }
}
//#endregion Action Creators

export default loadingReducer
