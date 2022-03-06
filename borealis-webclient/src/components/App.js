import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import settingsReducer from '../reducers/settingsReducer'
import metadataReducer from '../reducers/metadataReducer'
import gameReducer from '../reducers/gameReducer'
import chatReducer from '../reducers/chatReducer'
import WebSocketProvider from '../contexts/WebSocketProvider'
import GameStateHandler from './GameStateHandler'

const App = () => {
    const combinedReducer = combineReducers({
        settings: settingsReducer,
        metadata: metadataReducer,
        game: gameReducer,
        chat: chatReducer,
    })
    const store = createStore(combinedReducer)

    return(
        <Provider store={ store } >
            <WebSocketProvider>
                <GameStateHandler />
            </WebSocketProvider>
        </Provider>
    )
}

export default App
