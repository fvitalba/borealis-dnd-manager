import TokenConfig from "../components/TokenConfig"

const SelectedTokensControlsView = ({ game }) => {
	const tokens = game.state.tokens.filter(t => t.$selected)
	return (
		<div>
			{tokens.map((token, $i) => (
			<TokenConfig key={ `token${$i}` } token={ token } game={ game } />
			))}
		</div>
	)
}

export default SelectedTokensControlsView
