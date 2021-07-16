import React from 'react'
import HostTokenConfig from '../views/HostTokenConfigView.js'
import GuestTokenConfigView from '../views/GuestTokenConfigView.js'

const TokenConfig = ({ gameState, setGameState, token, updateGameToken, selectGameToken }) => {
	console.info('drawing token, token', token)
	const update = (callback) => {
		updateGameToken(token, callback)
	}

	const deleteToken = () => {
		const tokens = gameState.state.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index, 1)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokens,
			}
		})
	}
	
	const copy = () => {
		const tokens = gameState.state.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index + 1, 0, copy)
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tokens: tokens,
			}
		})
	}

	const onMapSelect = (e) => {
		let value = e.target.value
		if (Object.keys(gameState.state.maps).indexOf(value) < 0)
			value = undefined
		update(token => token.mapId = value)
	}

	const onToggle = (key) => {
		update(token => token[key] = !token[key])
	}

	const onIntegerChange = (key, e) => {
		update(token => token[key] = parseInt(e.target.value) || undefined)
	}

	const onTextChange = (key, e) => {
		update(token => token[key] = e.target.value)
	}

	const selectToken = (token, e) => {
		selectGameToken(token, undefined, true)
	}

	const maps = JSON.parse(JSON.stringify(gameState.state.maps || []))

	return (
		<div>
			{ token ?
				gameState.isHost ?
				<HostTokenConfig 
					maps={ maps } 
					token={ token } 
					copy={ copy } 
					onToggle={ onToggle } 
					selectToken={ selectToken } 
					onTextChange={ onTextChange } 
					onIntegerChange={ onIntegerChange } 
					onMapSelect={ onMapSelect } 
					deleteToken={ deleteToken }
				/>
				:
				<GuestTokenConfigView 
					token={ token } 
					onTextChange={ onTextChange } 
					onIntegerChange={ onIntegerChange }
				/>
			: null
			}
		</div>
	)
}

export default TokenConfig
