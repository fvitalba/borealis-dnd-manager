import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/Game.css'
import Game from './components/Game.js'
import GameSocket from './components/GameSocket.js'
import * as serviceWorker from './serviceWorker.js'

const params = new URLSearchParams(window.location.href.replace(/.*\?/, ''))
const websocket = new GameSocket()
websocket.setup(params.get('room'))

ReactDOM.render(
	<React.StrictMode>
		<Game websocket={ websocket } />
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
