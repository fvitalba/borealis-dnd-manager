import guid from '../controllers/guid.js'

const RETRY_INTERVAL = 2500

const K_SOCKET = 'gameWebSocket'
const K_INTERVAL = 'gameWebSocketInterval'

class GameSocket {
	setup( room ) {
		let host = window.location.host.replace(/:\d+$/, '')
		const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'
		this.guid = guid()
		if (window[K_INTERVAL])
			clearInterval(window[K_INTERVAL])
		if (window[K_SOCKET]) {
			let socket = window[K_SOCKET]
			delete window[K_SOCKET] /* Delete, then close, s.t. cb doesn't re-open it */
			socket.close()
		}
		window[K_SOCKET] = new WebSocket(`${protocol}://${host}:8000/${room}?guid=${this.guid}`)
	}

	addCallbacks( isHost, receiveCallback ) {
		let ws = window[K_SOCKET]
		// Connection callback
		ws.addEventListener('open', (a,b,c) => {
			if (window[K_INTERVAL])
				clearInterval(window[K_INTERVAL])
			if (!isHost)
				this.requestRefresh()
		})
		// Message callback
		ws.addEventListener('message', receiveCallback)
		// Closed callback
		let setup = this.setup.bind(this)
		ws.addEventListener('close', () => {
			window[K_INTERVAL] = setInterval(setup, RETRY_INTERVAL)
		})
	}

	// Send message to server
	send(data) {
		data.from = this.guid
		console.log('sending the following data:',data)
		if (window[K_SOCKET] && window[K_SOCKET].readyState === WebSocket.OPEN)
			window[K_SOCKET].send(JSON.stringify(data))
		else
			console.error('no websocket')
	}

	pushCursor(x, y, username) {
		this.send({
			messageType: 'cursor', 
			x: x, 
			y: y, 
			u: username,
		})
	}

	pushDraw(drawPath) {
		this.send({
			messageType: 'draw',
			drawPath: drawPath,
		})
	}

	pushFog(fogPath) {
		this.send({
			messageType: 'fog', 
			fogPath: fogPath,
		})
	}

	pushMaps(maps, mapId) {
		this.send({
			messageType: 'maps',
			maps: maps,
			mapId: mapId,
		})
	}

	pushMapId(mapId) {
		this.send({
			messageType: 'map', 
			id: mapId,
		})
	}

	/* Push refresh */
	pushRefresh(gameState) {
		this.send({
			messageType: 'refresh',
			game: gameState.game,
		})
	}

	/* Push token update */
	pushToken(index, token) {
		/*
		const tokenCopy = Object.assign({}, token)
		this.scrubObject(tokenCopy)
		const data = {messageType: 't', i: index, a: tokenCopy}
		this.send(data)
		*/
	}

	/* Push replacement of all tokens */
	pushTokens(tokens) {
		/*
		if (!tokens)
			return
		const tokensCopy = JSON.parse(JSON.stringify(tokens))
		const data = { messageType: 'ts', tokens: tokensCopy }
		data.tokens.forEach(token => this.scrubObject(token))
		this.send(data)
		*/
	}

	requestRefresh () {
		this.send({
			messageType: 'refreshRequest',
		})
	}

	scrubObject(object) {
		for (let key in object)
			if (/^\$/.test(key) && key !== '$id')
				delete object[key]
	}
}

export default GameSocket
