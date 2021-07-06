import Button from "./button"
import TokenConfig from "../components/TokenConfig"
import SelectedTokensControls from "./SelectedTokensControls"

const TokenToolView = ({ game, toggleOnTokens, onTextChange, newTokenUrl, createToken }) => {
	if (!game.isHost)
		return null
	if (toggleOnTokens)
		return (
			<div>
			<hr />
			<input placeholder='New token url' onChange={ onTextChange.bind(this, 'newTokenUrl') } value={ newTokenUrl || '' } />
			<Button title='Create new token' value='&#x2795;' onClick={ createToken.bind(this) } />
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
