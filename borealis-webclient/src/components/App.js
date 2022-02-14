import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import settingsReducer from '../reducers/settingsReducer'
import metadataReducer from '../reducers/metadataReducer'
import gameReducer from '../reducers/gameReducer'
import { WebSocketProvider } from '../contexts/WebSocketProvider'
import Game from './Game'

const App = () => {
    const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))

    const combinedReducer = combineReducers({
        settings: settingsReducer,
        metadata: metadataReducer,
        game: gameReducer,
    })
    const store = createStore(combinedReducer)

    return(
        <Provider store={ store } >
            <WebSocketProvider room={ params.get('room') }>
                <Game />
            </WebSocketProvider>
        </Provider>
    )
}

export default App
