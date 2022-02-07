import React from 'react'
import HostTokenConfig from '../views/HostTokenConfigView.js'
import GuestTokenConfigView from '../views/GuestTokenConfigView.js'

const TokenConfig = ({ gameState, setGameState, token, updateGameToken, selectGameToken }) => {
	const update = (callback) => {
		updateGameToken(token, callback)
	}

	const deleteToken = () => {
		const tokens = gameState.game.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index, 1)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				tokens: tokens,
			}
		})
	}
	
	const copy = () => {
		const tokens = gameState.game.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index + 1, 0, copy)
		setGameState({
			...gameState,
			game: {
				...gameState.game,
				tokens: tokens,
			}
		})
	}

	const onMapSelect = (e) => {
		let value = e.target.value
		if (Object.keys(gameState.game.maps).indexOf(value) < 0)
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

	const maps = gameState.game.maps

	return (
		<div>
			{ token ?
				gameState.metadata.isHost ?
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
