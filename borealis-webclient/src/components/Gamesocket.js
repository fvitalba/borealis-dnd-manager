import guid from '../controllers/guid.js'

// TODO: reset to 2500
const RETRY_INTERVAL = 250000

const K_SOCKET = 'gameWebSocket'
const K_INTERVAL = 'gameWebSocketInterval'

const socketRoom = () => ( window[K_SOCKET].url.match(/[^/]*$/)[0] )

class GameSocket {
	constructor(gameState, setGameState) {
		Object.defineProperty(this, 'gameState', {
			value: gameState, 
			writable: false,
		})
		Object.defineProperty(this, 'setGameState', {
			value: setGameState, 
			writable: false,
		})
		this.setup()
	}

	setup() {
		let host = window.location.host.replace(/:\d+$/, '')
		let room = this.gameState.room
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
		this.addCallbacks()
	}

	addCallbacks() {
		let ws = window[K_SOCKET]
		/* Connection callback */
		ws.addEventListener('open', (a,b,c) => {
			if (window[K_INTERVAL])
				clearInterval(window[K_INTERVAL])
			if (!this.gameState.isHost)
				this.requestRefresh()
		})
		/* Message callback */
		ws.addEventListener('message', this.receive.bind(this))
		/* Closed callback */
		let setup = this.setup.bind(this)
		ws.addEventListener('close', () => {
			window[K_INTERVAL] = setInterval(setup, RETRY_INTERVAL)
		})
	}

	/* Send message to server*/
	send(data) {
		data.from = this.guid
		console.log('window socket', window[K_SOCKET])
		console.log('window socket ready state', window[K_SOCKET].readyState)
		if (window[K_SOCKET] && window[K_SOCKET].readyState === WebSocket.OPEN)
			window[K_SOCKET].send(JSON.stringify(data))
		else
			console.error('no websocket')
	}

	// Receive message from server
	receive(evt) {
		console.log('received data from server',evt.data)
		let data = JSON.parse(evt.data)
		console.log('parsed data', data)
		if (data.from === this.guid)
			return // ignore messages sent by self
		if (!data.to || (data.to !== this.guid))
			return	// ignore dedicated messages not directed to self
		switch (data.messageType) {
			case 'cursor':
				/*
				if (data.u !== this.gameState.state.username)
					this.gameState.updateCursors(data.x, data.y, data.u, data.from)
				*/
				break
			case 'draw':
				const currMap = this.getMap()
				const updatedMaps = this.gameState.state.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, drawPaths: data.drawPath, } : map
				})
				this.setGameState({
					...this.gameState,
					state: {
						...this.gameState.state,
						maps: updatedMaps,
					}
				})
				break
			case 'fog': /* fog erasure */
				//this.gameState.overlayRef.current.fogErase(data.x, data.y, data.r, data.r2, true)
				break
			case 'fogReset': /* fog reset */
				//this.gameState.fogRef.current.fill()
				break
			case 'drawReset':
				break
			case 't': /* token */
				/*
				const local = this.gameState.state.tokens[data.i]
				const token = Object.assign(local, data.a) // Keep and `$` attrs like `$selected`
				this.gameState.updateTokenByIndex(data.i, token, true)
				*/
				break
			case 'ts': /* all tokens */
				/*
				const localTokensMap = this.gameState.state.tokens.reduce((out, tok) => {
					out[tok.guid] = tok
					return out
				}, {})
				const tokens = data.tokens.map(tok => Object.assign({}, localTokensMap[tok.guid], tok))
				this.gameState.setState({tokens: tokens})
				*/
				break
			case 'map': /* map id */
				/*
				const map = this.gameState.state.maps[data.i]
				this.gameState.loadMap(map)
				*/
				break
			case 'refresh': /* refresh from host */
				/*
				let {from, t, to, ...state} = data
				console.log(`Receive refresh of generation`, state.gen, 'from', from, 'to', to)
				if (to && to !== this.guid) {
					console.log(`Will not apply refresh from ${to} (self)`)
					return
				}
				if ((this.gameState.state.gen||0) >= (state.gen||0)) {
					console.log(`Will not apply refresh of generation ${state.gen} against current state of generation ${this.gameState.state.gen}`)
					return
				}
				this.gameState.fromJson(JSON.stringify(state))
				*/
				console.log('starting refresh & updating state')
				this.setGameState(data.gameState)
				break
			case 'refreshRequest': /* refresh request from player */
				if (this.gameState.isHost) {
					console.log('Got refresh request', data.from)
					this.pushRefresh(this.gameState, { to: data.from, })
				}
				break
			default:
				console.error(`Unrecognized websocket message type: ${data.t}`)
		}
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

	pushMapId(mapId) {
		this.send({
			messageType: 'map', 
			i: mapId,
		})
	}

	/* Push refresh */
	pushRefresh(gameState) {
		console.log('pushing refresh')
		this.send({
			messageType: 'refresh',
			state: gameState,
		})
	}

	/* Push token update */
	pushToken(index, token) {
		const tokenCopy = Object.assign({}, token)
		this.scrubObject(tokenCopy)
		const data = {messageType: 't', i: index, a: tokenCopy}
		this.send(data)
	}

	/* Push replacement of all tokens */
	pushTokens(tokens) {
		if (!tokens)
			return
		const tokensCopy = JSON.parse(JSON.stringify(tokens))
		const data = { messageType: 'ts', tokens: tokensCopy }
		data.tokens.forEach(token => this.scrubObject(token))
		this.send(data)
	}

	requestRefresh () {
		console.log('requesting refresh')
		this.send({
			messageType: 'refreshRequest',
		})
	}

	scrubObject(object) {
		for (let key in object)
			if (/^\$/.test(key) && key !== '$id')
				delete object[key]
	}

	getMap = () => {
		if (this.gameState.state.maps.length === 0)
			return undefined
		const currMap = this.gameState.state.maps.filter((map) => parseInt(map.$id) === parseInt(this.gameState.state.mapId))
		return currMap.length > 0 ? currMap[0] : this.gameState.state.maps[0]
	}
}

export default GameSocket
