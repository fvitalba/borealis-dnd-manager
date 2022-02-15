import React, { useEffect, useState, createContext, useCallback } from 'react'
import { connect } from 'react-redux'
import { overwriteGame, updateMaps, loadMap } from '../reducers/gameReducer.js'
import { pushGameRefresh, requestRefresh } from '../hooks/useSocket.js'
import guid from '../controllers/guid.js'
require('dotenv').config()

const DEBUG_MODE = process.env.NODE_ENV === 'production' ? false : true
const SOCKET_RECONNECTION_TIMEOUT = 2500
const SOCKET_SERVER_PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000

const generateWebSocketUrl = (room, guid) => {
    let host = window.location.host.replace(/:\d+$/, '')
	const protocol = /https/.test(window.location.protocol) ? 'wss' : 'ws'

    return DEBUG_MODE
        ? `${protocol}://${host}:${SOCKET_SERVER_PORT}/${room}?guid=${guid}`
        : `${protocol}://${host}/${room}?guid=${guid}`
}

const createWebSocket = (room, guid) => {
    console.log('creating websocket, room:',room,'guid:',guid)
    const webSocketUrl = generateWebSocketUrl(room, guid)
    console.log('connecting to: ',webSocketUrl)
    return new WebSocket(webSocketUrl)
}

export const WebSocketContext = createContext(createWebSocket('',''))

const WebSocketProvider = ({ children, metadata, game, overwriteGame, loadMap, updateMaps }) => {
    const [wsSettings, setWsSettings] = useState({
        guid: guid(),
        username: '',
    })
    const [ws, setWs] = useState(createWebSocket(metadata.room, wsSettings.guid))

    const receiveData = useCallback((evt) => {
		let data = JSON.parse(evt.data)
		console.log('receiving the following data', data)
		if (data.from === wsSettings.guid) {
			return // ignore messages sent by self
		}
		if (data.to && data.to !== wsSettings.guid) {
			return // ignore messages sent to different recipients
		}

        const getMap = () => {
            if (game.maps.length === 0)
                return undefined
            const currMap = game.maps.filter((map) => map.$id === game.mapId)
            return currMap.length > 0 ? currMap[0] : game.maps[0]
        }

		const currMap = getMap()
		console.log('current map',currMap)
		switch (data.type) {
			case 'pushCursor':
				/*
				if (data.u !== this.gameState.settings.username)
					this.gameState.updateCursors(data.x, data.y, data.u, data.from)
				*/
				break
			case 'pushDrawPath':
				const newDrawPath = currMap.drawPaths ? currMap.drawPaths : []
				newDrawPath.push(data.drawPath)
				const updatedMapsWithDraw = game.maps.map((map) => {
					return map.$id === currMap.$id ? { ...currMap, drawPaths: newDrawPath, } : map
				})
				updateMaps(updatedMapsWithDraw)
				break
			case 'pushDrawReset':
				const updatedMapsWithDrawReset = game.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, drawPaths: [], } : map
				})
				updateMaps(updatedMapsWithDrawReset)
				break
			case 'pushFogPath':
				const newFogPath = currMap.fogPaths ? currMap.fogPaths : []
				newFogPath.push(data.fogPath)
				const updatedMapsWithFog = game.maps.map((map) => {
					return map.$id === currMap.$id ? { ...currMap, fogPaths: newFogPath, } : map
				})
				updateMaps(updatedMapsWithFog)
				break
			case 'pushFogReset':
				const updatedMapsWithFogReset = game.maps.map((map) => {
					return map.$id === currMap.$id ? {...currMap, fogPaths: [], } : map
				})
				updateMaps(updatedMapsWithFogReset)
				break
			case 'pushSingleToken':
				/*
				const local = this.gameState.game.tokens[data.i]
				const token = Object.assign(local, data.a) // Keep and `$` attrs like `$selected`
				this.gameState.updateTokenByIndex(data.i, token, true)
				*/
				break
			case 'pushTokens':
				/*
				const localTokensMap = this.gameState.game.tokens.reduce((out, tok) => {
					out[tok.guid] = tok
					return out
				}, {})
				const tokens = data.tokens.map(tok => Object.assign({}, localTokensMap[tok.guid], tok))
				this.gameState.setState({tokens: tokens})
				*/
				break
			case 'pushMapId':
				loadMap(data.mapId)
				break
			case 'pushMapState':
				updateMaps(data.maps)
				loadMap(data.mapId)
				break
			case 'pushGameRefresh': // refresh from host
				console.log('receiving gamedata', data.game)
				overwriteGame(data.game)
				break
			case 'requestRefresh': // refresh request from player
				if (metadata.isHost) {
					pushGameRefresh(ws, wsSettings, game, { to: data.from, })
				}
				break
			default:
				console.error(`Unrecognized websocket message type: ${data.type}`)
		}
	},[ game, loadMap, metadata.isHost, overwriteGame, updateMaps, ws, wsSettings ])

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setWs(createWebSocket(metadata.room, wsSettings.guid))
            }, SOCKET_RECONNECTION_TIMEOUT)
        }

        const onOpen = () => {
            if (!metadata.isHost) {
                requestRefresh(ws, wsSettings)
            }
        }

        ws.addEventListener('close', onClose)
        ws.addEventListener('open', onOpen)
        ws.addEventListener('message', receiveData)

        return () => {
            ws.removeEventListener('close', onClose)
            ws.removeEventListener('open', onOpen)
            ws.removeEventListener('message', receiveData)
        }
    }, [ws, setWs, wsSettings, metadata, receiveData])

    return (
        <WebSocketContext.Provider value={ [ws, wsSettings, setWsSettings] }>{ children }</WebSocketContext.Provider>
    )
}

const mapStateToProps = (state) => {
	return {
		metadata: state.metadata,
        game: state.game,
	}
}

const mapDispatchToProps = {
	overwriteGame,
	loadMap,
	updateMaps,
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketProvider)
