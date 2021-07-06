import ToolButton from "../components/ToolButton.js"

const ToolSelectView = ({ gameState, setGameState }) => {
	return (
		<span id='tools'>
			<ToolButton title='move' value='&#x1f9f3;' gameState={ gameState } setGameState={ setGameState } />
			<ToolButton title='draw' value='&#x1f58d;' gameState={ gameState } setGameState={ setGameState } />
			<ToolButton title='fog'  value='&#x1f32c;' gameState={ gameState } setGameState={ setGameState } />
		</span>
	)
}

export default ToolSelectView
