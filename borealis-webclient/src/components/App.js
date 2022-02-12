import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Game from './Game'
import GameSocket from './GameSocket'
import settingsReducer from '../reducers/settingsReducer'
import metadataReducer from '../reducers/metadataReducer'
import gameReducer from '../reducers/gameReducer'

const App = () => {
    const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
    let websocket = new GameSocket()
    websocket.setup(params.get('room'))

    const combinedReducer = combineReducers({
        settings: settingsReducer,
        metadata: metadataReducer,
        game: gameReducer,
    })
    const store = createStore(combinedReducer)

    return(
        <Provider store={ store } >
            <Game websocket={ websocket } />
        </Provider>
    )
}

export default App
