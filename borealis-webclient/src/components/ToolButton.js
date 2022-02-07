import Button from '../views/Button.js'

function ToolButton({ gameState, setGameState, title, value }) {
	const isSelected = title === gameState.settings.tool
	const onClick = () => {
		setGameState({
			...gameState,
			settings: {
				...gameState.settings,
				tool: title,
			}
		})
	}
	return (
		<Button title={ title } value={ value.toString() } onClick={ onClick } isSelected={ isSelected } />
	)
}

export default ToolButton
