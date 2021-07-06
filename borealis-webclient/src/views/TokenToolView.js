import TokenConfig from "../components/TokenConfig.js"
import Button from "./Button.js"
import SelectedTokensControls from "./SelectedTokensControlsView.js"

const TokenToolView = ({ game, toggleOnTokens, onTextChange, newTokenUrl, createToken }) => {
	if (!game.isHost)
		return null
	if (toggleOnTokens)
		return (
			<div>
			<hr />
			<input placeholder='New token url' onChange={ (e) => onTextChange('newTokenUrl', e) } value={ newTokenUrl || '' } />
			<Button title='Create new token' value='&#x2795;' onClick={ createToken() } />
			{ game.state.tokens.length }
			{game.state.tokens.map((token, $i) => (
				<TokenConfig key={ `token${$i}` } token={ token } game={ game } />
			))}
			</div>
		)
	else
		return SelectedTokensControls
}

export default TokenToolView
