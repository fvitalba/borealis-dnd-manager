import Button from '../views/Button.js'

function ToolButton({ gameState, setGameState, title, value }) {
	const isSelected = title === gameState.state.tool
	const onClick = () => {
		setGameState({
			...gameState,
			state: {
				...gameState.state,
				tool: title,
			}
		})
	}
	return (
		<Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToolButton
