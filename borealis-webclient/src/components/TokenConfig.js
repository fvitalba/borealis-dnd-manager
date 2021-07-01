import React from 'react'
import HostTokenConfig from '../views/HostTokenConfigView'
import GuestTokenConfigView from '../views/GuestTokenConfigView'

const TokenConfig = ({ game, token }) => {
	const update = (callback) => {
		game.updateToken(token, callback)
	}

	const deleteToken = () => {
		const tokens = game.state.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index, 1)
		game.setState({ tokens: tokens })
	}
	
	const copy = () => {
		const tokens = game.state.tokens.map(t => t)
		const index = tokens.indexOf(token)
		tokens.splice(index + 1, 0, copy)
		game.setState({ tokens: tokens })
	}

	const onMapSelect = (e) => {
		let value = e.target.value
		if (Object.keys(game.state.maps).indexOf(value) < 0)
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
		game.selectToken(token, undefined, true)
	}

	const maps = game.state.maps;

	return (
		<div>
			token ?
				game.isHost ?
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
		</div>
	)
}

export default TokenConfig
