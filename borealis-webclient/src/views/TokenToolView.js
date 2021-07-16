import TokenConfig from '../components/TokenConfig.js'
import Button from './Button.js'
import SelectedTokensControls from './SelectedTokensControlsView.js'

const TokenToolView = ({ gameState, setGameState, toggleOnTokens, onTextChange, newTokenUrl, createToken, updateGameToken, selectGameToken }) => {
	if (!gameState.isHost)
		return null
	if (toggleOnTokens)
		return (
			<div>
			<hr />
			<input placeholder='New token url' onChange={ (e) => onTextChange('newTokenUrl', e) } value={ newTokenUrl || '' } />
			<Button title='Create new token' value='&#x2795;' onClick={ createToken } />
			{ gameState.state.tokens.length }
			{ gameState.state.tokens.map((token, $i) => (
				<TokenConfig key={ `token${$i}` } token={ token } gameState={ gameState } setGameState={ setGameState } updateGameToken={ updateGameToken } selectGameToken={ selectGameToken } />
			))}
			</div>
		)
	else
		return SelectedTokensControls
}

export default TokenToolView
