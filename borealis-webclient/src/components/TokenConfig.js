import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { deleteToken, copyToken, updateTokenValue, toggleTokenValue, updateTokens } from '../reducers/gameReducer.js'
import HostTokenConfig from '../views/HostTokenConfigView.js'
import GuestTokenConfigView from '../views/GuestTokenConfigView.js'

const TokenConfig = ({ token, game, metadata, deleteToken, copyToken, updateTokenValue, toggleTokenValue }) => {
	const dispatch = useDispatch()
	const selectToken = (token, tokenSelected) => {
		if (!token.pc && !metadata.isHost)
			return
		const updatedTokens = game.tokens.map((currToken) => {
			//TODO: Handle Multiselection / singleselection
			return (currToken.guid === token.guid) ?
				{
					...currToken,
					$selected: tokenSelected ? tokenSelected : !currToken.$selected,
					$x0: currToken.x,	//TODO: these coordinates should only be set, if selected = true
					$y0: currToken.y,	//TODO: these coordinates should only be set, if selected = true
				}
				: currToken
		})
		dispatch(updateTokens(updatedTokens))
	}

	const deleteCurrToken = () => {
		dispatch(deleteToken(token.guid))
	}
	
	const copy = () => {
		dispatch(copyToken(token.guid))
	}

	const onMapSelect = (e) => {
		let value = parseInt(e.target.value)
		if (value < 0)
			value = undefined
		dispatch(updateTokenValue(token.guid, 'mapId', value))
	}

	const onToggle = (key) => {
		dispatch(toggleTokenValue(token.guid, key))
	}

	const onIntegerChange = (key, e) => {
		dispatch(updateTokenValue(token.guid, key, parseInt(e.target.value) || undefined))
	}

	const onTextChange = (key, e) => {
		dispatch(updateTokenValue(token.guid, key, e.target.value))
	}

	return (
		<div>
			{ token ?
				metadata.isHost ?
				<HostTokenConfig 
					maps={ game.maps } 
					token={ token } 
					copy={ copy } 
					onToggle={ onToggle } 
					selectToken={ selectToken } 
					onTextChange={ onTextChange } 
					onIntegerChange={ onIntegerChange } 
					onMapSelect={ onMapSelect } 
					deleteToken={ deleteCurrToken }
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

const mapStateToProps = (state) => {
	return {
		game: state.game,
		metadata: state.metadata,
	}
}

const mapDispatchToProps = {
	deleteToken,
	copyToken,
	updateTokenValue,
	toggleTokenValue,
	updateTokens,
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenConfig)
