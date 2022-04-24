import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import GameStateHandler from './GameStateHandler'
import WebSocketProvider from '../contexts/WebSocketProvider'
import LoadingProvider from '../contexts/LoadingProvider'
import settingsReducer from '../reducers/settingsReducer'
import metadataReducer from '../reducers/metadataReducer'
import gameReducer from '../reducers/gameReducer'
import mapReducer from '../reducers/mapReducer'
import tokenReducer from '../reducers/tokenReducer'
import chatReducer from '../reducers/chatReducer'
import userReducer from '../reducers/userReducer'
import characterReducer from '../reducers/characterReducer'

const App = () => {
    const combinedReducer = combineReducers({
        settings: settingsReducer,
        metadata: metadataReducer,
        game: gameReducer,
        map: mapReducer,
        token: tokenReducer,
        chat: chatReducer,
        user: userReducer,
        character: characterReducer,
    })

    const logger = (store: any) => (next: any) => (action: any) => {
        console.log('dispatching', action)
        const result = next(action)
        console.log('next state', store.getState())
        return result
    }

    const store = createStore(combinedReducer, applyMiddleware(logger))

    return(
        <Provider store={ store } >
            <LoadingProvider>
                <WebSocketProvider>
                    <GameStateHandler />
                </WebSocketProvider>
            </LoadingProvider>
        </Provider>
    )
}

export default App
