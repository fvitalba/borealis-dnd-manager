import TokenConfig from '../components/TokenConfig.js'

const SelectedTokensControlsView = ({ gameState, setGameState, updateGameToken, selectGameToken }) => {
	const tokens = gameState.game.tokens.filter(t => t.$selected)
	return (
		<div>
			{ tokens.map((token, $i) => (
			<TokenConfig key={ `token${$i}` } token={ token } gameState={ gameState } setGameState={ setGameState } updateGameToken={ updateGameToken } selectGameToken={ selectGameToken } />
			))}
		</div>
	)
}

export default SelectedTokensControlsView
