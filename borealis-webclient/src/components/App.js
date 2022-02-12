import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Game from './Game'
import GameSocket from './GameSocket'
import settingsReducer from '../reducers/settingsReducer'

const App = () => {
    const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
    let websocket = new GameSocket()
    websocket.setup(params.get('room'))

    const store = createStore(settingsReducer)

    return(
        <Provider store={ store } >
            <Game websocket={ websocket } />
        </Provider>
    )
}

export default App
