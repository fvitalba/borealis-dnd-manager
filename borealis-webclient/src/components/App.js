import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import settingsReducer from '../reducers/settingsReducer'
import metadataReducer from '../reducers/metadataReducer'
import gameReducer from '../reducers/gameReducer'
import chatReducer from '../reducers/chatReducer'
import userReducer from '../reducers/userReducer'
import characterReducer from '../reducers/characterReducer'
import WebSocketProvider from '../contexts/WebSocketProvider'
import LoadingProvider from '../contexts/LoadingProvider'
import GameStateHandler from './GameStateHandler'

const App = () => {
    const combinedReducer = combineReducers({
        settings: settingsReducer,
        metadata: metadataReducer,
        game: gameReducer,
        chat: chatReducer,
        user: userReducer,
        character: characterReducer,
    })
    const store = createStore(combinedReducer)

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
